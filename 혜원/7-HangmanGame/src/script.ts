const testWord: string = 'typescript';

const figurePart = document.getElementsByClassName('figure-part');
const word = document.getElementById('word');

makeWord();

function makeWord() {
  for(let i = 0; i < testWord.length; i++) {
    const letter = document.createElement('div');
    letter.innerText = testWord[i];
    letter.className = 'letter';
    letter.style.color = '#34495e';
    word?.insertAdjacentElement('beforeend', letter);
  }
}