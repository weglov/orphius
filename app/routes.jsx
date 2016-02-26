var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Login = require('./components/auth/login');
var Main = require('./components/main');

module.exports = (
  <Router>
  	<Route path="/" component={Main}>
  	</Route>
  	<Route path="/login" component={Login}>
  	</Route>

  </Router>
)