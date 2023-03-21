const main = document.getElementById('main') as HTMLDivElement;
const addButton = document.getElementById('add-user') as HTMLButtonElement;
const doubleButton = document.getElementById('double') as HTMLButtonElement;
const showMillionairesButton = document.getElementById('show-millionaires') as HTMLButtonElement;
const sortButton = document.getElementById('sort') as HTMLButtonElement;
const calculateWealthButton = document.getElementById('calculate-wealth') as HTMLButtonElement;

type userInfoObj = {
  name: string;
  money: number;
};
type statesType = userInfoObj[];

const states: statesType = [];

const useState = <T extends statesType>(status: T): [() => T, (state: T) => void] => {
  let initialState = status;

  const state = () => initialState as T;

  const setState = (newState: T) => {
    initialState = newState;
    render();
  };

  return [state, setState];
};

const [getUserInfo, setUserInfo] = useState(states);

const getUser = async (num: number): Promise<userInfoObj[]> => {
  let dataArr = [];

  for (let i = 0; i < num; i++) {
    const result = (await (await fetch('https://randomuser.me/api')).json())
      .results[0];

    const newUser = {
      name: `${result.name.first} ${result.name.last}`,
      money: Math.floor(Math.random() * 1000000),
    };

    dataArr.push(newUser);
  }

  return dataArr;
};

const render = (): void => {
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

  for (let i of getUserInfo()) {
    let state = i;

    let htmlString : string = '';
    const newElement = document.createElement('div') as HTMLDivElement;
    newElement.classList.add('person');
    htmlString += `<strong>${state.name}</strong> ${state.money}`;
    newElement.innerHTML = htmlString;
    main.appendChild(newElement);
  }
};

const init = async () => {
  const userData = await getUser(3);
  setUserInfo(userData);
};
init();



// events

const makeDouble = () : void => {
  const changeResult = getUserInfo().map((user) => {
    return { ...user, money: user.money * 2 };
  });

  setUserInfo(changeResult);
};

const sortByMoney = () : void=> {
  const copyState = [...getUserInfo()];
  copyState.sort((a, b) => b.money - a.money);

  setUserInfo(copyState);
};

const showRich = () : void => {
  const filterResult = getUserInfo().filter((user) => user.money > 1000000);

  setUserInfo(filterResult);
};

const calculateWealth = () : void => {
  const totalMoney = getUserInfo().reduce(
    (acc, user) => (acc += user.money), 0
     );

  const newElement = document.createElement('div');
  newElement.innerHTML = `<h3>Total Wealth: <strong>${totalMoney}</strong></h3>`;
  main.appendChild(newElement);
};

const addUser = async () : Promise<void> => {
  const newUserData = await getUser(1);
  const current = getUserInfo();
  const addResult = [...current, newUserData[0]];

  setUserInfo(addResult);
};

addButton.addEventListener('click', addUser);
doubleButton.addEventListener('click', makeDouble);
sortButton.addEventListener('click', sortByMoney);
showMillionairesButton.addEventListener('click', showRich);
calculateWealthButton.addEventListener('click', calculateWealth);