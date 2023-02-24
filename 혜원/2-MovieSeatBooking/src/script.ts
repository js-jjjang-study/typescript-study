const movie = document.getElementById('movie');
const seats = document.querySelectorAll('.container .seat');

function clickSeat (e: Event) {
  const seat = e.target as HTMLDivElement;
  if(seat.className == 'seat') {
    seat.className = 'seat selected';
    return;
  }
  if(seat.className == 'seat selected') {
    seat.className = 'seat';
    return;
  }
}

seats.forEach(el => el.addEventListener('click', clickSeat));