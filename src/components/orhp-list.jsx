var React = require('react');
var Reflux = require('reflux');
var OrphStore = require('../stores/orph-store');
 // 51 лвл

module.exports = React.createClass({
	mixins: [
		Reflux.listenTo(OrphStore, 'onChange')
	],
	getInitialState: function() {
		return {
			orphs: []
		}
	},
	componentWillMount: function() {
		OrphStore.getOrphs()
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
  },
  onChange: function(event, orphs) {
  	this.setState({orphs: orphs})
  }
})
