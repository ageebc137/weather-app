const axios = require('axios');

var getCoords = (query) => {
  console.log(`${process.env.MQ_APIKEY}${query}`);
  return axios.get(`${process.env.MQ_APIKEY}${query}`);
}

module.exports = {getCoords};
