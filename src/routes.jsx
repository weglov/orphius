var React = require('react');
var ReactRouter = require('react-router');
var HashHistory = require('react-router/lib/hashhistory');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var Login = require('./components/login');
var Main = require('./components/main');

module.exports = (
  <Router history={new HashHistory}>
  	<Route path="/" component={Main}>
  	</Route>
  	<Route path="/login" component={Login}>
  	</Route>

  </Router>
)