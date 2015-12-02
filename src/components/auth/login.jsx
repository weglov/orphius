var React = require('react'),
    Actions = require('../../action'),
    Sign = require('../auth/sign');

    module.exports = React.createClass({
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
    signIn(e) {
    e.preventDefault();
    Sign.login(this.state.user, this.state.password)
      .catch(function(err) {
        console.log(err);
      });
    },
    render: function() { 
      var value = this.state.value;
      var password = this.state.password;
      return (
      <form className="login__box" role="form" onSubmit={this.signIn}>
          <input type="text" placeholder='E-mail' value={value} onChange={this.mailChange} />
          <input type="password" placeholder='Password' value={password} onChange={this.passChange} />
          <button type='submit'>Войти</button>
      </form>);
    }
});
