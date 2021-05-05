const currencyEl1 = document.querySelector('.currency-one');
const currencyEl2 = document.querySelector('.currency-two');
const amountEl1 = document.querySelector('.amount-one');
const amountEl2 = document.querySelector('.amount-two');
const rateEl = document.querySelector('.rate');
const swapBtn = document.querySelector('.btn');

const calculate = () => {
  const currency_one = currencyEl1.value;
  const currency_two = currencyEl2.value;
  fetch(
    `https://v6.exchangerate-api.com/v6/a28a6b2b9c2c4a1dd9324e78/latest/${currency_one}`
  )
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const rate = data['conversion_rates'][currency_two];
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
      amountEl2.value = (amountEl1.value * rate).toFixed(2);
    });
};

const swap = () => {
  const temp = currencyEl1.value;
  currencyEl1.value = currencyEl2.value;
  currencyEl2.value = temp;
  calculate();
};

currencyEl1.addEventListener('change', calculate);
currencyEl2.addEventListener('change', calculate);
amountEl1.addEventListener('input', calculate);
amountEl2.addEventListener('input', calculate);
swapBtn.addEventListener('click', swap);
calculate();
