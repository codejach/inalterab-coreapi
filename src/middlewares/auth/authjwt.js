import jwt from 'jsonwebtoken';
import env from '../../services/environments';
import cons from '../../locales/constants';
import Response from '../../libs/response';
import User from '../../models/user';

/**
 * Function that returns a user based on a token.
 *
 * @param {string}    token   Token
 * @return {Promise<object>}   user    User
 */
const getUserByToken = async (token) => {
  try {
    const decoded = jwt.verify(token, env.config.SECRET);
    if (!decoded) {
      return null;
    }

    const query = { 'login.account' : decoded.account };
    const user = await User.findOne(query).populate({
      path: 'roles',
      model: 'Role',
      match: { 'enabled': true },
      populate: {
        path: 'access',
        model: 'Access',
        match: { 'enabled': true },
        populate: {
          path: 'actions',
          model: 'Action',
          match: { 'enabled': true },
        }
      }
    }).exec();

    if (!user) { 
      return null;
    }

    return user;
  } catch (_) {
    return null;
  }
}

/**
 * Function that validates user permissions.
 *
 * @param {object}    req     Request
 * @param {object}    res     Response
 * @param {function}  next    Callback function
 * @return {Promise<object>} result  Result object
 */
export const verifyAccess = async (req, res, next) => {
  console.log(env);
  // Evaluate test environment
  if (env.notIsTestEnvironment) {
    // Constants
    const code = 401;

    // Vars
    let message = req.t(cons.unauthorized);
    
    // token header
    const token = req.headers['authorization'];
    if (!token) {
      return Response.Error({ res, message, code });
    }
    
    // Validate user
    const user = await getUserByToken(token); 
    if (!user) {
      return Response.Error({ res, message, code });
    }
    
    // Is authorized
    const path = req.route.path == '/' ? '' : req.route.path;
    const url = req.baseUrl + path;
    
    const authorized = user.roles.some((role) =>
      role.access.some((access) =>
        access.actions.some(
          (action) => action.url === url && action.method === req.method
        )
      )
    );
    
    if (!authorized) {
      return Response.Error({ res, message, code });
    }
  }

  next();
}
