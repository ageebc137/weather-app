require('dotenv').load();

const axios = require('axios');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const {getCoords} = require('../public/js/libs/location');

const publicPath = path.join(__dirname, '../public');
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.use(express.static(publicPath));

app.get(('/'), (req, res) => {
  res.render('index');
})

app.post(('/search'), (req, res) => {
  console.log(req.body.latitude, req.body.longitude, req.body.query);
  var location =  "";
  if (req.body.query) {
    getCoords(req.body.query).then((response) => {
      console.log(response.data.results[0])
      var latitude = response.data.results[0].locations[0].latLng.lat;
      var longitude = response.data.results[0].locations[0].latLng.lng;
      location = response.data.results[0].locations[0].adminArea5;
      axios.get(`${process.env.DS_APIKEY}${latitude},${longitude}`).then(dsweather => {
        dsweather.data.city = location;
        console.log(dsweather.data);
        res.send(dsweather.data);
      }).catch(err => {
        if(err) {
          console.log(err)
        }
      })
    });
  }else{
    axios.get(`${process.env.DS_APIKEY}${req.body.latitude}, ${req.body.longitude}`).then(dsweather => {
      res.send(dsweather.data);
    }).catch(err => {
      if(err) {
        console.log(err)
      }
    });
  }



});

app.listen(port, () => {
  console.log(`The server is on port ${port}`);
});
