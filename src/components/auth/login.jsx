var React = require('react'),
    Actions = require('../../action'),
    Sign = require('../auth/sign');
    Api = require('../../utils/api')

    module.exports = React.createClass({
    getInitialState: function() {
      return {
             value: '',
             password: '',
             name: ''
            };
    },
    mailChange: function(event) {
      this.setState({name: event.target.value.substr(0, 140)});
    },
    passChange: function(event) {
      this.setState({password: event.target.value});
    },
    signIn: function(e) {
      var form = JSON.stringify(this.state);
      return Api.post('authenticate', form)
        .then(function(json){
            console.log(this);
        }.bind(this));
    },
    render: function() { 
      var value = this.state.name;
      var password = this.state.password;
      return (
      <form className="login__box" name="signin" role="form" onSubmit={this.signIn}>
          <input type="text" placeholder='E-mail' value={value} onChange={this.mailChange} />
          <input type="password" placeholder='Password' value={password} onChange={this.passChange} />
          <button type='submit'>Войти</button>
      </form>);
    }
});
