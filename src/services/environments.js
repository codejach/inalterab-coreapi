import 'dotenv/config';
import config from '../config';

/**
 * Function to validate if the asigned roles to user are valid based into
 * current environment.
 *
 * @param {object}   roles   Array roles
 * @return {boolean}  result  result
 */
const itIsTestEnvironment = () => {
  return testEnvironments.includes(config.INITIAL_TEST_ENVIRONMENTS);
}

export default {
  notIsTestEnvironment: (
    !itIsTestEnvironment || (itIsTestEnvironment && config.SIMULATE_PROD)
  ),
  isTestEnvironment: itIsTestEnvironment && !config.SIMULATE_PROD,
  config
}
