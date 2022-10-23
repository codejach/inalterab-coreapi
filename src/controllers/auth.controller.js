import jwt from 'jsonwebtoken';
import config from '../config';
import cons from '../locales/constants';
import Response from '../libs/response';
import { CreateUser, SigninUser } from './controller';
import User from '../models/user';

/**
 * Function that evaluate if the user is valid.
 *
 * @param {object}    req     Request
 * @param {object}    res     Response
 * @param {object}    record  User object
 * @return {Promise<object>} result  Result object
 */
const evaluateUser = async (req, res, record) => {
  // Constants
  const code = 401;

  // Vars
  let message = req.t(cons.authentication_failed);
  let result = { authenticated: false, token: null, expires: 0, user: null };
  
  // Evaluate record
  if (!record) {
    return Response.Error({ res, result, message, code });
  }

  // Set user
  result.user = record;

  // Valid password?
  const success = await User.compare(req.body.password, record.login.password);
  if (!success) {
    result.user = null;
    return Response.Error({ res, result, message, code });
  }

  // Create token
  const tokenizedObject = { account: record.login.account };
  const options = { expiresIn: 86400 };
  result.token = jwt.sign(tokenizedObject, config.SECRET, options);
  if (!result.token) {
     return Response.Error({ res, result, message });
  }

  result.authenticated = true;
  result.expiresIn = 86400;

  // Successful result
  message = req.t(cons.user_authenticated);
  Response.Success({ res, result, message });
}

/**
 * Function that execute the signin process of an user.
 *
 * @param {object}    req     Request
 * @param {object}    res     Response
 * @return {Promise<object>} result  Result object
 */
export const signup = async (req, res) => {
  // Exist user?
  const record = await User.findOne({ 'login.account': req.body.account });

  // Evaluate user
  await evaluateUser(req, res, record);
}

/**
 * Function that execute the signin process of an ethereum kind user.
 *
 * @param {object}    req     Request
 * @param {object}    res     Response
 * @return {Promise<object>} result  Result object
 */
export const signupEth = async (req, res) => {
  // Set password for ethereum accounts
  req.body.password = req.body.account;

  // Exist user?
  const record = await User.findOne({ 
    'login.uuid': req.body.account,
    'login.kind': 'ethereum'
  });

  // Evaluate user
  await evaluateUser(req, res, record);
}

/**
 * Function that execute the signup process of an user.
 *
 * @param {object}    req     Request
 * @param {object}    res     Response
 * @return {Promise<object>} result  Result object
 */
export const signin = async (req, res) => {
  // Fields
  const { account, password } = req.body;

  // Login object
  const login = {
    account,
    password: await User.encrypt(password),
  };

  // Create user
  const user = await CreateUser({ req, res, login });

  // Validate user
  if (!user.success) {
    return Response.Set({ res, ...user });
  }

  // Signup user
  const result = SigninUser({ req, res, user: user.result });

  // Return result
  Response.Set({ res, ...result });
}

/**
 * Function that execute the signup process of an ethereum kind user.
 *
 * @param {object}    req     Request
 * @param {object}    res     Response
 * @return {Promise<object>} result  Result object
 */
export const signinEth = async (req, res) => {
  // Fields
  const { account } = req.body;

  // Login model
  const login = {
    uuid: account,
    password: await User.encrypt(account),
    kind: 'ethereum'
  };

  // Create user
  const user = await CreateUser({ req, res, login });

  // Validate user
  if (!user.success) {
    return Response.Set({ res, ...user });
  }
 
  // Signup user
  const result = SigninUser({ req, res, user: user.result });

  // Return result
  Response.Set({ res, ...result });
}
