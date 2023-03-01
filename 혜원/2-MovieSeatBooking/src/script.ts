const movie = <HTMLSelectElement>document.getElementById('movie');
const seats = document.querySelectorAll('.container .seat');
const count = document.getElementById('count');
const total = document.getElementById('total');
let numOfSeats = 0;
let selectedSeats: Array<number> = [];

getStorage();

function setStorage() {
  const seatsString = JSON.stringify(selectedSeats);

  localStorage.setItem('selectedSeats', seatsString);
  localStorage.setItem('numOfSeats', numOfSeats.toString());
  localStorage.setItem('movieValue', movie.value);
}

function getStorage() {

  if(localStorage.getItem('selectedSeats')) {
    const seatsString = localStorage.getItem('selectedSeats');
    selectedSeats = JSON.parse(seatsString!);
    selectedSeats.forEach(el => {
      seats[el].className = 'seat selected';
    })
  }

  if(localStorage.getItem('numOfSeats')) {
    const numOfSeatsString = localStorage.getItem('numOfSeats');
    numOfSeats = Number(numOfSeatsString!);
  }

  if(localStorage.getItem('movieValue')){
    movie.value = localStorage.getItem('movieValue')!;
  }

  changeInfo();
}

function changeInfo () {
  count!.innerHTML = `${numOfSeats}`;
  const price = numOfSeats * Number(movie.value);
  total!.innerHTML = `${price}`;
  setStorage();
}

function findIndex(seat: HTMLDivElement): number {
  let i = -1;

  for(i = 0; i < seats.length; i++) {
    if(seats.item(i) == seat) {
      return i;
    }
  }

  return i;
}

function clickSeat (e: Event) {
  const seat = e.target as HTMLDivElement;

  if(seat.className == 'seat') {
    seat.className = 'seat selected';
    selectedSeats.push(findIndex(seat));
    numOfSeats++;
    changeInfo();
    return;
  }

  if(seat.className == 'seat selected') {
    seat.className = 'seat';
    numOfSeats--;
    for(let i = 0; i < selectedSeats.length; i++) {
      if(selectedSeats[i] === findIndex(seat))  {
        selectedSeats.splice(i, 1);
        i--;
      }
    }
    changeInfo();
    return;
  }
}

seats.forEach(el => el.addEventListener('click', clickSeat));
movie.addEventListener('change', changeInfo);