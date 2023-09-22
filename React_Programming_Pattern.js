// ====== App.js ======
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Video from './Video';
import Menu from './Menu';

const VIDEOS = {
  fast: 'https://content.codecademy.com/courses/React/react_video-fast.mp4',
  slow: 'https://content.codecademy.com/courses/React/react_video-slow.mp4',
  cute: 'https://content.codecademy.com/courses/React/react_video-cute.mp4',
  eek: 'https://content.codecademy.com/courses/React/react_video-eek.mp4'
};

function App() {
                const [src, setSrc] = useState(VIDEOS.fast);

  const onSelectVideoHandler = (newVideo) => {
    setSrc(VIDEOS[newVideo]);
  }

                return (
      <div>
        <h1>Video Player</h1>
        <Menu onSelectVideo={onSelectVideoHandler}/>
        <Video src={src}/>
      </div>
    );
};

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);


// ====== Menu.js ======
function Menu(props) {
  const clickHandler = (event) => {
    const name = event.target.value;
    props.onSelectVideo(name);
  }

                return (
                                 <form onClick={clickHandler}>
                                                 <input type="radio" name="src" value="fast"/> fast
                                                 <input type="radio" name="src" value="slow" /> slow
                                                 <input type="radio" name="src" value="cute" /> cute
                                                 <input type="radio" name="src" value="eek" /> eek
                                 </form>
                               );
};

export default Menu;


// ====== Video.js ======
function Video(props) {
    return (
      <div>
        <video src={props.src} controls autostart autoPlay muted/>
      </div>
    );
};

export default Video;
