var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
	render: function() {
		return <div className="pure-menu pure-menu-horizontal">
    		<Link to="/" className="pure-menu-heading pure-menu-link">Орфиус</Link>
    	<ul className="pure-menu-list">
        	<li className="pure-menu-item">
        		<a href="#" className="pure-menu-link">News</a>
        	</li>
    	</ul>
    	</div>
		}
});