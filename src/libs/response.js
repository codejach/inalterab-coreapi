import Result from '../models/dto/result';

/**
 * Response object.
 */
const Response = {
  /**
   * Function that generates a Error Response.
   *
   * @param {Object}    res     Response
   * @param {Object}    result  Result of process
   * @param {Object}    message Message of process
   * @param {Object}    code    Correlation code of process
   */
  Error: (params) => {
    // Constants
    const { res } = params;
    const correlation = res.locals.correlation;

    // Vars
    let { result, code, message } = params;
  
    result = result || null;
    code = code || 200;
    message = message || null;
  
    const response = Result.Error(result, message, correlation, code);
  
    return res.status(code).json(response);
  },

  /**
   * Function that generates an Response.
   *
   * @param {Object}    res     Response
   * @param {Object}    result  Result of process
   * @param {Object}    message Message of process
   * @param {Object}    code    Correlation code of process
   */ 
  Set: (params) => {
    // Constants
    const { res } = params;
    const correlation = res.locals.correlation;

    // Vars
    let { result, code, message } = params;

    result = result || null;
    code = code || 200;
    message = message || null;

    const success = result ? true: false; 
    const response = Result.Set(success, result, message, correlation, code);

    return res.status(code).json(response);
  },

  /**
   * Function that generates a Success Response.
   *
   * @param {Object}    res     Response
   * @param {Object}    result  Result of process
   * @param {Object}    message Message of process
   * @param {Object}    code    Correlation code of process
   * @return {Response} result  Result object
   */
  Success: (params) => {
    // Constants
    const { res } = params;
    const correlation = res.locals.correlation;

    // Vars
    let { result, code, message } = params;

    result = result || null;
    code = code || 200;
    message = message || null;
    
    const response = Result.Success(result, message, correlation, code);

    return res.status(code).json(response);
  }
}

export default Response;
