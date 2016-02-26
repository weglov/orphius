var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
	render: function() {
		return <div className="header">
	<div className="section">
		<div className="header__menu">
    		<Link to="/" className="header__menu--logo">GRMR</Link>
    	<ul className="header__list">
        	<li className="header__item">
        	<a href="#" className="header__item--link"><i className="ion-gear-a"></i></a>
        	</li>
    	</ul>
    </div>
    	</div>
    			</div>
		}
});