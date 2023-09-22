// ========== Child.js ==========
import React from 'react';

export class Child extends React.Component {
  render(){
    return (
      <h1>
        Hey, my name is {this.props.name}!
      </h1>
    );
  }
}


// ========== Parent.js ==========
import React from 'react';
import ReactDOM from 'react-dom';
import { Child } from './Child';

class Parent extends React.Component {
  constructor(props){
    super(props);
    this.state = {name: 'Frarthur'};
  }

  render(){
    return <Child name={this.state.name}/>;
  }
} 

ReactDOM.render(<Parent/>, document.getElementById('app'));