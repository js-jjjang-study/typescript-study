type changeValueFunc = void;

const video = document.getElementById("video") as HTMLVideoElement;
const play = document.getElementById("play") as HTMLButtonElement;
const Stop = document.getElementById("stop") as HTMLButtonElement;
const progress = document.getElementById("progress") as HTMLInputElement;
const timestamp = document.getElementById("timestamp") as HTMLSpanElement;

// - Play/pause
const videoPlayToggle = (): void => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  updateIcon();
};

const updateIcon = (): void => {
  play.innerHTML = video.paused
    ? '<i class="fa fa-play fa-2x"></i>'
    : '<i class="fa fa-pause fa-2x"></i>';
};

// - Stop
const stopVideo = (): void => {
  video.currentTime = 0;
  video.pause();
};

const updateProgressBar = (): void => {
  progress.value = String((video.currentTime / video.duration) * 100);
  const minutes: string = `0${~~(video.currentTime / 60)}`.slice(-2);
  const seconds: string = `0${~~(video.currentTime % 60)}`.slice(-2);

  timestamp!.innerHTML = `${minutes}:${seconds}`;
};

const setTime = (): void => {
  video.currentTime = (+progress.value * video.duration) / 100;
};

video.addEventListener("click", videoPlayToggle);
video.addEventListener("timeupdate", updateProgressBar);

play.addEventListener("click", videoPlayToggle);

Stop.addEventListener("click", stopVideo);

progress.addEventListener("change", setTime);
