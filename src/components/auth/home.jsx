var React = require('react'),
    Actions = require('../../action'),
    Auth = require('../auth/login');

    module.exports = React.createClass({
    login: function() {
      Auth.login(this.state.user, this.state.password)
      .catch(function(err) {
        console.log('“Error logging in”', err);
      });
    },
    getInitialState: function() {
    return {
      value: '',
      password: ''
      };
    },
    mailChange: function(event) {
      this.setState({value: event.target.value.substr(0, 140)});
    },
    passChange: function(event) {
      this.setState({password: event.target.value});
    },
    render: function() { 
      var value = this.state.value;
      var password = this.state.password;
      return (
      <form className="login__box" role="form" onSubmit="">
          <input type="text" placeholder='E-mail' value={value} onChange={this.mailChange} />
          <input type="password" placeholder='Password' value={password} onChange={this.passChange} />
          <button type='submit'>Войти</button>
      </form>);
    }
});
