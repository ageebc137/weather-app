const button = document.querySelector('#location');
const temp = document.querySelector('#temperature');
const city = document.querySelector('#city');
const currentLoc = {};
let locationMod = {
  latitude: '',
  longitude: '',
  query: ''
}

window.onload = navigator.geolocation.getCurrentPosition(function(position) {
  locationMod.latitude = position.coords.latitude;
  locationMod.longitude = position.coords.longitude;
  locationMod.query = null;
    getWeather(locationMod);
});

function buttonPress(e) {
  e.preventDefault();
  locationMod.latitude = null,
  locationMod.longitude = null,
  locationMod.query = encodeURIComponent(this.querySelector('input').value.trim());
  console.log(locationMod.query);
  getWeather(locationMod);
}

function getWeather(locationMod) {

  axios.post('https://infinite-caverns-54502.herokuapp.com/search', locationMod).then((res) => {
    console.log(res);
    city.innerHTML = res.data.city;
    temp.innerHTML = res.data.currently.temperature;
  }).catch(err => {
    if (err) {
      return err;
    }
  });
}

button.addEventListener('submit', buttonPress);
