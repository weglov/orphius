var React = require('react');
var Header = require('./header');
var OrphList = require('./orhp-list');

module.exports = React.createClass({
	render: function() {
		return <div className="header">
		<Header /> 
		{this.content()}

		</div>
	},
	content: function() {
		if (this.props.children) {
			return this.props.children
		} else {
			return <OrphList />
		}
	}
});