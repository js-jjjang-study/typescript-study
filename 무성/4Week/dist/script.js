"use strict";
const firstSelectCurrency = document.getElementById('currency-one');
const SecondSelectCurrency = document.getElementById('currency-two');
const firstAmountNumber = document.getElementById('amount-one');
const secondAmountNumber = document.getElementById('amount-two');
const swapBtn = document.getElementById('swap');
const rateStatus = document.getElementById('rate');
const currencyCaculateAPI = () => {
    fetch('https://open.exchangerate-api.com/v6/latest')
        .then((res) => res.json())
        .then((data) => {
        const rate = (data.rates[SecondSelectCurrency.value] /
            data.rates[firstSelectCurrency.value]).toFixed(2);
        secondAmountNumber.value = (Number(firstAmountNumber.value) * Number(rate)).toFixed(2);
        rateStatus.innerHTML = `${firstAmountNumber.value} ${firstSelectCurrency.value} = ${secondAmountNumber.value} ${SecondSelectCurrency.value}`;
    });
};
const swapCurrency = () => {
    [firstSelectCurrency.value, SecondSelectCurrency.value] = [
        SecondSelectCurrency.value,
        firstSelectCurrency.value,
    ];
    currencyCaculateAPI();
};
currencyCaculateAPI();
firstSelectCurrency.addEventListener('change', currencyCaculateAPI);
SecondSelectCurrency.addEventListener('change', currencyCaculateAPI);
firstAmountNumber.addEventListener('change', currencyCaculateAPI);
secondAmountNumber.addEventListener('change', currencyCaculateAPI);
swapBtn.addEventListener('click', swapCurrency);
