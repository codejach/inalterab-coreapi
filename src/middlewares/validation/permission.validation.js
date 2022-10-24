import ValidatorService from "../../services/validator";
import Response from "../../libs/response";
import cons from "../../locales/constants";

export const get = async (req, res, next) => {
  const validator = new ValidatorService(req, res);
  const message = req.t(cons.unauthorized);
  const rules = {
    role: "required|string",
  };

  validator.run(req.params, rules, {}, (err, status) => {
    const result = err;
    const code = 400;

    if (!status) {
      return Response.Error({ res, result, message, code });
    } else {
      next();
    }
  });
};
