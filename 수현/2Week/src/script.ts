// Display UI with movie select, screen, seats, legend & seat info

const container = document.querySelector(".container") as HTMLParagraphElement;
const movieContainer = document.querySelector(
  ".movie-container"
) as HTMLParagraphElement;
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");

let selectCnt = 0;
let nowMovie = 0;
let nowMoviePrice = 0;

const load = () => {
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

// User can select a movie/price
movieContainer.addEventListener("change", (e: Event) => {
  nowMoviePrice = +(e.target as HTMLInputElement).value;
  updateInfo();
  storeLocal(movieSelect.selectedIndex, nowMoviePrice);
});

// User can select/deselect seats

// User can not select occupied seats

container.addEventListener("click", (e: Event) => {
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

// Number of seats and price will update
const updateInfo = () => {
  const checkSelected = document.querySelectorAll(".row .seat.selected");
  const selectedIndex = [...checkSelected].map((selectedSeat) =>
    [...seats].indexOf(selectedSeat)
  );
  localStorage.setItem("seatIndexInfo", JSON.stringify(selectedIndex));
  count!.innerText = String(selectCnt);
  total!.innerText = String(nowMoviePrice * selectCnt);
};

// Save seats, movie and price to local storage so that UI is still populated on refresh
const storeLocal = (movieInfo: number, selectPrice: number) => {
  localStorage.setItem("selectMovieInfo", String(movieInfo));
  localStorage.setItem("selectPriceInfo", String(selectPrice));
};
