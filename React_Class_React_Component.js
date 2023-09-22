/*
	import React from 'react' creates a JavaScript object. This object contains properties that are needed to make React work, such as React.createElement() and React.Component.

	import ReactDOM from 'react-dom' creates another JavaScript object. This object contains methods that help React interact with the DOM, such as ReactDOM.render().

	by subclassing React.Component, you create a new component class. This is not a component! A component class is more like a factory that produces components.
	When you start making components, each one will come from a component class.

	Whenever you create a component class, you need to give that component class a name. That name should be written in UpperCamelCase. In this case, your chosen name is MyComponentClass.

*/

class MyComponent extends React.Component {
  render(){
    return (
      <blockquote>
        <p>
          What is important now is to recover our senses.
        </p>
        <cite>
          <a target="_blank" 
            href="https://en.wikipedia.org/wiki/Susan_Sontag">
            Susan Sontag
          </a>
        </cite>
      </blockquote>
    );
  }
};

ReactDOM.render(<MyComponent/>, document.getElementById('app'));