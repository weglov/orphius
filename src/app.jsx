var React = require('react');

var Hello = React.createClass({
  render: function() {
    return <h1>
      Hello
    </h1>
  }
});


var element = React.createElement(Hello, {});
React.render(element, document.querySelector('.content'));