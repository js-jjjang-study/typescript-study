/*
Display hangman pole and figure using SVG
Generate a random word
Display word in UI with correct letters
Display wrong letters
Show notification when select a letter twice
Show popup on win or lose
Play again button to reset game
*/

const figurePartEl = document.querySelectorAll<SVGElement>(".figure-part");
const wrongLettersEl = document.getElementById(
  "wrong-letters"
) as HTMLDivElement;
const wordEl = document.getElementById("word") as HTMLDivElement;
const popupEl = document.getElementById("popup-container") as HTMLDivElement;
const finalMessageEl = document.getElementById("final-message") as HTMLElement;
const finalMessageRevealWordEl = document.getElementById(
  "final-message-reveal-word"
) as HTMLElement;
const playButtonEl = document.getElementById(
  "play-button"
) as HTMLButtonElement;
const notificationContainerEl = document.getElementById(
  "notification-container"
) as HTMLDivElement;

type Word = string;

const SUCCESS_MESSAGE = "성공하셨습니다!!😁 다시 플레이 하시겠습니까?";
const FAIL_MESSAGE = "실패하였습니다😭 다시 플레이 하시겠습니까?";
const words = ["typescript", "javascript", "react"];
let answer = words[Math.floor(Math.random() * words.length)];
const correctLetters: Word[] = [];
const enteredLetters: Word[] = [];
const wrongLetters: Word[] = [];
const END = 6;
let isEnd = false;
let blankCnt = answer.length;

const reset = (): void => {
  correctLetters.splice(0);
  enteredLetters.splice(0);
  wrongLetters.splice(0);
  isEnd = false;
  answer = words[Math.floor(Math.random() * words.length)];
  blankCnt = answer.length;
  popupEl.style.display = "none";
};

const updateCorrectLetters = (): void => {
  const letters = answer
    .split("")
    .map((letter) => (correctLetters.includes(letter) ? letter : "_"));

  wordEl.textContent = letters.join(" ");
};

const updateWrongLetters = (): void => {
  wrongLettersEl.textContent = `${wrongLetters.join(", ")}`;

  figurePartEl.forEach((part, idx) => {
    part.style.display = idx < wrongLetters.length ? "block" : "none";
  });
};

const update = (): void => {
  updateCorrectLetters();
  updateWrongLetters();
};

const isEneterd = (letter: string) => {
  return enteredLetters.includes(letter);
};

const checkAnswer = (letter: string) => {
  if (answer.split("").includes(letter)) {
    correctLetters.push(letter);
    answer.split("").forEach((v) => {
      if (letter === v) blankCnt -= 1;
    });
  } else {
    wrongLetters.push(letter);
  }
};

const showNotification = (): void => {
  notificationContainerEl.classList.add("show");
  setTimeout(() => notificationContainerEl.classList.remove("show"), 1000);
};

const isCorrectAll = (): boolean => {
  return blankCnt === 0;
};

const isHangmanDead = (): boolean => {
  return wrongLetters.length === END;
};

const isGameEnd = () => {
  return isCorrectAll() || isHangmanDead();
};

window.addEventListener("keydown", (e) => {
  if (!isEnd) {
    const letter = e.key.toLowerCase();
    // 알파벳인지 확인
    if (/^[a-z]$/.test(letter)) {
      // 이미 입력된 글자인지 확인
      if (isEneterd(letter)) {
        showNotification();
      } else {
        enteredLetters.push(letter);
        // 정답 글자인지 확인
        checkAnswer(letter);
      }
    }

    update();

    if (isGameEnd()) {
      isEnd = true;
      popupEl.style.display = "flex";
      finalMessageRevealWordEl.textContent = isCorrectAll()
        ? SUCCESS_MESSAGE
        : FAIL_MESSAGE;

      playButtonEl.addEventListener("click", () => {
        reset();
        update();
      });
    }
  }
});
