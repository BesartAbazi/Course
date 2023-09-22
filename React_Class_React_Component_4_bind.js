import React from 'react';
import ReactDOM from 'react-dom';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: 'swordfish',
      authorized: false
    };
    this.authorize = this.authorize.bind(this);
	/*	Due to the way that event handlers are bound in JavaScript, this.authorize() loses its this when it is used in the return function. 
		Therefore, the expressions this.state.authorized won’t mean what they’re supposed to… unless you have already bound the correct this to this.authorize. 
		That is why we must bind this.authorize to this with this.authorize = this.authorize.bind(this);
		For the less curious, just know that in React, whenever you define an event handler that uses this, you need to add this.methodName = this.methodName.bind(this) to your constructor function.
	*/
  }

  authorize(e) {
    const password = e.target.querySelector('input[type="password"]').value;
    const auth = password == this.state.password;
    this.setState({
      authorized: auth
    });
  }

  render() {
    const login = (
      <form action="#" onSubmit={this.authorize}>
        <input type="password" placeholder="Password"/>
        <input type="submit"/>
      </form>
    );

    const contactInfo = (
      <ul>
        <li>
          client@example.com
        </li>
        <li>
          555.555.5555
        </li>
      </ul>
    );
    
    return (
      <div id="authorization">
        <h1>{this.state.authorized ? 'Contact' : 'Enter the Password'}</h1>
        {this.state.authorized ? contactInfo : login}
      </div>
    );
  }
}

ReactDOM.render(
  <Contact />, 
  document.getElementById('app')
);