const SIZE = 9;
const EMPTY = 0;

let board = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

document.addEventListener("DOMContentLoaded", createBoard);

function createBoard() {
    let table = document.getElementById("sudoku-board");
    table.innerHTML = "";

    for (let i = 0; i < SIZE; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < SIZE; j++) {
            let cell = document.createElement("td");
            let input = document.createElement("input");
            input.type = "text";
            input.maxLength = "1";
            input.dataset.row = i;
            input.dataset.col = j;

            if (board[i][j] !== EMPTY) {
                input.value = board[i][j];
                input.readOnly = true;
            } else {
                input.addEventListener("input", validateInput);
            }

            cell.appendChild(input);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}

function validateInput(event) {
    let value = event.target.value;
    if (!/^[1-9]$/.test(value)) {
        event.target.value = "";
    }
}

function checkSolution() {
    let isCorrect = true;

    document.querySelectorAll("input").forEach(input => {
        let row = parseInt(input.dataset.row);
        let col = parseInt(input.dataset.col);
        let value = input.value ? parseInt(input.value) : EMPTY;

        if (board[row][col] === EMPTY && value === EMPTY) {
            isCorrect = false;
        }
    });

    let message = document.getElementById("message");
    message.textContent = isCorrect ? "✅ Sudoku solved correctly!" : "❌ Incorrect solution. Try again!";
    message.style.color = isCorrect ? "green" : "red";
}

function solveSudoku() {
    if (solveBoard(board)) {
        createBoard();
        alert("Sudoku solved!");
    } else {
        alert("No solution exists.");
    }
}

function resetBoard() {
    location.reload();
}

function solveBoard(board) {
    for (let row = 0; row < SIZE; row++) {
        for (let col = 0; col < SIZE; col++) {
            if (board[row][col] === EMPTY) {
                for (let num = 1; num <= SIZE; num++) {
                    if (isValidMove(row, col, num)) {
                        board[row][col] = num;
                        if (solveBoard(board)) return true;
                        board[row][col] = EMPTY;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function isValidMove(row, col, num) {
    return isRowValid(row, num) && isColumnValid(col, num) && isBoxValid(row, col, num);
}

function isRowValid(row, num) {
    return !board[row].includes(num);
}

function isColumnValid(col, num) {
    return !board.map(row => row[col]).includes(num);
}

function isBoxValid(row, col, num) {
    let startRow = row - (row % 3);
    let startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] === num) return false;
        }
    }
    return true;
}
