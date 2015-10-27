var Api = require('../utils/api');
var Reflux = require('reflux');
var Actions = require('../action');
var orphStore = Reflux.createStore({
	listenables: [Actions],
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