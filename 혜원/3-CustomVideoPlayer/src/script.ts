const video = document.getElementById('video') as HTMLVideoElement;
const playBtn = document.getElementById('play') as HTMLButtonElement;
const stopBtn = document.getElementById('stop') as HTMLButtonElement;
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

video.addEventListener('click', videoPlay);
playBtn.addEventListener('click', playOrPause);
stopBtn.addEventListener('click', videoStop);