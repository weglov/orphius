var React = require('react');
var Reflux = require('reflux');
var OrphStore = require('../stores/orph-store');
 // 50 лвл

module.exports = React.createClass({
	getInitialState: function() {
		return {
			orphs: []
		}
	},
	componentWillMount: function() {
		OrphStore.getOrphs()
			.then(function(){
				this.setState({
					orphs: OrphStore.orphs 
				});
			}.bind(this));
	},
	render: function() {
		return <div className="">
		{this.renderOrphs()}
		</div>
	},
 	renderOrphs: function() {
    return this.state.orphs.map(function(orphs) {
		  return orphs;
		});
  }
})
