"use strict";
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let seatStatus = {
    seatNum: [],
};
let movieStatus = {
    movieIndex: movieSelect.selectedIndex,
    moviePirce: Number(movieSelect.value),
};
const initialSetting = () => {
    let arr = [];
    seats.forEach((i, index) => {
        arr.push(index);
    });
    let localStorageResult;
    // 좌석 불러오기
    localStorageResult = localStorage.getItem('selectedSeats');
    // 브라우저 최초 실행 시
    if (localStorageResult === null) {
        localStorage.setItem('selectedSeats', JSON.stringify(seatStatus));
    }
    if (localStorageResult !== null) {
        let status = JSON.parse(localStorageResult);
        // 상태 변경
        seatStatus = Object.assign({}, status);
        // css변경을 위한 클래스명 추가
        seatStatus.seatNum.forEach((i) => {
            if (arr.includes(i)) {
                seats[i].classList.add('selected');
            }
        });
    }
    // 선택된 영화 불러오기
    localStorageResult = localStorage.getItem('selectedMovieInfo');
    // 브라우저 최초 실행 시
    if (localStorageResult === null) {
        localStorage.setItem('selectedMovieInfo', JSON.stringify(movieStatus));
    }
    if (localStorageResult !== null) {
        let status = JSON.parse(localStorageResult);
        // 상태 변경
        movieStatus = Object.assign({}, status);
        // select태그 값 변경
        movieSelect.selectedIndex = movieStatus.movieIndex;
        // 하단 메세지 수정
        changeText();
    }
};
// 브라우저 하단에 배치된 선택 좌석 갯수 , 총 금액 메세지 수정 메소드
const changeText = () => {
    let status = JSON.parse(localStorage.getItem('selectedSeats'));
    let currentSeatsCount = status.seatNum.length;
    count.innerText = String(currentSeatsCount);
    total.innerText = String(currentSeatsCount * movieStatus.moviePirce);
};
// 좌석 업데이트 메소드
const updateSeats = () => {
    const newSelectedNodes = Array.from(document.querySelectorAll('.row .seat.selected'));
    let arr = newSelectedNodes.map((i) => {
        return Array.from(seats).indexOf(i);
    });
    // 상태 변경
    let status = {
        seatNum: arr,
    };
    seatStatus = Object.assign({}, status);
    // 변경된 상태를 로컬스토리지에 등록
    localStorage.setItem('selectedSeats', JSON.stringify(seatStatus));
    changeText();
};
movieSelect.addEventListener('change', (e) => {
    let price = Number(e.target.value);
    let index = Number(e.target.selectedIndex);
    let status = {
        movieIndex: index,
        moviePirce: price,
    };
    movieStatus = Object.assign({}, status);
    localStorage.setItem('selectedMovieInfo', JSON.stringify(movieStatus));
    changeText();
});
// Seat click event
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSeats();
    }
});
initialSetting();
