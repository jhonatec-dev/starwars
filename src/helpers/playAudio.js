import ligthsaber from '../media/sounds/lightsaber.mp3';
import starwars from '../media/sounds/starwars.mp3';

const backgroundMusic = new Audio(starwars);
const clickSound = new Audio(ligthsaber);

// Setando configs backgroundMusic
backgroundMusic.volume = 0.4;
backgroundMusic.loop = true;
clickSound.volume = 0.15;

export const playSong = () => {
  if(backgroundMusic.paused){
    backgroundMusic.play();
  } 
}

//
export const playClickSound = () => {
  clickSound.pause();
  clickSound.currentTime = 0;
  clickSound.play();
}