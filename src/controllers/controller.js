import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";
import env from "../services/environments";
import cons from "../locales/constants";
import Result from "../models/dto/result";
import Role from "../models/role";
import Status from "../models/status";
import User from "../models/user";

/**
 * Function to validate if the asigned roles to user are valid based into
 * current environment.
 *
 * @param {object}   roles   Array roles
 * @return {Promise<boolean>}  result  result
 */
const ValidateUserRoles = async (roles) => {
  // Evaluate test environment
  if (env.notIsTestEnvironment) {
    // Constants
    const exclusiveRoleOptions = {
      name: { $in: env.config.INITIAL_EXCLUSIVE_ROLES },
    };

    // Get initial role id
    const initialExclusiveRole = await Role.find(exclusiveRoleOptions);

    // Exist exclusive roles into user request
    if (roles.some((x) => initialExclusiveRole.some((y) => y._id === x))) {
      return false;
    }
  }

  return true;
};

/**
 * Function to generates a correlation uuid on each request.
 *
 * @param {object}    req     Request
 * @param {object}    res     Response
 * @param {object}    next    Callback function
 */
export const controller = (_, res, next) => {
  res.locals.correlation = uuid();
  next();
};

/**
 * Function to register an user if it is valid.
 *
 * @param {object}    req       Request
 * @param {object}    res       Response
 * @param {object}    login     Login object
 * @param {object}    roles     Role objects
 * @param {object}    info      Info object
 * @param {string}    nickname  User nickname
 * @return {Promise<object>}   user      User object
 */
export const CreateUser = async (params) => {
  // Constants
  const { req, res, login } = params;
  const correlation = res.locals.correlation;
  const code = 400;

  // Vars
  let { info, nickname, roles, status } = params;
  let result = null;
  let tmpRoles = [];

  // Validate user exists
  const userExists = await User.exists({ "login.account": login.account });
  if (userExists) {
    return Result.Error(result, req.t(cons.user_exists), correlation, code);
  }

  // Validate roles
  if (roles && roles.length > 0) {
    if (!ValidateUserRoles(roles)) {
      return Result.Error(result, req.t(cons.bad_request), correlation, code);
    }

    for (const [_, x] of Object.entries(roles)) {
      const role = await Role.findById({ _id: x });

      // Exist role and
      if (role && tmpRoles) {
        tmpRoles.push(role);
      } else {
        tmpRoles = null;
        break;
      }
    }

    // Any role?
    if (!tmpRoles) {
      return Result.Error(result, req.t(cons.bad_request), correlation, code);
    }

    roles = tmpRoles;
  } else {
    roles = await Role.find({ name: env.config.INITIAL_ROLE });
  }

  // Validate stauts
  if (status) {
    status = await Status.findById({ _id: status });

    if (!status) {
      return Result.Error(result, req.t(cons.bad_request), correlation, code);
    }
  } else {
    status = await Status.findOne({ name: "enabled", kind: "global" });
  }

  // Validate required records
  if (!roles || !status) {
    return Result.Error(result, req.t(cons.internal_error), correlation);
  }

  // Set vars
  info = info || null;
  nickname = nickname || null;

  // User model
  const user = new User({
    info,
    login,
    nickname: nickname || login.account,
    correlation: res.locals.correlation,
    roles: roles.map((x) => x),
    status: status,
  });

  // Save models
  result = await user.save();

  // Return result
  const success = result ? true : false;
  return Result.Set(success, result, req.t(cons.user_created), correlation);
};

/**
 * Function to signup an user if it is valid.
 *
 * @param {object}    req       Request
 * @param {object}    res       Response
 * @param {object}    user      User object
 * @return {object}   token     Token object
 */
export const SignupUser = (params) => {
  // Constants
  const { req, res, user } = params;
  const correlation = res.locals.correlation;

  // Vars
  let result = { token: null };
  let message = req.t(cons.internal_error);

  // Validate user
  if (!user) {
    return Result.Error(result, message, correlation);
  }

  // Create token
  const tokenizedObject = { account: user.login.account };
  const options = { expiresIn: 86400 };
  result.token = jwt.sign(tokenizedObject, env.config.SECRET, options);
  result.user = user;
  result.authenticated = true;
  result.expiresIn = 86400;

  // Validate token
  if (!result.token) {
    return Result.Error(result, message, correlation);
  }

  // Successful result
  message = req.t(cons.user_created);
  return Result.Success(result, message, correlation);
};

/**
 * Function to update an user if it is valid.
 *
 * @param {object}    req       Request
 * @param {object}    res       Response
 * @param {object}    login     Login object
 * @param {object}    roles     Role objects
 * @param {object}    info      Info object
 * @param {String}    nickname  User nickname
 * @return {Promise<object>}   user      User object
 */
export const UpdateUser = async (params) => {
  // Constants
  const { req, res, nickname, userId } = params;
  const correlation = res.locals.correlation;

  // Vars
  let { info, login, roles, status } = params;
  let result = null;
  let tmpRoles = [];

  // Validate roles
  if (roles && roles.length > 0) {
    if (!ValidateUserRoles(roles)) {
      return Result.Error(result, req.t(cons.bad_request), correlation, 400);
    }

    for (const [_, x] of Object.entries(roles)) {
      const role = await Role.findById({ _id: x });

      // Exist role and
      if (role && tmpRoles) {
        tmpRoles.push(role);
      } else {
        tmpRoles = null;
        break;
      }
    }

    // Any role?
    if (!tmpRoles) {
      return Result.Error(result, req.t(cons.bad_request), correlation, 400);
    }

    roles = tmpRoles;
  } else {
    roles = await Role.find({ name: env.config.INITIAL_ROLE });
  }

  // Validate stauts
  if (status) {
    status = await Status.findById({ _id: status });

    if (!status) {
      return Result.Error(result, req.t(cons.bad_request), correlation, 400);
    }
  } else {
    status = await Status.findOne({ name: "enabled", kind: "global" });
  }

  // Get user
  let user = await User.findById({ _id: userId });
  if (!user) {
    return Result.Error(result, req.t(cons.bad_request), correlation, 400);
  }

  // Update password?
  if (login && login.password) {
    login.password = await User.encrypt(login.password);
  }

  // Manage info
  info = info || user.info;
  login = login || user.login;

  // User model
  user.info = { ...user.info, ...info };
  user.login = { ...user.login, ...login };
  user.nickname = nickname || user.nickname;
  user.correlation = res.locals.correlation;
  user.roles = !roles ? user.roles : roles.map((x) => x);
  user.status = !status ? user.status : status;

  // Save models
  result = await user.save();

  // Return result
  const success = result ? true : false;
  result = { user: user };
  return Result.Set(success, result, req.t(cons.user_updated), correlation);
};
