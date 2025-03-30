
const NUMBER_OF_CARD = 4;
const NUMBER_OF_OPERATION = 4;

const clearButton = document.getElementById('clear');
const checkButton = document.getElementById('check');
const body = document.body;

let cardsContent = [];
let cardsButton = [];
let operationsContent = [];
let operationsButton = [];
let slots = [];
let numbers = [];
let lastSlot = 0;

for (let i = 0; i < NUMBER_OF_CARD; i++) {
    cardsContent[i] = document.querySelector(`#card${i} h1`);
}
for (let i = 0; i < NUMBER_OF_CARD; i++) {
    cardsButton[i] = document.querySelector(`#card${i} button`);
}
for (let i = 0; i < NUMBER_OF_OPERATION; i++) {
    operationsContent[i] = document.querySelector(`#operation${i} h1`);
}
for (let i = 0; i < NUMBER_OF_OPERATION; i++) {
    operationsButton[i] = document.querySelector(`#operation${i} button`);
}
for (let i = 0; i < NUMBER_OF_CARD + NUMBER_OF_OPERATION - 1; i++) {
    slots[i] = document.getElementById(`slot${i}`);
}

dealCards();

function dealCards() {
    for (let i = 0; i < NUMBER_OF_CARD; i++) {
        numbers[i] = Math.floor(Math.random() * 10) + 1;
    }
    for (let i = 0; i < NUMBER_OF_CARD; i++) {
        cardsContent[i].textContent = `${numbers[i]}`;
    }
}

function clearSlots() {
    lastSlot = 0;
    for (let i = 0; i < 2 * NUMBER_OF_CARD - 1; i++) {
        slots[i].textContent = '';
    }
}

function checkAnswer() {
    if (lastSlot === NUMBER_OF_CARD + NUMBER_OF_OPERATION - 1) {
        let answer = '(';
        for (let i = 0; i < NUMBER_OF_CARD + NUMBER_OF_OPERATION - 1; i++) {
            if (i % 2 === 1) {
                answer = '(' + answer + slots[i].textContent
            } else {
                answer = answer + slots[i].textContent + ')';
            }
        }
        return eval(answer) === 24;
    }
    return false;
}

checkButton.addEventListener('click', () => {
    if (checkAnswer()) {
        body.style.backgroundColor = 'green';
        dealCards();
    } else {
        body.style.backgroundColor = 'red';
    }
    clearSlots();
})

clearButton.addEventListener('click', clearSlots);

for (let i = 0; i < NUMBER_OF_CARD; i++) {
    cardsButton[i].addEventListener('click', () => {
        if (lastSlot % 2 === 0 && lastSlot < NUMBER_OF_CARD + NUMBER_OF_OPERATION - 1) {
            slots[lastSlot].textContent = cardsContent[i].textContent;
            lastSlot++;
        }
    });
}

for (let i = 0; i < NUMBER_OF_OPERATION; i++) {
    operationsButton[i].addEventListener('click', () => {
        if (lastSlot % 2 === 1 && lastSlot < NUMBER_OF_CARD + NUMBER_OF_OPERATION - 1) {
            slots[lastSlot].textContent = operationsContent[i].textContent;
            lastSlot++;
        }
    });
}