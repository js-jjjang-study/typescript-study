"use strict";
const movie = document.getElementById('movie');
const seats = document.querySelectorAll('.container .seat');
const count = document.getElementById('count');
const total = document.getElementById('total');
let numOfSeats = 0;
function clickSeat(e) {
    const seat = e.target;
    if (seat.className == 'seat') {
        seat.className = 'seat selected';
        numOfSeats++;
        count.innerHTML = `${numOfSeats}`;
        const price = numOfSeats * Number(movie.value);
        total.innerHTML = `${price}`;
        return;
    }
    if (seat.className == 'seat selected') {
        seat.className = 'seat';
        numOfSeats--;
        count.innerHTML = `${numOfSeats}`;
        const price = numOfSeats * Number(movie.value);
        total.innerHTML = `${price}`;
        return;
    }
}
seats.forEach(el => el.addEventListener('click', clickSeat));
