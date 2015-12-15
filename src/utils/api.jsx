var Fetch = require('whatwg-fetch');
var rootUrl = 'http://localhost:3000/api/';

module.exports = {
  get: function(url) {
    return fetch(rootUrl + url)
    .then(function(response){
      return response.json()
    })
  },
  post: function(url, form) {
    return fetch(rootUrl + url, {
      method: 'post',
      body: form
    })
  }
};