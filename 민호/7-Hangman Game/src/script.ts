const correct = document.getElementById('word') as HTMLDivElement;
const wrong = document.getElementById('wrong-letters') as HTMLDivElement;
const duplication = document.getElementById('notification-container') as HTMLDivElement;
const popup = document.getElementById('popup-container') as HTMLDivElement;
const playAgainButton = document.getElementById('play-button') as HTMLButtonElement;
const finalMessage = document.getElementById('final-message') as HTMLElement;
const finalMessageRevealWord = document.getElementById('final-message-reveal-word') as HTMLElement;
const hangman = Array.from(document.querySelectorAll('.figure-part')) as HTMLElement[];

type answerState = {
  stateName: 'answerState';
  words: string[];
};
type wrongState = {
  stateName: 'wrongState';
  words: string[];
};
type playableState = {
  stateName: 'playableState';
  isPlayable: boolean;
};

type stateType = answerState | wrongState | playableState;

const useState = <T extends stateType>(status: T): [() => T, (state: T) => void] => {
  let initialState = status;

  const state = () => initialState as T;

  const setState = (newState: T) => {
    initialState = newState;

    // playableState상태가 변경 됐을 때는 리렌더링을 안 함
    if (newState.stateName === 'answerState') {
      answerRender();
    }
    if (newState.stateName === 'wrongState') {
      wrongRender();
    }
  };

  return [state, setState];
};

const [getAnswerState, setAnswerState] = useState({
  stateName: 'answerState',
  words: [],
} as answerState);

const [getwrongState, setwrongState] = useState({
  stateName: 'wrongState',
  words: [],
} as wrongState);

const [getPlayableState, setPlayableState] = useState({
  stateName: 'playableState',
  isPlayable: true,
} as playableState);

const words = ['application', 'programming', 'interface', 'wizard'];
const getRandomAnswer = () => {
  let randomIndex = Math.floor(Math.random() * words.length);

  return words[randomIndex];
};

// 글자를 맞췄을 때의 리렌더링 로직
const answerRender = () => {
  const current = getAnswerState().words;
  correct.innerHTML = '';
  const compareResult = randomAnswer.split('').map((i) => {
    return current.includes(i) ? i : '';
  });

  for (let i of compareResult) {
    correct.innerHTML += `<span class="letter">${i}</span>`;
  }

  let check = new Set(randomAnswer);
  if (current.length === check.size) {
    finalMessage.innerText = 'Congratulations! You won! 😃';
    finalMessageRevealWord.innerText = '';
    popup.style.display = 'flex';

    setPlayableState({
      stateName: 'playableState',
      isPlayable: false,
    });
  }
};

// 글자를 틀렸을 때의 리렌더링 로직
const wrongRender = () => {
  const current = getwrongState().words;

  if (current.length > 0) {
    wrong.innerHTML = `<p>Wrong</p>`;
    current.forEach((i) => {
      wrong.innerHTML += `<span>${i}</span>`;
    });
  }
  if (current.length === 0) {
    wrong.innerHTML = '';
  }

  for (let i = 0; i < hangman.length; i++) {
    console.log(`current.length ${current.length}`);
    if (i < current.length) hangman[i].style.display = 'block';
    if (i >= current.length) hangman[i].style.display = 'none';
  }

  if (current.length === hangman.length) {
    finalMessage.innerText = 'Unfortunately you lost. 😕';
    finalMessageRevealWord.innerText = `...the word was: ${randomAnswer}`;
    popup.style.display = 'flex';

    setPlayableState({
      stateName: 'playableState',
      isPlayable: false,
    });

    return;
  }
};

// 이미 입력했던 값을 입력했을 때 발생
const showDuplication = () => {
  duplication.classList.add('show');

  setTimeout(() => {
    duplication.classList.remove('show');
  }, 2000);
};

// 첫 판 시작
let randomAnswer = getRandomAnswer();
console.log(randomAnswer);
answerRender();

// 키보드 입력 이벤트
const keyboardEvent = (e: KeyboardEvent) => {
  let currentPlayable = getPlayableState().isPlayable;
  let currentAnswer = getAnswerState().words;
  let currentWrong = getwrongState().words;

  if (!currentPlayable) return;

  let keyboardInput = e.key.toLowerCase();

  if (randomAnswer.includes(keyboardInput)) {
    // 중복처리
    if (!currentAnswer.includes(keyboardInput)) {
      currentAnswer.push(keyboardInput);
      setAnswerState({
        stateName: 'answerState',
        words: currentAnswer,
      });
      return;
    }

    if (currentAnswer.includes(keyboardInput)) {
      showDuplication();
      return;
    }
  }

  if (!randomAnswer.includes(keyboardInput)) {
    // 중복처리
    if (!currentWrong.includes(keyboardInput)) {
      currentWrong.push(keyboardInput);
      setwrongState({
        stateName: 'wrongState',
        words: currentWrong,
      });
      return;
    }

    if (currentWrong.includes(keyboardInput)) {
      showDuplication();
      return;
    }
  }
};

// 재시작
const reStart = () => {
  randomAnswer = getRandomAnswer();
  console.log(randomAnswer);

  popup.style.display = 'none';

  setPlayableState({
    stateName: 'playableState',
    isPlayable: true,
  } as playableState);
  setAnswerState({
    stateName: 'answerState',
    words: [],
  } as answerState);
  setwrongState({
    stateName: 'wrongState',
    words: [],
  } as wrongState);
};

// 이벤트 할당
window.addEventListener('keydown', keyboardEvent);
playAgainButton.addEventListener('click', reStart);
