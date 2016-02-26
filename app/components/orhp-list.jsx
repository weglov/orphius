var React = require('react'),
	Reflux = require('reflux'),
	OrphStore = require('../stores/orph-store'),
	Actions = require('../action');

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
		Actions.getOrphs()
	},
	render: function() {
		return <div className="section">
			<div className="orph__container">	
			{this.renderOrphs()}
			</div>
		</div>
	},
 	renderOrphs: function() {
    return this.state.orphs.map(function(orphs) {
    	return <div className="orph__item" key={orphs.id}>
    	{orphs.left}<span> {orphs.main} </span> {orphs.right}
    	</div>
		});
  },
  onChange: function(event, orphs) {
  	this.setState({orphs: orphs})
  }
})
