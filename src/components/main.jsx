var React = require('react');
var Header = require('./header');

module.exports = React.createClass({
	render: function() {
		return <div className="header">
		<Header /> 
		{this.props.children}
		</div>
	}
});