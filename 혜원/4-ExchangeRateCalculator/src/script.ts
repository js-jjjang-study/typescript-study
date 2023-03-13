let firstCurrency = document.getElementById('currency-one') as HTMLSelectElement;
let secondCurrency = document.getElementById('currency-two') as HTMLSelectElement;
const firstAmount = document.getElementById('amount-one') as HTMLInputElement;
const secondAmount = document.getElementById('amount-two') as HTMLInputElement;
const swapBtn = document.getElementById('swap') as HTMLButtonElement;
const rateStr = document.getElementById('rate') as HTMLDivElement;
let newCurrency = 0;
let newValue = 0;

calculate();

function calculate() {
  firstCurrency = document.getElementById('currency-one') as HTMLSelectElement;
  secondCurrency = document.getElementById('currency-two') as HTMLSelectElement;

  fetch(`https://v6.exchangerate-api.com/v6/1b30312d752f5f44f3e59655/latest/${firstCurrency.value}`)
    .then((response) => { return response.json() })
    .then((response) => {
      newCurrency = response.conversion_rates[`${secondCurrency.value}`].toFixed(2)
      newValue = newCurrency * Number(firstAmount.value);
      secondAmount.value = `${newValue}`;
      changeRate();
    });
}

function changeRate() {
  rateStr.innerHTML = `1 ${firstCurrency.value} = ${newCurrency} ${secondCurrency.value}`;
}

function swapCurrency() {
  [firstCurrency.value, secondCurrency.value] = [secondCurrency.value, firstCurrency.value];
  calculate();
}

firstCurrency.addEventListener('change', calculate);
secondCurrency.addEventListener('change', calculate);
firstAmount.addEventListener('change', calculate);
swapBtn.addEventListener('click', swapCurrency);