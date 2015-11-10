var React = require('react'),
	Reflux = require('reflux'),
	Actions = require('../action');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			orphs: []
		}
	},
	componentWillMount: function() {
    	this.setupAjax();
    	this.createLock();
    	this.setState({idToken: this.getIdToken()})
  	},
  	createLock: function() {
    // this.lock = new Auth0Lock(this.props.clientId, this.props.domain);
  	},
  	setupAjax: function() {
	    $.ajaxSetup({
	      'beforeSend': function(xhr) {
	        if (localStorage.getItem('userToken')) {
	          xhr.setRequestHeader('Authorization',
	                'Bearer ' + localStorage.getItem('userToken'));
	        }
	      }
	    });
	},
	getIdToken: function() {
	  var idToken = localStorage.getItem('userToken');
	  var authHash = this.lock.parseHash(window.location.hash);
	  if (!idToken && authHash) {
	    if (authHash.id_token) {
	      idToken = authHash.id_token
	      localStorage.setItem('userToken', authHash.id_token);
	    }
	    if (authHash.error) {
	      console.log("Error signing in", authHash);
	    }
	  }
	  return idToken;
	},
	render: function() {
		return <div className="main">

		</div>
	}

})