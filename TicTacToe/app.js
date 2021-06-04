const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
    // Horizontal Victory
    [0,1,2],
    [3,4,5],
    [6,7,8],
    
    // Vertical Victory
    [0,3,6],
    [1,4,7],
    [2,5,8],
    
    // Diagonal Victory
    [0,4,8],
    [2,4,6]
];

const cellElements = document.querySelectorAll('[data-cell]');
const endMsgTextElement = document.querySelector('[data-end-message-text]');
const board = document.getElementById('board');
const restartBtn = document.getElementById('restartButton');

let circleTurn;

function resetBoard() {
    cellElements.forEach((cell) => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
    });
    endMsgTextElement.textContent = "";
    endMsgTextElement.parentElement.classList.remove("show");
}

function startGame() {
    resetBoard();
    circleTurn = false;
    cellElements.forEach((cell) => {
        cell.addEventListener('click', handleClick, {once:true});
    });
    setBoardHoverClass();
}

function handleClick(e) {
    // place mark
    const cell = e.target;
    const currentClass = circleTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    

    // check for win
    let isDraw;
    if(checkWin(currentClass)) {
        isDraw = false;
        endGame(isDraw);
    }
    
    // check for draw
    else if(checkForDraw()) {
        isDraw = true;
        endGame(isDraw);
    }

    // switch turns
    swapTurns();
    setBoardHoverClass();
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if(circleTurn)
        board.classList.add(O_CLASS);
    else
        board.classList.add(X_CLASS);
}

function checkWin(currentClass) {
    // Look at every array within WINNING_COMBINATIONS
    // and check to see if the following is true for one
    // of those combinations
    return WINNING_COMBINATIONS.some((combination) => {
        
        // return true if the cell at every index specified
        // in this combination array has the currentClass
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

function checkForDraw() {
    // We're destructuring the HTML collection
    // into an array so we can use the every array function
    return [...cellElements].every((cell) => {

        // return true if every cell has an 'x' or 'o' class
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    })
}

function endGame(isDraw) {
    if(isDraw){
        endMsgTextElement.textContent = "Draw!";
    } else {
        endMsgTextElement.textContent = `${circleTurn ? "O" : "X"} Wins!`;
    }
    endMsgTextElement.parentElement.classList.add("show");
}

startGame();

restartBtn.addEventListener('click', startGame);