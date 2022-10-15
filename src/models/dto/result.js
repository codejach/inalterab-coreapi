export default class Result {
  static Error(result, message, correlation, code) {
    return {
      correlation: correlation,
      success: false,
      result: result,
      message: message,
      code: code
    };
  }
  
  static Set(success, result, message, correlation, code) {
    return {
      correlation: correlation,
      success: success || false,
      result: result,
      message: message,
      code: code
    };
  }

  static Success(result, message, correlation, code) {
    return {
      correlation: correlation,
      success: true,
      result: result,
      message: message,
      code: code
    };
  }
}
