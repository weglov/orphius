var React = require('react'),
    Actions = require('../../action'),
    Sign = require('../auth/sign');
    Api = require('../../utils/api')

    module.exports = React.createClass({
    getInitialState: function() {
      return {
             email: '',
             password: '',
             message: ''
            };
    },
    mailChange: function(event) {
      this.setState({email: event.target.value.substr(0, 140)});
    },
    passChange: function(event) {
      this.setState({password: event.target.value});
    },
    signIn: function(e) {
      var form = JSON.stringify(this.state);
      return Api.post('authenticate', form)
        .then(function(json){
          this.setState({
            message: json.message
          });
        }.bind(this));
    },
    render: function() { 
      var email = this.state.email;
      var password = this.state.password;
      return (
      <form className="login__box" name="signin" role="form" onSubmit={this.signIn}>
          <input type="text" placeholder='E-mail' value={email} onChange={this.mailChange} />
          <input type="password" placeholder='Password' value={password} onChange={this.passChange} />
          <button type='submit'>Войти</button>
          <div className="login__box_caption">{this.state.message}</div>
      </form>);
    }
});
