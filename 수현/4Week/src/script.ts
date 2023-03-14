/*
- Display UI with 2 select lists for countries and 2 inputs for amounts
- Fetch exchange rates from API (https://api.exchangerate-api.com)
- Display the values for both countries
- Update values on amount change
- Swap country rates

 */

const fromCurrencyList = document.getElementById(
  "currency-one"
)! as HTMLSelectElement;
const originalAmount = document.getElementById(
  "amount-one"
)! as HTMLInputElement;

const toCurrencyList = document.getElementById(
  "currency-two"
)! as HTMLSelectElement;
const convertedAmount = document.getElementById(
  "amount-two"
)! as HTMLInputElement;
const rate = document.getElementById("rate")!;
const swap = document.getElementById("swap")!;

const requestCurrencyAPI = async (
  fromCurrency: string,
  toCurrency: string
): Promise<[string, string]> => {
  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/22398a0e5b55547fdb4f7bf3/latest/${fromCurrency}`
    );
    if (!response.ok) {
      throw new Error("환율 정보를 로드하는데 실패하였습니다.");
    }

    const data = await response.json();
    const toCurrencyValue = data.conversion_rates[toCurrency];
    const exchangeInfo = `1 ${fromCurrency} = ${toCurrencyValue} ${toCurrency}`;
    const convertAmount = (+originalAmount.value * toCurrencyValue).toFixed(2);
    return [exchangeInfo, convertAmount];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const exchange = async () => {
  try {
    const [rateInfo, convertResult] = await requestCurrencyAPI(
      fromCurrencyList.value,
      toCurrencyList.value
    );
    convertedAmount.value = convertResult;
    rate.innerText = rateInfo;
  } catch (error) {
    console.error(error);
  }
};

const swapHandler = () => {
  [fromCurrencyList.value, toCurrencyList.value] = [
    toCurrencyList.value,
    fromCurrencyList.value,
  ];
  exchange();
};

fromCurrencyList.addEventListener("change", exchange);
originalAmount.addEventListener("change", exchange);
toCurrencyList.addEventListener("change", exchange);
convertedAmount.addEventListener("change", exchange);
swap.addEventListener("click", swapHandler);

exchange();
