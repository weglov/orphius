var Fetch = require('whatwg-fetch');
var rootUrl = 'http://localhost:3000/api/';
var apiKey = '430d6820d865788';

module.exports = window.api = {
  get: function(url) {
    return fetch(rootUrl + url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(function(response){
      return response.json()
    })
  }
};