const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    baseURL: 'https://api.github.com/',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  const githubClient = axios.create(options);

  return githubClient.get(`users/${username}/repos`);
}

module.exports.getReposByUsername = getReposByUsername;