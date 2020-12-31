var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://weatherbit-v1-mashape.p.rapidapi.com/current',
  params: {lon: '-3.02', lat: '9.02'},
  headers: {
    'x-rapidapi-key': '1db03746e2msh8fdfa59d862598cp13927ajsn59af2da6b6d8',
    'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
    a = response.data
    
    console.log(a.data[0])
}).catch(function (error) {
	console.error(error);
});