const container = document.querySelector('.container') as HTMLDivElement;
const seats = document.querySelectorAll(
  '.row .seat:not(.occupied)',
) as NodeListOf<HTMLElement>;
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

// 브라우저 하단에 배치된 선택 좌석 갯수 , 총 금액 메세지 수정 메소드
const changeText: changeTextFunc = () => {
  let status: seatIndex = JSON.parse(localStorage.getItem('selectedSeats')!);
  let currentSeatsCount: number = status.seatNum.length;
  count.innerText = String(currentSeatsCount);
  total.innerText = String(currentSeatsCount * movieStatus.moviePirce!);
};

const initialSetting: initialSettingFunc = () => {
  // occupied가 아닌 좌석들의 인덱스를 가지는 배열
  let nonoOccupied: number[] = [];
  seats.forEach((i, index) => {
    //i는 div요소를 나타내고 이 로직에서는 div요소의 인덱스가 좌석 번호를 의미함
    nonoOccupied.push(index);
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

    // 상태 업데이트
    seatStatus = { ...status };

    // css변경을 위한 클래스명 추가
    seatStatus.seatNum.forEach((i) => {
      if (nonoOccupied.includes(i)) {
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

    // 상태 업데이트
    movieStatus = { ...status };

    // select요소의 선택 인덱스 변경
    // 브라우저 재 실행시, select의 값이 바뀌어져 있는 경우가 있으므로
    // movieStatus의 값을 기반으로 변경해 줘야 함
    movieSelect.selectedIndex = movieStatus.movieIndex;

    // 하단 메세지 수정
    changeText();
  }
};

// 좌석 업데이트 메소드
const updateSeats: updateSeatsFunc = () => {
  const newSelectedNodes: HTMLElement[] = Array.from(
    document.querySelectorAll('.row .seat.selected') as NodeListOf<HTMLElement>,
  );

  const seatsArr = Array.from(seats);
  let selectedSeatsArr: number[] = newSelectedNodes.map((i) => {
    return seatsArr.indexOf(i);
  });

  // 상태 업데이트
  let status: seatIndex = {
    seatNum: selectedSeatsArr,
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
