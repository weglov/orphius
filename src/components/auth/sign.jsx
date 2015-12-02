var React = require('react'),
    Actions = require('../../action');

    module.exports = React.createClass({
    render: function() {
    console.log(this.state.name);
    Api.post('/authenticate', this.state)       
      return;
    }
});
