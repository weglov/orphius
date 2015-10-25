var Api = require('../utils/api');
var Reflux = require('reflux');

var orphStore = Reflux.createStore({
	getOrphs: function() {
		return Api.get('orph')
			.then(function(json){
				this.orphs = json

			}.bind(this));
	}
});

module.exports = orphStore;