"use strict";
const video = document.getElementById('video');
const playBtn = document.getElementById('play');
const playIcon = playBtn.querySelector('i');
const playIconList = playIcon.classList;
const ResetBtn = document.getElementById('stop');
const progressBar = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');
const videoStatus = () => {
    playIconList.contains('fa-play') ? videoPlay() : videoStop();
};
const videoPlay = () => {
    // playIconList.splice(1, 1, 'fa-pause'); 'DOMTokenList' 유형에 'splice' 속성이 없어서 replace사용했습니다.
    playIconList.replace('fa-play', 'fa-pause');
    video.play();
    return;
};
const videoStop = () => {
    playIconList.replace('fa-pause', 'fa-play');
    video.pause();
    return;
};
// 비디오 리셋 버튼을 눌렀을 때 영상 0초로 가게하기, 재생버튼으로 아이콘 변경
const videoReset = () => {
    playIconList.replace('fa-pause', 'fa-play');
    video.currentTime = 0;
    video.pause();
    return;
};
const displayTime = () => {
    const minutes = `0${video.currentTime / 60}`.slice(0, 2);
    const seconds = `0${video.currentTime % 60}`.slice(0, 2);
    timestamp.innerHTML = `${minutes}:${seconds}`;
};
const progressBarMove = () => {
    if (video.duration !== 0) {
        progressBar.value = ((video.currentTime * Number(progressBar.max)) /
            video.duration).toString();
    }
};
const setCurrentTime = () => {
    video.currentTime =
        (video.duration * Number(progressBar.value)) / Number(progressBar.max);
    return;
};
//DOMTokenList에 대한 설명 https://developer.mozilla.org/ko/docs/Web/API/DOMTokenList
video.addEventListener('timeupdate', displayTime);
video.addEventListener('timeupdate', progressBarMove);
video.addEventListener('click', videoPlay);
video.addEventListener('ended', videoStop);
progressBar.addEventListener('change', setCurrentTime);
playBtn.addEventListener('click', videoStatus);
ResetBtn.addEventListener('click', videoReset);
