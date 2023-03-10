let firstCurrency = document.getElementById('currency-one') as HTMLSelectElement;
let secondCurrency = document.getElementById('currency-two') as HTMLSelectElement;
const firstAmount = document.getElementById('amount-one') as HTMLInputElement;
const secondAmount = document.getElementById('amount-two') as HTMLInputElement;
calculate();

function calculate() {
  firstCurrency = document.getElementById('currency-one') as HTMLSelectElement;
  secondCurrency = document.getElementById('currency-two') as HTMLSelectElement;

  fetch(`https://v6.exchangerate-api.com/v6/1b30312d752f5f44f3e59655/latest/${firstCurrency.value}`)
    .then((response) => { return response.json() })
    .then((response) => {
      secondAmount.value = `${response.conversion_rates[`${secondCurrency.value}`].toFixed(2)}`;
    });
}