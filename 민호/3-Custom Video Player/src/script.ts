const video = document.getElementById('video') as HTMLVideoElement;
const playButton = document.getElementById('play') as HTMLButtonElement;
const stopButton = document.getElementById('stop') as HTMLButtonElement;
const progressBar = document.getElementById('progress') as HTMLInputElement;
const timestamp = document.getElementById('timestamp') as HTMLSpanElement;

type playOrStopFunc = () => void;
type swapIconFunc = () => void;
type setStateFunc<T> = (state: T) => void;
type stateFunc<T> = () => T;

type playStateObj = {
  play: any;
  // false >> 일시정지 or 정지
  // true >> 재생
};

const changeState = <T extends playStateObj>(
  status: T,
): [stateFunc<T>, setStateFunc<T>] => {
  let initialState = status;

  const state: stateFunc<T> = () => initialState as T;

  const setState: setStateFunc<T> = (newState: T) => {
    initialState = newState;
  };

  return [state, setState];
};
const initialState: playStateObj = { play: false };
const [playState, setPlayState] = changeState(initialState);

const playOrStop: playOrStopFunc = () => {
  // 재생중일 때
  if (playState().play) {
    video.pause();
    setPlayState({ play: false });
    playButton.innerHTML = '<i class="fa fa-play fa-2x"></i>';
    return;
  }
  //일시정지 or 정지일 때
  if (!playState().play) {
    video.play();
    setPlayState({ play: true });
    playButton.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
    return;
  }
};

const progress = () => {
  video.currentTime = (Number(progressBar.value) * video.duration) / 100;
};

video.addEventListener('click', playOrStop);
playButton.addEventListener('click', playOrStop);