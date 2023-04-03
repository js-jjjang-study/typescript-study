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

type LetterStore = null | string[];

const successText = "성공하셨습니다!! 다시 플레이 하시겠습니까?";
const failText = "실패하였습니다. 다시 플레이 하시겠습니까?";
const words = ["typescript", "javascript", "react"];
const correctLetters: LetterStore = [];
const enteredLetters: LetterStore = [];
const wrongLetters: LetterStore = [];
let isEnd = false;
let answer = words[Math.floor(Math.random() * words.length)];
let blankCnt = answer.length;

const reset = () => {
  correctLetters.splice(0);
  enteredLetters.splice(0);
  wrongLetters.splice(0);
  isEnd = false;
  answer = words[Math.floor(Math.random() * words.length)];
  blankCnt = answer.length;
  popupEl.style.display = "none";
};

const isCorrectAll = () => {
  return blankCnt === 0;
};

const isHangmanDead = () => {
  return wrongLetters.length === 6;
};

const updateCorrectLetters = () => {
  wordEl.innerHTML = `${answer
    .split("")
    .map((letter) => {
      return `<label class="letter">${
        correctLetters.includes(letter) ? letter : ""
      }</label>`;
    })
    .join("")}`;
};

const updateWrongLetters = () => {
  wrongLettersEl.innerHTML = `${wrongLetters.join(", ")}`;

  figurePartEl.forEach((part, idx) => {
    console.log(part);
    part.style.display = idx < wrongLetters.length ? "block" : "none";
  });
};

const update = () => {
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

const showNotification = () => {
  notificationContainerEl.classList.add("show");
  setTimeout(() => notificationContainerEl.classList.remove("show"), 1000);
};

window.addEventListener("keydown", (e) => {
  if (!isEnd) {
    const letter = e.key.toLowerCase();
    // 알파벳인지 확인
    if (letter.charCodeAt(0) >= 97 && letter.charCodeAt(0) <= 122) {
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

    if (isCorrectAll() || isHangmanDead()) {
      isEnd = true;
      finalMessageRevealWordEl.innerHTML = isCorrectAll()
        ? successText
        : failText;
      popupEl.style.display = "flex";

      playButtonEl.addEventListener("click", (e) => {
        reset();
        update();
      });
    }
  }
});
