import 'dotenv/config';
import importModules from './libs/importHelper';

const config = importModules(`./config/${process.env.ENVIRONMENT}`) || [];

export default {
  ...config.BASE || [],
  INITIAL_ACCESS: [
    ...config.INITIAL_ACCESS || [],
    ...config.ADMIN_ACCESS || [],
    ...config.OTHER_ACCESS || []
  ],
  INITIAL_MODULES: [
    ...config.INITIAL_MODULES || [],
    ...config.ADMIN_MODULES || [],
    ...config.OTHER_MODULES || []
  ],
  INITIAL_EXCLUSIVE_ROLES: [
    'admin'
  ],
  INITIAL_ROLE: 'user',
  INITIAL_ROLES: [
    ...config.INITIAL_ROLES || []
  ],
  INITIAL_STATUS: [
    ...config.INITIAL_STATUS || []
  ],
  INITIAL_TEST_ENVIRONMENTS: [
    'dev'
  ],
  SECRET:'core-api',
  SIMULATE_PROD: false, 
}
