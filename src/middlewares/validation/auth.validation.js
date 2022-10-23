import ValidatorService from '../../services/validator';
import Response from '../../libs/response';
import cons from '../../locales/constants';

/**
 * Function that validates the parameters received from the login model.
 *
 * @param {object}    req     Request
 * @param {object}    res     Response
 * @param {function}  next    Callback function
 * @return {Promise<object>} result  Result object
 */
export const signin = async (req, res, next) => {
  const validator = new ValidatorService(req, res);
  const message = req.t(cons.invalid_register);
  const rules = {
    account: 'required|email',
    password: 'required|string|min:6'
  };

  validator.run(req.body, rules, {}, (err, status) => {
    const result = err;
    const code = 412;

    if (!status) {
      return Response.Error({ res, result, message, code });
    } else {
      next();
    }
  });
} 

/**
 * Function that validates the parameters received from the ethereum login
 * model.
 *
 * @param {object}    req     Request
 * @param {object}    res     Response
 * @param {function}  next    Callback function
 * @return {Promise<object>} result  Result object
 */
export const signinEth = async (req, res, next) => {
  const validator = new ValidatorService(req, res);
  const message = req.t(cons.invalid_register);
  const validationMessage = req.t(cons.invalid_eth_address);
  const rules = { account: 'required|ethereumAddress' };

  validator.run(req.body, rules, validationMessage, (err, status) => {
    const result = err;
    const code = 412;

    if (!status) {
      return Response.Error({ res, result, message, code });
    } else {
      next();
    }
  });
} 

/**
 * Function that validates the parameters received from the signup model.
 *
 * @param {object}    req     Request
 * @param {object}    res     Response
 * @param {function}  next    Callback function
 * @return {Promise<object>} result  Result object
 */
export const signup = async (req, res, next) => {
  const validator = new ValidatorService(req, res);
  const message = req.t(cons.authentication_failed);
  const rules = {
    'account': 'required|email',
    'password': 'required|string|min:6'
  };

  validator.run(req.body, rules, {}, (err, status) => {
    const result = err;
    const code = 401;

    if (!status) {
      return Response.Error({ res, result, message, code });
    } else {
      next();
    }
  });
} 

/**
 * Function that validates the parameters received from the ethereum signup
 * model.
 *
 * @param {object}    req     Request
 * @param {object}    res     Response
 * @param {function}  next    Callback function
 * @return {Promise<object>} result  Result object
 */
export const signupEth = async (req, res, next) => {
  const validator = new ValidatorService(req, res);
  const validationMessage = req.t(cons.invalid_eth_address);
  const message = req.t(cons.authentication_failed);
  const rules = { account: 'required|ethereumAddress' };

  validator.run(req.body, rules, validationMessage, (err, status) => {
    const result = err;
    const code = 401;

    if (!status) {
      Response.Error({ res, result, message, code });
    } else {
      next();
    }
  });
} 
