import ValidatorService from '../../services/validator';
import cons from '../../locales/constants';

/**
 * Function that validates the parameters received from the get end point.
 *
 * @param {object}    req     Request
 * @param {object}    res     Response
 * @param {function}  next    Callback function
 * @return {Promise<object>} result  Result object
 */
export const del = async (req, res, next) => {
  const validator = new ValidatorService(req, res);
  const message = req.t(cons.bad_request);
  const rules = {
    id: 'required|hex|size:24'
  };

  validator.run(req.body, rules, {}, (err, status) => {
    const result = err;
    const code = 400;

    if (!status) {
      return Response.Error({ res, result, message, code });
    } else {
      next();
    }
  });
}

/**
 * Function that validates the parameters received from the get point.
 *
 * @param {object}    req     Request
 * @param {object}    res     Response
 * @param {function}  next    Callback function
 * @return {Promise<object>} result  Result object
 */
export const get = async (_, __, next) => {
  next();
}

/**
 * Function that validates the parameters received from the post point.
 *
 * @param {object}    req     Request
 * @param {object}    res     Response
 * @param {function}  next    Callback function
 * @return {Promise<object>} result  Result object
 */
export const post = async (req, res, next) => {
  const validator = new ValidatorService(req, res);
  const message = req.t(cons.bad_request);
  const rules = {
    login: {
      account: 'required|email',
      password: 'required|string|min:6'
    }
  };

  validator.run(req.body, rules, {}, (err, status) => {
    const result = err;
    const code = 400;

    if (!status) {
      return Response.Error({ res, result, message, code });
    } else {
      next();
    }
  });
} 

/**
 * Function that validates the parameters received from the put point.
 *
 * @param {object}    req     Request
 * @param {object}    res     Response
 * @param {function}  next    Callback function
 * @return {Promise<object>} result  Result object
 */
export const put = async (req, res,  next) => {
  const validator = new ValidatorService(req, res);
  const message = req.t(cons.bad_request);
  const rules = {
    nickname: 'string|min:3',
    login: {
      password: 'string|min:6'
    }
  };

  validator.run(req.body, rules, {}, (err, status) => {
    const result = err;
    const code = 400;

    if (!status) {
      return Response.Error({ res, result, message, code });
    } else {
      next();
    }
  });
}

/**
 * Function that validates the parameters received from the getid point.
 *
 * @param {object}    req     Request
 * @param {object}    res     Response
 * @param {function}  next    Callback function
 * @return {Promise<object>} result  Result object
 */
export const getId = async (req, res, next) => {
  const validator = new ValidatorService(req, res);
  const message = req.t(cons.bad_request);
  const rules = {
    id: 'required|hex|size:24'
  }

  validator.run(req.body, rules, {}, (err, status) => {
    const result = err;
    const code = 400;

    if (!status) {
      return Response.Error({ res, result, message, code });
    } else {
      next();
    }
  });
}
