const testWord: string = 'typescript';

const figurePart = document.getElementsByClassName('figure-part');
const word = document.getElementById('word');
const notification = document.getElementById('notification-container');
const popup = document.getElementById('popup-container');
const playBtn = document.getElementById('play-button');
const wrongLetters = document.getElementById('wrong-letters');

const inputKeys = new Array<string>;
const wrongArr = new Array<string>;
let letters = document.getElementsByClassName('letter');
let correctNum = 0;
let flag: boolean = true;

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

function checkKey(e: KeyboardEvent) {
  const key = e.key;

  if(inputKeys.includes(key)) {
    showNotification();
    return;
  }

  if(!inputKeys.includes(key)) {
    inputKeys.push(key);

    if(testWord.includes(key)) keyCorrect(key);
    else keyWrong(key);

    return;
  }
}

function showNotification() {
  notification!.className += ' show';
  setTimeout(() => {
    notification!.className = 'notification-container';
  }, 2000);
}

function keyCorrect(key: string) {
  letters = document.getElementsByClassName('letter');
  for(let i = 0; i < testWord.length; i++) {
    if(testWord[i] == key) {
      const letter = letters[i] as HTMLDivElement;
      letter.style.color = '#fff';
      correctNum++;
    }
  }

  checkEnd();
}

function keyWrong(key: string) {
  wrongArr.push(key);
  const currentFigure = figurePart[wrongArr.length - 1] as SVGElement;
  const spanArr = new Array<string>;
  
  currentFigure.style.display = 'flex';

  wrongArr.forEach(el => {
    const newSpan = `<span>${el}</span>`
    spanArr.push(newSpan);
  })

  const pMsg = document.createElement('p');
  pMsg.innerText = 'Wrong';
  wrongLetters!.innerHTML = '';
  wrongLetters?.insertAdjacentElement('beforeend', pMsg);
  wrongLetters?.insertAdjacentHTML('beforeend', `${spanArr.join(',')}`);

  checkEnd();
}

function checkEnd() {
  const h2 = popup!.children[0].children[0];

  if(wrongArr.length > 5) {
    popup!.style.display = 'flex';
    h2.innerHTML = "Unfortunately you lost. 😕";
    return;
  }

  if(correctNum == testWord.length) {
    popup!.style.display = 'flex';
    h2.innerHTML = "Congratulations! You won! 😃";
    return;
  }
}

window.addEventListener("keydown", (e) => checkKey(e));
playBtn?.addEventListener('click', () => {
  window.location.reload();
});