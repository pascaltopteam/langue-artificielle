// Environments

const devMode = 0; // 0: Development, 1: Production

const production = {
  baseURL: 'https://avocadoo.com/api',
  version: 2,
  apiKey: 'MadrarAb4wReNawrAxuf8pharub3aq'
};
const development = {
  baseURL: 'https://staging.avocadoo.com/api', //'https://devjr.avocadoo.com/api', // 'https://testwplanding.avocadoo.com/api',
  version: 2,
  apiKey: 'MadrarAb4wReNawrAxuf8pharub3aq'
}

const Env = devMode ? production : development;

export default Env;