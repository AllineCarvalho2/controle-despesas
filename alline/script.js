onst transactionUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')
//console.log({inputTransactionName, inputTransactionAmount});


// let transactions = [
//     { id: 1, name: "Bolo de brigadeiro", amount: -20 },
//     { id: 2, name: "Salário", amount: 300 },
//     { id: 3, name: "Torta de frango", amount: -10 },
//     { id: 4, name: "Violão", amount: 150 },
// ];
const localStorageTransactions = JSON.parse(localStorage
    .getItem('transactions'))

let transactions = localStorage
    .getItem('transactions') !== null ? localStorageTransactions : []

const removeTransaction = ID => {
    transactions = transactions.filter(transaction => transaction.id !== ID)
    // console.log(transactions);
    upDateBalanceValues()
    init()

}

const dummyTransactions = [
    { id: 1, name: "Bolo de brigadeiro", amount: -20 },
    { id: 2, name: "Salário", amount: 300 },
    { id: 3, name: "Torta de frango", amount: -10 },
    { id: 4, name: "Violão", amount: -150 },

]

function addTransactionIntoDOM (transaction) {
    const operator = transaction.amount < 0 ? "-" : "+";
    const CSSClass = transaction.amount < 0 ? "minus" : "plus";
    const amountWithoutOperator = Math.abs(transaction.amount);
    const li = document.createElement("li");

    li.classList.add(CSSClass)
    li.innerHTML = `
        ${transaction.name}
        <span> ${operator} R$ ${amountWithoutOperator}</span>
        <button class="delete-btn" onclick = "removeTransaction(${transaction.id})">
            x
        </button>
  `
    transactionUl.append(li)
    //transactionUl.prepend(li);
    // console.log(li);
    //console.log(operator);
    {
        // <li class="minus">
        //     Salário <span>-$400</span><button class="delete-btn">x</button>
        // </li>
    }
}

// addTransactionIntoDOM(transactions[0]);
// addTransactionIntoDOM(transactions[1]);

const getExpenses = transactionsAmounts => Math.abs(transactionsAmounts
    .filter(value => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0))
    .toFixed(2);

const upDateBalanceValues = () => {
    const transactionsAmounts = transactions.map(transaction => transaction.amount
    );
    // console.log(transactionsAmounts)
    const total = transactionsAmounts.reduce((accumulator, transaction) => accumulator + transaction, 0).toFixed(2)
    const income = transactionsAmounts
        .filter((value) => value > 0)
        .reduce((accumulator, value) => accumulator + value, 0)
        .toFixed(2);
    const expense = getExpenses(transactionsAmounts) 
    //console.log(expense)
    balanceDisplay.textContent = R$ ${total};
    incomeDisplay.textContent = R$ ${income};
    expenseDisplay.textContent = R$ ${expense};
};

const init = () => {
    transactionUl.innerHTML = ''
    transactions.forEach(addTransactionIntoDOM);
    upDateBalanceValues();
};

init()

const upDateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}



const generateID = () => Math.round(Math.random() * 1000)

const addToTransactionsArray = (transName, transAmount) => {
    transactions.push(transaction = {
        id: generateID(),
        name: transName,
        amount: Number(transAmount)
    })
}

const cleanInputs = () => {
    inputTransactionAmount.value = ''
    inputTransactionName.value = ''
}
const handleFormSubmit = event => {
    event.preventDefault()
    const transName = inputTransactionName.value.trim()
    const transAmount = inputTransactionAmount.value.trim()
    const isSomeInputEmpaty = transName === '' || transAmount === ''

    if (isSomeInputEmpaty) {
        alert('Por gentileza preencha tanto o nome quanto o valor da transação!!!')
        return
    }
    addToTransactionsArray(transName, transAmount)

    init()

    upDateLocalStorage()

    cleanInputs();

}

form.addEventListener('submit', handleFormSubmit)
