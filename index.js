// DOM elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numberEl = document.getElementById('number');
const symbolEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');


const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNum,
    symbol: getRandomSymbol
};

// Generate random password
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numberEl.checked;
    const hasSymbol = symbolEl.checked;

    resultEl.innerHTML = generatePassword(
        hasLower, 
        hasUpper, 
        hasNumber, 
        hasSymbol,  
        length
    );    
});

// Copy password to clipboard
clipboardEl.addEventListener('click', () => {
    const el = document.createElement('textarea');
    el.value = resultEl.textContent;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
});

function generatePassword(lower, upper, number, symbol, length) {

    let generatedPassword = '';

    const typesCount = lower + upper + number + symbol;

    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);

    
    console.log(typesArr);

    if (typesCount === 0) {
        return '';
    }

    for (let i = 0; i < length; i+= typesCount) {
        // console.log(i);
        typesArr.forEach(type => {
            console.log(type);
            const funcName = Object.keys(type)[0];
            console.log(funcName)
            generatedPassword += randomFunc[funcName]();
        });
    }

    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;

}

// Generator functions

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
} 

function getRandomNum() {
    return Math.floor(Math.random() * 10);
}
function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}
