var React = require('react'),
	  Reflux = require('reflux'),
	  Actions = require('../../action'),
	  Home = require('./home');

module.exports = React.createClass({
  componentWillMount: function() {
    this.setupAjax();
    this.createLock();
    this.setState({idToken: this.getIdToken()})
  },
  createLock: function() {
    this.lock = ' ';
  },
  
  setupAjax: function() {
    // $.ajaxSetup({
    //   'beforeSend': function(xhr) {
    //     if (localStorage.getItem('userToken')) {
    //       xhr.setRequestHeader('Authorization',
    //             'Bearer ' + localStorage.getItem('userToken'));
    //     }
    //   }
    // });
  },
  getIdToken: function() {
    var idToken = localStorage.getItem('userToken');
    return idToken;
  },
  render: function() {
    if (this.state.idToken) {
      return (<LoggedIn lock={this.lock} idToken={this.state.idToken} />);
    } else {
      return (<Home lock={this.lock} />);
    }
  }
});