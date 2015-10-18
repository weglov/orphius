var React = require('react');

var Hello = React.createClass({
  render: function() {
    return <h1 onClick={this.helperInfo()} className="red">
      Hello!
    </h1>
  },
  helperInfo: function() {
  	console.log(this);
  }
});

var element = React.createElement(Hello, {});
React.render(element, document.querySelector('.container'));
