/*
- Fetch random users from the [randomuser.me](https://randomuser.me) API
- Use forEach() to loop and output user/wealth
- Use map() to double wealth
- Use filter() to filter only millionaires
- Use sort() to sort by wealth
- Use reduce() to add all wealth
*/

const addBtn = document.getElementById("add-user") as HTMLElement;
const doubleBtn = document.getElementById("double") as HTMLElement;
const filterBtn = document.getElementById("show-millionaires") as HTMLElement;
const sortBtn = document.getElementById("sort") as HTMLElement;
const calculateBtn = document.getElementById("calculate-wealth") as HTMLElement;
const main = document.querySelector("main") as HTMLElement;

interface User {
  name: string;
  wealth: number;
}

const addUser = async () => {
  await fetch("https://randomuser.me/api")
    .then((res) => res.json())
    .then((data) => {
      const newUser = {
        name: data.results[0].name.first + " " + data.results[0].name.last,
        wealth: Math.floor(Math.random() * 1000000),
      };
      user.push(newUser);
    });
  updateInfo();
};

const doubleMoney = () => {
  user = user.map((data: User) => {
    return { ...data, wealth: data.wealth * 2 };
  });
  updateInfo();
};

const filterMillionaires = () => {
  if (user.length === 0) return;
  user = user.filter((data) => data.wealth > 1000000);

  updateInfo();
};

const sortUser = () => {
  user = user.sort((a, b) => {
    return b.wealth - a.wealth;
  });

  updateInfo();
};

const updateInfo = () => {
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";
  user.forEach((data) => {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `<strong>${data.name}<strong> $${formDollar(
      data.wealth
    )}.00`;
    main.appendChild(newDiv);
  });
};

const calculateTotal = () => {
  const total = user.reduce((pre, cur) => pre + cur.wealth, 0);
  const newDiv = document.createElement("div");
  newDiv.innerHTML = `<hr><strong>Total<strong> $${formDollar(total)}.00`;
  main.appendChild(newDiv);
};

const formDollar = (dollar: number) => {
  return dollar.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

let user: User[] = [];
console.log(user);

addBtn.addEventListener("click", addUser);
doubleBtn.addEventListener("click", doubleMoney);
filterBtn.addEventListener("click", filterMillionaires);
sortBtn.addEventListener("click", sortUser);
calculateBtn.addEventListener("click", calculateTotal);
