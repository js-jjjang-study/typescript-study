const container = document.querySelector('.container') as HTMLDivElement;
const seats = document.querySelectorAll(
  '.row .seat:not(.occupied)',
) as NodeListOf<Element>;
const count = document.getElementById('count') as HTMLSpanElement;
const total = document.getElementById('total') as HTMLSpanElement;
const movieSelect = document.getElementById('movie') as HTMLSelectElement;

type initialSettingFunc = () => void;
type changeTextFunc = () => void;
type updateSeatsFunc = () => void;

type seatIndex = {
  seatNum: number[];
};
let seatStatus: seatIndex = {
  seatNum: [],
};

type movieInfo = {
  movieIndex: number;
  moviePirce: number;
};
let movieStatus: movieInfo = {
  movieIndex: movieSelect.selectedIndex,
  moviePirce: Number(movieSelect.value),
};

const initialSetting: initialSettingFunc = () => {
  let arr: number[] = [];
  seats.forEach((i, index) => {
    arr.push(index);
  });

  let localStorageResult: string | null;

  // 좌석 불러오기
  localStorageResult = localStorage.getItem('selectedSeats');

  // 브라우저 최초 실행 시
  if (localStorageResult === null) {
    localStorage.setItem('selectedSeats', JSON.stringify(seatStatus));
  }
  if (localStorageResult !== null) {
    let status: seatIndex = JSON.parse(localStorageResult);

    // 상태 변경
    seatStatus = { ...status };

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
    let status: movieInfo = JSON.parse(localStorageResult);

    // 상태 변경
    movieStatus = { ...status };

    // select태그 값 변경
    movieSelect.selectedIndex = movieStatus.movieIndex;

    // 하단 메세지 수정
    changeText();
  }
};

// 브라우저 하단에 배치된 선택 좌석 갯수 , 총 금액 메세지 수정 메소드
const changeText: changeTextFunc = () => {
  let status: seatIndex = JSON.parse(localStorage.getItem('selectedSeats')!);
  let currentSeatsCount: number = status.seatNum.length;
  count.innerText = String(currentSeatsCount);
  total.innerText = String(currentSeatsCount * movieStatus.moviePirce!);
};

// 좌석 업데이트 메소드
const updateSeats: updateSeatsFunc = () => {
  const newSelectedNodes: Element[] = Array.from(
    document.querySelectorAll('.row .seat.selected') as NodeListOf<Element>,
  );

  let arr: number[] = newSelectedNodes.map((i) => {
    return Array.from(seats).indexOf(i);
  });

  // 상태 변경
  let status: seatIndex = {
    seatNum: arr,
  };
  seatStatus = { ...status };

  // 변경된 상태를 로컬스토리지에 등록
  localStorage.setItem('selectedSeats', JSON.stringify(seatStatus));

  changeText();
};

movieSelect.addEventListener('change', (e: Event) => {
  let price: number = Number((e.target as HTMLSelectElement).value);
  let index: number = Number((e.target as HTMLSelectElement).selectedIndex);

  let status: movieInfo = {
    movieIndex: index,
    moviePirce: price,
  };
  movieStatus = { ...status };
  localStorage.setItem('selectedMovieInfo', JSON.stringify(movieStatus));

  changeText();
});

// Seat click event
container.addEventListener('click', (e: Event) => {
  if (
    (e.target as HTMLDivElement).classList.contains('seat') &&
    !(e.target as HTMLDivElement).classList.contains('occupied')
  ) {
    (e.target as HTMLDivElement).classList.toggle('selected');

    updateSeats();
  }
});

initialSetting();
