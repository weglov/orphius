var Fetch = require('whatwg-fetch');
var rootUrl = 'http://localhost:3000/api/';
var apiKey = '12345';

module.exports = {
  get: function(url) {
    return fetch(rootUrl + url)
    .then(function(response){
      return response.json()
    })
  },
  'facebookAuth' : {
        'clientID'      : 'your-secret-clientID-here', // your App ID
        'clientSecret'  : 'your-client-secret-here', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
   },
   'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
   },
   'googleAuth' : {
        'clientID'      : 'your-secret-clientID-here',
        'clientSecret'  : 'your-client-secret-here',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
   }
};