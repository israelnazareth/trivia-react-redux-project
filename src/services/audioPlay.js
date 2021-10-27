export const audio = new Audio('../assets/sounds/sound_move-grid.mp3');

export const playAudio = () => {
  audio.play();
};

export const stopAudio = () => {
  audio.pause();
};

// return (
//   <div className="App">
//     <button
//       onClick={props.onClick}
//       onMouseEnter={playAudio}
//       onMouseLeave={stopAudio}
//     >
//       Play
//     </button>
