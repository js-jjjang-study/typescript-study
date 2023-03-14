const firstCurrency = document.getElementById('currency-one') as HTMLSelectElement;
const secondCurrency = document.getElementById('currency-two') as HTMLSelectElement;
const firstMoneyInput = document.getElementById('amount-one') as HTMLInputElement;
const secondMoneyInput = document.getElementById('amount-two') as HTMLInputElement;

type currencyType = {
  [key: string]: number;
};

const rateDisplay = document.getElementById('rate') as HTMLDivElement;
const swapButton = document.getElementById('swap') as HTMLButtonElement;

const getRate = async (): Promise<number> => {
  const result:currencyType = await fetch('https://open.exchangerate-api.com/v6/latest')
    .then((res) => res.json())
    .then((res) => res.rates);

  const currencyRate: number = result[secondCurrency.value] / result[firstCurrency.value];
  return currencyRate;
};

const changeRateDisplay = (rate: number) => {
  rateDisplay.innerText = `1 ${firstCurrency.value} = ${rate.toFixed(5)} ${secondCurrency.value}`;
};

const changeInputValue = (rate: number) => {
  secondMoneyInput.value = (Number(firstMoneyInput.value) * rate).toFixed(2);
};

const activate = async () => {
  const rate: number = await getRate();
  changeRateDisplay(rate);
  changeInputValue(rate);
};

const swap = () => {
  [firstCurrency.value, secondCurrency.value] = [secondCurrency.value,firstCurrency.value];
  activate();
};

firstCurrency.addEventListener('change', activate);
firstMoneyInput.addEventListener('input', activate);
secondCurrency.addEventListener('change', activate);
secondMoneyInput.addEventListener('input', activate);
swapButton.addEventListener('click', swap);
activate();
