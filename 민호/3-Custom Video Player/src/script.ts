const video = document.getElementById('video') as HTMLVideoElement;
const playButton = document.getElementById('play') as HTMLButtonElement;
const stopButton = document.getElementById('stop') as HTMLButtonElement;
const progressBar = document.getElementById('progress') as HTMLInputElement;
const timestamp = document.getElementById('timestamp') as HTMLSpanElement;

type setStateFunc<T> = (state: T) => void;
type stateFunc<T> = () => T;

type playOrStopFunc = () => void;
type swapIconFunc = () => void;
type changeProgressBarFunc = () => void;
type changeTimeFunc = () => void;
type stopVideoFunc = () => void;
type setVideoByProgressbarFunc = () => void;

interface playStateObj {
  play: any;
  // false >> 일시정지 or 정지
  // true >> 재생
}

// 상태 변경 함수
const changeState = <T extends playStateObj>(status: T): [stateFunc<T>, setStateFunc<T>] => {

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

const changeProgressBar: changeProgressBarFunc = () => {
  const current: string = String((video.currentTime / video.duration) * 100);

  progressBar.value = current;
};

const changeTime: changeTimeFunc = () => {
  let min: number = Math.floor(video.currentTime / 60);
  let second: number = Math.floor(video.currentTime % 60);

  timestamp.innerHTML = `${min}:${second}`;
};

const setVideoByProgressbar: setVideoByProgressbarFunc = () => {
  video.currentTime = (Number(progressBar.value) * video.duration) / 100;
};

const stopVideo: stopVideoFunc = () => {
  setPlayState({ play: true }); // 일시정지일때(false) playOrStop()을 호출하면
  // 정지를 하자마자 다시 동영상이 재생되는 로직이 실행되므로
  // 정지할때만 이렇게 임의로 상태값을 강제로 true로 변경
  video.currentTime = 0;
  playOrStop();

  // video.pause();
  // setPlayState({ play: false });
  // playButton.innerHTML = '<i class="fa fa-play fa-2x"></i>';
};

video.addEventListener('click', playOrStop);
video.addEventListener('timeupdate', changeTime);
video.addEventListener('timeupdate', changeProgressBar);
playButton.addEventListener('click', playOrStop);
progressBar.addEventListener('change', setVideoByProgressbar);
stopButton.addEventListener('click', stopVideo);
