import Response from '../libs/response';
import { CreateUser, UpdateUser } from './controller';
import cons from '../locales/constants';
import User from '../models/user';

/**
 * End point to eliminates an registered user.
 *
 * @param {object}    req     Request
 * @param {object}    res     Response
 * @return {Promise<object>} result  Result object
 */
export const _delete = async (req, res) => {
  // Parameters
  const { id } = req.params;
  
  // Vars
  let result = null;
  let message = req.t(cons.user_doesnt_exist);
  let code = 400;
  
  // Find model
  const recordsDeleted = await User.deleteOne({ _id: id });

  // Validate result
  if (recordsDeleted && recordsDeleted.deletedCount === 1) {
    result = { _id: id };
    message = req.t(cons.user_deleted);
    code = 200;
  }

  // Return result
  Response.Set({ res, result, message, code });
};

/**
 * End point to get a list of registered users.
 *
 * @param {object}    req     Request
 * @param {object}    res     Response
 * @return {Promise<object>} result  Result object
 */
export const _get = async (_, res) => {
  // Find model
  const result = await User.find().exec();

  // Return result
  Response.Success({ res, result });
};

/**
 * End point to create an user record.
 *
 * @param {object}    req     Request
 * @param {object}    res     Response
 * @return {Promise<object>} result  Result object
 */
export const _post = async (req, res) => {
  // Constants 
  const { info, login, nickname, roles, status } = req.body;
  const params = { info, login, nickname, roles, status };

  // Create user
  const result = await CreateUser({ req, res, ...params });
 
  // Return result
  Response.Set({ res, ...result });
};

/**
 * End point to update an user record.
 *
 * @param {object}    req     Request
 * @param {object}    res     Response
 * @return {Promise<object>} result  Result object
 */
export const _put = async (req, res) => {
  // Constants 
  const userId = req.params.id; 
  const { info, nickname, roles, status } = req.body;
  
  // Vars
  let { login } = req.body;
 
  // Remove properties from login
  if (login && login.hasOwnProperty('account'))
  delete login.account;

  // Params for update user process
  const params = { info, login, nickname, roles, status, userId };

  // Create user
  const result = await UpdateUser({ req, res, ...params });
 
  // Return result
  Response.Set({ res, ...result });
};

/**
 * End point to get an user record based on user identifier.
 *
 * @param {object}    req     Request
 * @param {object}    res     Response
 * @return {Promise<object>} result  Result object
 */
export const get = async (req, res) => {
  // Parameters
  const { id } = req.params
  
  // Find model
  const result = await User.findOne({ _id: id }).exec();

  // Message
  const message = result ? null : req.t(cons.user_doesnt_exist);

  // Return result
  Response.Set({ res, result, message });
}
