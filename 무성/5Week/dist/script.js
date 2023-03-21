"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleMoneyBtn = document.getElementById('double');
const showOnlyMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateBtn = document.getElementById('calculate-wealth');
let users = [];
const addUserAPI = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch('https://randomuser.me/api');
    const data = yield res.json();
    const initUser = {
        name: data.results[0].name.first + ' ' + data.results[0].name.last,
        money: Math.floor(Math.random() * 1000000),
    };
    users.push(initUser);
    updateUsers();
});
const doubleMoney = () => {
    users = users.map((user) => {
        return Object.assign(Object.assign({}, user), { money: user.money * 2 });
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
    divElement.innerHTML = `<h3>Total Wealth: <strong>${formatDollar(result)}</strong></h3>`;
    main.appendChild(divElement);
};
const updateUsers = () => {
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'; // 이 코드가 왜 필요할까? 없으면 값이 이상하게 추가됨
    users.forEach((user) => {
        const divElement = document.createElement('div');
        divElement.classList.add('person');
        divElement.innerHTML = `<strong>${user.name}<strong> ${formatDollar(user.money)}`;
        main.appendChild(divElement);
    });
};
const formatDollar = (dollar) => {
    return '$' + dollar.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};
addUserBtn.addEventListener('click', addUserAPI);
doubleMoneyBtn.addEventListener('click', doubleMoney);
showOnlyMillionairesBtn.addEventListener('click', showOnlyMillionaires);
sortBtn.addEventListener('click', sortByRichest);
calculateBtn.addEventListener('click', calculateWealth);
