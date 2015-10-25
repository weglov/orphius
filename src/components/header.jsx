var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
	render: function() {
		return <div className="header__menu">
    		<Link to="/" className="header__menu--logo">Орфиус</Link>
    	<ul className="header__list">
        	<li className="header__item">
        		<a href="#" className="header__item--link">Сайты</a>
        	</li>
    	</ul>
    	</div>
		}
});