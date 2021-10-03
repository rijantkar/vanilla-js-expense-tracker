const balance = document.querySelector('#balance');
const moneyMinus = document.querySelector('#money-minus');
const moneyPlus = document.querySelector('#money-plus');
const list = document.querySelector('.list');
const text = document.querySelector('#text');
const amount = document.querySelector('#amount');

const form = document.querySelector('#form');

// const dummyTransaction = [
//     {id: 1, text:  'Flower', amount: -20},
//     {id: 2, text:  'Salary', amount: 400},
//     {id: 3, text:  'Book', amount: -20},
//     {id: 4, text:  'Camera', amount: 50},
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') != null ? JSON.parse(localStorage.getItem('transactions')) : [];

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
};

// let transactions = dummyTransaction;

//Add transactions to dom list

const addTransactionToDOM = transaction => {
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    //Add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;
    list.appendChild(item);
    updateDetails();
    updateLocalStorage();
}

// Update the balance, income and expense

const updateDetails = () => {
    const amounts = transactions.map(transaction => transaction.amount);
    balance.innerText = '$' + amounts.reduce((a, b) => a + b, 0).toFixed(2);
    moneyMinus.innerText = '$' + Math.abs(amounts.filter(amount => amount < 0).reduce((a, b) => a + b, 0)).toFixed(2);
    moneyPlus.innerText = '$' + amounts.filter(amount => amount > 0).reduce((a, b) => a + b, 0).toFixed(2);
}

const init = () => {
    list.innerHTML = '';

    transactions.forEach(addTransactionToDOM)
}

init();

const removeTransaction = id => {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    init();
};

form.addEventListener('submit', event => {
    event.preventDefault();

    if (text.value.trim() !== '' || amount.value.trim() !== '') {
        const newTransaction = {
            id: Math.floor(Math.random() * 10000000),
            text: text.value,
            amount: +amount.value
        }
        transactions.push(newTransaction);
        addTransactionToDOM(newTransaction);
        updateDetails();
        text.value = '';
        amount.value = '';
    }
})