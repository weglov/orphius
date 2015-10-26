var Api = require('../utils/api');
var Reflux = require('reflux');

var orphStore = Reflux.createStore({
	getOrphs: function() {
		return Api.get('orph')
			.then(function(json){
				this.orphs = json
				this.triggerChange();
			}.bind(this));
	},
	triggerChange: function() {
		this.trigger('change', this.orphs);	
	}
});

module.exports = orphStore;