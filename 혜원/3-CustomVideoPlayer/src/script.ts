const video = document.getElementById('video') as HTMLVideoElement;
const playBtn = document.getElementById('play') as HTMLButtonElement;
const stopBtn = document.getElementById('stop') as HTMLButtonElement;
const timestamp = document.getElementById('timestamp');
let duration: number = 0;
const progress = document.getElementById('progress') as HTMLInputElement;
const i = playBtn.firstChild?.nextSibling as HTMLElement;
const classList = i.classList;

function playOrPause() {

  if(classList.contains('fa-play')) {
    videoPlay();
    return;
  }

  if(classList.contains('fa-pause')) {
    videoPause();
    return;
  }

}

function videoPlay() {
  classList.replace('fa-play', 'fa-pause');
  video.play();
  return;
}

function videoPause() {
  classList.replace('fa-pause', 'fa-play');
  video.pause();
  return;
}

function videoStop() {
  classList.replace('fa-pause', 'fa-play');
  video.load();
  return;
}

function displayTime() {
  const min = Math.floor(video.currentTime / 60);
  const sec = Math.floor(video.currentTime % 60);
  let str = '';
  
  if(min < 10) {
    str += '0' + `${min}:`;
  } else {
    str += `${min}:`;
  }

  if(sec < 10) {
    str += '0' + `${sec}`;
  } else {
    str += `${sec}`;
  }

  timestamp!.innerHTML = str;
  return;
}

function progressMove() {
  if(duration !== 0) {
    progress.value = ((video.currentTime * Number(progress.max)) / duration).toString();
  }
}

function setCurrentTime() {
  video.currentTime = duration * Number(progress.value) / Number(progress.max);
  return;
}

video.addEventListener('timeupdate', displayTime);
video.addEventListener('timeupdate', progressMove);
video.addEventListener('click', videoPlay);
video.addEventListener('loadeddata', () => {duration = video.duration});
video.addEventListener('ended', videoPause);

progress.addEventListener('change', setCurrentTime);

playBtn.addEventListener('click', playOrPause);
stopBtn.addEventListener('click', videoStop);