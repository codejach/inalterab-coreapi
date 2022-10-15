import Validator from 'validatorjs';
import cons from '../locales/constants';

class ValidatorService {
  constructor(req, _) {
    Validator.registerAsync('ethereumAddress', function(val, _, __, passes) {
      const result = val.match(/^0x[a-fA-F0-9]{40}$/);
      if (result) {
        passes();
      } else {
        passes(false, req.t(cons.invalid_eth_address));
      }
    });
  }

  run(body, rules, customMessage, callback) {
    const validation = new Validator(body, rules, customMessage);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
  };
}

export default ValidatorService;
