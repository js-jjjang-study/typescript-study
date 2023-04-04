const testWord: string = 'typescript';

const figurePart = document.getElementsByClassName('figure-part');
const word = document.getElementById('word');
const notification = document.getElementById('notification-container');
const inputKeys = new Array<string>;
let letters = document.getElementsByClassName('letter');

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

  // keys 에 key 가 있나 확인
  // 있으면 팝업
  // 없으면 word에 포함되어 있나 확인
  // 포함되어 있으면 아래 변경
  // 포함되어 있지 않으면 오른쪽 변경
  
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
    }
  }
}

function keyWrong(key: string) {
  
}

window.addEventListener("keydown", (e) => checkKey(e));