const main = document.getElementById('main') as HTMLElement;
const addUserBtn = document.getElementById('add-user') as HTMLButtonElement;
const doubleMoneyBtn = document.getElementById('double') as HTMLButtonElement;
const showOnlyMillionairesBtn = document.getElementById(
    'show-millionaires'
) as HTMLButtonElement;
const sortBtn = document.getElementById('sort') as HTMLButtonElement;
const calculateBtn = document.getElementById(
    'calculate-wealth'
) as HTMLButtonElement;

interface IuserProps {
    name: string;
    money: number;
}

let users: IuserProps[] = [];

const addUserAPI = async () => {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const initUser = {
        name: data.results[0].name.first + ' ' + data.results[0].name.last,
        money: Math.floor(Math.random() * 1000000),
    };

    users.push(initUser);
    updateUsers();
};

const doubleMoney = () => {
    users = users.map((user) => {
        return { ...user, money: user.money * 2 };
    });

    updateUsers();
};

const showOnlyMillionaires = () => {
    users = users.filter((user) => user.money > 1000000);
    updateUsers();
};

const sortByRichest = () => {
    users = users.sort((a, b) => {
        return b.money - a.money;
    });
    updateUsers();
};

const calculateWealth = () => {
    const result = users.reduce((acc, user) => acc + user.money, 0);

    const divElement = document.createElement('div');
    divElement.innerHTML = `<h3>Total Wealth: <strong>${formatDollar(
        result
    )}</strong></h3>`;

    main.appendChild(divElement);
};

const updateUsers = () => {
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'; // 이 코드가 왜 필요할까? 없으면 값이 이상하게 추가됨
    users.forEach((user) => {
        const divElement = document.createElement('div');
        divElement.classList.add('person');

        divElement.innerHTML = `<strong>${user.name}<strong> ${formatDollar(
            user.money
        )}`;
        main.appendChild(divElement);
    });
};

const formatDollar = (dollar: number) => {
    return '$' + dollar.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

addUserBtn.addEventListener('click', addUserAPI);
doubleMoneyBtn.addEventListener('click', doubleMoney);
showOnlyMillionairesBtn.addEventListener('click', showOnlyMillionaires);
sortBtn.addEventListener('click', sortByRichest);
calculateBtn.addEventListener('click', calculateWealth);
