import 'dotenv/config';
import config from '../config';

/**
 * Function to validate if the current environment is test
 *
 * @returns boolean
 */
const itIsTestEnvironment = () => {
  return process.env.ENVIRONMENT.includes(config.INITIAL_TEST_ENVIRONMENTS);
}

export default {
  notIsTestEnvironment:
    (itIsTestEnvironment() && config.SIMULATE_PROD) || !itIsTestEnvironment(), 
  isTestEnvironment: itIsTestEnvironment() && !config.SIMULATE_PROD,
  config,
};
