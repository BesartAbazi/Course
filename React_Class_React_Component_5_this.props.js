// CREATE OWN PROP WITH FREE CHOOSEN NAMES (SEE "TALK")
// File button.js
import React from 'react';

export class Button extends React.Component {
  render() {
    return (
      <button onClick={this.props.test}>
        Click me!
      </button>
    );
  }
}

// File Talker.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from './Button';

class Talker extends React.Component {
  talk() {
    let speech = '';
    for (let i = 0; i < 10000; i++) {
      speech += 'blah ';
    }
    alert(speech);
  }
  
  render() {
    return <Button test={this.talk}/>;
  }
}

ReactDOM.render(
  <Talker />,
  document.getElementById('app')
);



// MORE BEAUTIFUL WAY: USE onClick even it is free choosen (as JSX and not HTML)
//==============================================================================

// File Button.js
import React from 'react';

export class Button extends React.Component {
  render() {
    return (
      <button onClick={this.props.onClick}>
        Click me!
      </button>
    );
  }
}

// File Talker.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from './Button';

class Talker extends React.Component {
  handleClick() {
    let speech = '';
    for (let i = 0; i < 10000; i++) {
      speech += 'blah ';
    }
    alert(speech);
  }
  
  render() {
    return <Button onClick={this.handleClick}/>;
  }
}

ReactDOM.render(
  <Talker />,
  document.getElementById('app')
);