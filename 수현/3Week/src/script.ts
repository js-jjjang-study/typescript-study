/*
- Display custom video player styled with CSS
- Play/pause
- Stop
- Video progress bar
- Set progress bar time
- Display time in mins and seconds
*/
{
  const video = document.getElementById("video") as HTMLVideoElement;
  const play = document.getElementById("play");
  const stop = document.getElementById("stop");
  const progress = document.getElementById("progress");
  const timestamp = document.getElementById("timestamp");

  video?.addEventListener("click");
  video?.addEventListener("play");
  video?.addEventListener("pasue");
  video?.addEventListener("setTime");

  // Play/pause
}
