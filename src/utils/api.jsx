var Fetch = require('whatwg-fetch');
var rootUrl = 'http://localhost:3000/api/';
var apiKey = '12345';

module.exports = {
  get: function(url) {
    return fetch(rootUrl + url)
    .then(function(response){
      return response.json()
    })
  }
};