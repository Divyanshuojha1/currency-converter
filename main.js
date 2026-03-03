const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");
const swapBtn = document.querySelector(".swap");

const currencyList = [
    "USD", "INR", "EUR", "GBP", "AUD", "CAD", "JPY", "CNY", "AED", "SGD", "NZD",
    "CHF", "HKD", "KRW", "THB", "MYR", "IDR", "PHP", "PKR", "LKR", "BDT", "NPR"
];


// Populate dropdown
currencyList.forEach(code => {
    fromCurr.add(new Option(code, code));
    toCurr.add(new Option(code, code));
});

fromCurr.value = "USD";
toCurr.value = "INR";


// Flag update
function updateFlag(selectElement) {
    let code = selectElement.value.substring(0, 2);
    let img = selectElement.parentElement.querySelector("img");
    img.src = `https://flagsapi.com/${code}/flat/64.png`;
}

updateFlag(fromCurr);
updateFlag(toCurr);

fromCurr.addEventListener("change", () => updateFlag(fromCurr));
toCurr.addEventListener("change", () => updateFlag(toCurr));


// Fetch exchange rate
btn.addEventListener("click", async (e) => {
    e.preventDefault();

    let amount = document.querySelector(".amount input").value;
    if (amount <= 0) amount = 1;

    msg.innerText = "Fetching...";

    try {
        const response = await fetch(`https://open.er-api.com/v6/latest/${fromCurr.value}`);
        const data = await response.json();

        const rate = data.rates[toCurr.value];
        const finalAmount = (amount * rate).toFixed(2);

        msg.innerText = `${amount} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

    } catch (error) {
        msg.innerText = "API Error";
        console.error(error);
    }
});


// Swap
swapBtn.addEventListener("click", () => {
    let temp = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = temp;

    updateFlag(fromCurr);
    updateFlag(toCurr);
});