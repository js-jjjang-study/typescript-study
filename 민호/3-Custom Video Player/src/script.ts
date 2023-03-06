const video = document.getElementById('video') as HTMLVideoElement;
const playButton = document.getElementById('play') as HTMLButtonElement;
const stopButton = document.getElementById('stop') as HTMLButtonElement;
const progressBar = document.getElementById('progress') as HTMLInputElement;
const timestamp = document.getElementById('timestamp') as HTMLSpanElement;

// 상태 수정 함수 , 상태 리턴 함수
type setStateFunc<T> = (state: T) => void;
type stateFunc<T> = () => T;

// 상태가 가질 수 있는 값
type TF=true|false

// 상태 인터페이스
interface playStateObj {
  play: TF; // false : 일시정지 or 정지 ,  true : 재생
}

type playOrStopFunc = () => void;
type swapIconFunc = () => void;
type changeProgressBarFunc = () => void;
type setVideoByProgressbarFunc = () => void;
type changeTimeFunc = () => void;
type stopVideoFunc = () => void;

// [상태,상태 변경 함수]를 리턴하는 changeState함수
const changeState = <T extends playStateObj>(status: T): [stateFunc<T>, setStateFunc<T>] => {

  let initialState = status;

  const state: stateFunc<T> = () => initialState as T;

  const setState: setStateFunc<T> = (newState: T) => {
    initialState = newState;
  };

  return [state, setState];
};


// 초기 상태 선언
const initialState: playStateObj = { play: false };
const [playState, setPlayState] = changeState(initialState);


// 일시 정지 , 재생을 다루는 함수
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

// 동영상 진행에 따른 프로그래스바 이동 함수
const changeProgressBar: changeProgressBarFunc = () => {
  const current: string = String((video.currentTime / video.duration) * 100);

  progressBar.value = current;
};

// 동영상 진행에 따른 하단부의 시간을 업데이트 하는 함수
const changeTime: changeTimeFunc = () => {
  let min: number = Math.floor(video.currentTime / 60);
  let second: number = Math.floor(video.currentTime % 60);

  timestamp.innerHTML = `${min}:${second}`;
};

// 프로그래스바 변경시 , 동영상 위치 조정 함수
const setVideoByProgressbar: setVideoByProgressbarFunc = () => {
  video.currentTime = (Number(progressBar.value) * video.duration) / 100;
};

// 동영상 정지 함수
const stopVideo: stopVideoFunc = () => {
  if(playState().play===false){
    setPlayState({ play: true }); 
  }
  video.currentTime = 0;
  playOrStop();

  // video.pause();
	// video.currentTime = 0;
  // setPlayState({ play: false });
  // playButton.innerHTML = '<i class="fa fa-play fa-2x"></i>';
};


// 이벤트 할당
video.addEventListener('click', playOrStop);
video.addEventListener('timeupdate', changeTime);
video.addEventListener('timeupdate', changeProgressBar);
playButton.addEventListener('click', playOrStop);
progressBar.addEventListener('change', setVideoByProgressbar);
stopButton.addEventListener('click', stopVideo);
