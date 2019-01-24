const axios = require('axios');

var getCoords = (query) => {
  console.log(`${process.env.MQ_APIKEY}${query}`);
  return axios.get(`https://www.mapquestapi.com/geocoding/v1/address?key=${process.env.MQ_APIKEY}&location=${query}`);
}

module.exports = {getCoords};
