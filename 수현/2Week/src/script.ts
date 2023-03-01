const container = document.querySelector(".container") as HTMLParagraphElement;
const movieContainer = document.querySelector(
  ".movie-container"
) as HTMLParagraphElement;
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie") as HTMLSelectElement;
const seats = document.querySelectorAll(".row .seat:not(.occupied)");

let selectCnt = 0;
let nowMovie = 0;
let nowMoviePrice = 0;

// localStorage에 저장된 정보들 load 하는 기능

const load = (): void => {
  const seatIndexInfo = JSON.parse(localStorage.getItem("seatIndexInfo")!);
  if (seatIndexInfo !== null) {
    seatIndexInfo.forEach((selectedSeat: number, idx: number) => {
      seats.forEach((v, i) => {
        if (selectedSeat === i) {
          v.classList.add("selected");
        }
      });
    });
    selectCnt = seatIndexInfo.length;
    count!.innerText = String(selectCnt);
  }

  const selectMovieInfo = JSON.parse(localStorage.getItem("selectMovieInfo")!);
  if (selectMovieInfo !== null) {
    movieSelect.selectedIndex = selectMovieInfo;
  }
  const selectPriceInfo = JSON.parse(localStorage.getItem("selectPriceInfo")!);
  if (selectPriceInfo !== null) {
    nowMoviePrice = selectPriceInfo;
    total!.innerText = String(nowMoviePrice * selectCnt);
  }
};

load();

// 영화 선택 시, 해당 영화정보, 가격 반영

movieContainer.addEventListener("change", (e: Event) => {
  nowMoviePrice = +(e.target as HTMLInputElement).value;
  updateInfo();
  storeLocal(movieSelect.selectedIndex, nowMoviePrice);
});

/**
 * 유저가 좌석 선택시 작동하는 기능
 * 1. 좌석 선택
 * 2. 좌석 선택 취소
 * 3. 좌석 선택불가
 */

container.addEventListener("click", (e: Event): void => {
  if ((e.target as Element).className === "seat occupied") {
    alert("이미 예약된 좌석입니다.");
  } else {
    if ((e.target as Element).className === "seat") {
      if (window.confirm("자리를 선택하시겠습니까?")) {
        (e.target as Element).classList.toggle("selected");
        selectCnt += 1;
        updateInfo();
      }
    } else if ((e.target as Element).className === "seat selected") {
      if (window.confirm("자리 선택을 취소하시겠습니까?")) {
        (e.target as Element).classList.toggle("selected");
        selectCnt -= 1;
        updateInfo();
      }
    }
  }
});

// 좌석 예매 total 금액 계산 및 paint 기능

const updateInfo = (): void => {
  const checkSelected = document.querySelectorAll(".row .seat.selected");
  const selectedIndex = [...checkSelected].map((selectedSeat) =>
    [...seats].indexOf(selectedSeat)
  );
  localStorage.setItem("seatIndexInfo", JSON.stringify(selectedIndex));
  count!.innerText = String(selectCnt);
  total!.innerText = String(nowMoviePrice * selectCnt);
};

// 선택한 정보들 localStorage에 저장하는 기능

const storeLocal = (movieInfo: number, selectPrice: number): void => {
  localStorage.setItem("selectMovieInfo", String(movieInfo));
  localStorage.setItem("selectPriceInfo", String(selectPrice));
};
