import ValidatorService from '../../services/validator';
import Response from '../../libs/response';

/**
 * Function that execute the validator function
 *
 * @param {Object}    req       Request
 * @param {Object}    res       Response
 * @param {Object}    params    Params to be validated
 * @param {Object}    rules     Rules to be applied to validation
 * @param {int}       code      Http code to return
 * @param {string}    msg       Error message
 * @param {string}    vmsg      Error validation message
 * @param {function}  next      Callback function
 * @response {Promise<object>}   result  Result object
 */
export const exec = async (req, res, params, rules, code, msg, vmsg, next) => {
  const validatorMessage = vmsg || {};

  const validator = new ValidatorService(req, res);
  validator.run(params, rules, validatorMessage, (err, status) => {
    const result = err;
    const message = msg;

    if (!status) {
      Response.Error({ res, result, message, code });
    } else {
      next();
    }
  });
}
