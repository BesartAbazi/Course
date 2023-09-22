// ====== Talker.js ======

import React from 'react';
import Button from './Button';

function Talker() {
  function handleClick() {
    let speech = '';
    for (let i = 0; i < 10000; i++) {
      speech += 'blah ';
    }
    alert(speech);
	}
  return <Button onClickHandle={handleClick}/>;
}

export default Talker;





// ====== Button.js ======

import React from 'react';

function Button(props) {
    return (
      <button onClick={props.onClickHandle}>
        Click me!
      </button>
    );
}

export default Button;