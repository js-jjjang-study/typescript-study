const addUserBtn = document.getElementById('add-user') as HTMLButtonElement;
const doubleBtn = document.getElementById('double') as HTMLButtonElement;
const showMillionBtn = document.getElementById('show-millionaires') as HTMLButtonElement;
const sortBtn = document.getElementById('sort') as HTMLButtonElement;
const calculateBtn = document.getElementById('calculate-wealth') as HTMLButtonElement;
const main = document.getElementById('main');

init();

function init() {
  for(let i = 0; i < 3; i++) {
    addUser();
  }
}

function makeWealth() {
  const wealth = Math.floor(Math.random() * 1000000).toLocaleString('en-US');
  return `\$${wealth}.00`;
}

function addUser() {
  fetch('https://randomuser.me/api/')
    .then((response) => { return response.json() })
    .then((response) => {
      const newPerson = document.createElement('div');
      newPerson.className = "person";
      const personName = document.createElement('strong');
      personName.innerText = [response.results[0].name.first, response.results[0].name.last].join(" ");
      const personWealth = document.createTextNode(makeWealth());
      newPerson.appendChild(personName);
      newPerson.appendChild(personWealth);
      
      main?.insertAdjacentElement('beforeend', newPerson);
    })
}

function double() { // map() 사용

}

function showMillionaires() { // filter() 사용

}

function sort() { // sort() 사용

}

function calculateWealth() { // reduce() 사용

}

addUserBtn.addEventListener('click', addUser);
doubleBtn.addEventListener('click', double);
showMillionBtn.addEventListener('click', showMillionaires);
sortBtn.addEventListener('click', sort);
calculateBtn.addEventListener('click', calculateWealth);