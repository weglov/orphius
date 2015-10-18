var React = require('react');

var Hello = React.createClass({
  render: function() {
<<<<<<< HEAD
    return <h1 onClick={this.helperInfo()} className="red">
      Hello!
    </h1>
  },
  helperInfo: function() {
  	console.log(this);
=======
    return <h1 className="red">
      Hello!
    </h1>
>>>>>>> 3e2840c4ce2a16d449bd123b4ec3b1a6bf5b1a34
  }
});

var element = React.createElement(Hello, {});
React.render(element, document.querySelector('.container'));
