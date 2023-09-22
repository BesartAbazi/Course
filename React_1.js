import React from 'react';
import ReactDOM from 'react-dom';

const animals = {
  dolphin: {
    image: '/images/dolphin.jpg',
    facts: ['Dolphins have been shown to give distinct names to each other!', 'Dolphins are known to display their own culture!', 'Dolphins have two stomachs!']
  },
  lobster: {
    image: '/images/lobster.jpg',
    facts: ['Lobsters taste with their legs!', 'Lobsters chew with their stomachs!', 'Lobsters can live as long as 100 years.']
  },
  starfish: {
    image: '/images/starfish.jpg',
    facts: ['Starfish can have up to 40 arms!', 'Starfish have no brain and no blood!', 'Starfish can regenerate their own arms!']
  }
};

const title = 'Click an animal for a fun fact';
const background = React.createElement(
    'img',
    {
        src: '/images/ocean.jpg',
        className: 'background',
        alt: 'ocean'
    }
  );

const showBackground = true;

const displayFact = (e) => {
  const funFact = animals[e.target.alt].facts[Math.floor(Math.random() * animals[e.target.alt].facts.length)];
  document.getElementById('fact').innerHTML = funFact;
}

const images = [];
for (let animal in animals){
  images.push(<img className="animal" onClick={displayFact} key={animal} alt={animal} src={animals[animal].image} aria-label={animal} role='button'/>);
}

const animalFacts = (
  <div>
    <h1>{title}</h1>
    {showBackground && background}
    <div className="animals">
      {images}
    </div>
    <p id="fact">
    </p>
  </div>
);

ReactDOM.render(animalFacts, document.getElementById('root'))