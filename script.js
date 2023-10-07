const cells = document.querySelectorAll('[data-cell]');
const outcomeMessage = document.querySelector('.outcome-message');
const clearButton = document.querySelector('#clear-btn');

const gameBoard = (() => {
    const board = ['', '', '', '', '', '', '', '', ''];
    const getBoard = () => board;

    const makeMove = (index, player) => {
        if (board[index] === '') {
            board[index] = player.getSymbol();
            return true;
        }
        return false;
    };

    const resetBoard = () => {
        board.forEach((index) => {
            board[index] = '';
        })
    };

    return { getBoard, makeMove, resetBoard };
})();

const Player = (name, symbol) => {
    const getSymbol = () => symbol;
    const getName = () => name;

    return { getName, getSymbol };
};

const displayController = (() => {
    let currentPlayer;
    let gameOver = false;

    let player1 = Player('Player1', 'X');
    let player2 = Player('Player2', 'O');

    // Switches players after each move
    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const checkWin = (board, player) => {
        const winCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8],   // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],                            // Columns
        [0, 4, 8], [2, 4, 6]                                        // Diagonals
        ];

        for (const combination of winCombinations) {
            const [a, b, c] = combination;

            if (board[a] === player.getSymbol() && board[b] === player.getSymbol() && board[c] === player.getSymbol()) {
                return true;
            }
        }
        return false;
    };

    const checkDraw = (board) => {
        const isDraw = board.every((cell) => cell !== '');
        const isWin = checkWin(board, currentPlayer);

        return isDraw && !isWin;
    };

    // Plays a turn and then switches player
    const playTurn = (index) => {
        if (!gameOver) {
            if (gameBoard.makeMove(index, currentPlayer)) {
                if (checkWin(gameBoard.getBoard(), currentPlayer)) {
                    gameOver = true;
                    outcomeMessage.style.display = 'flex';
                    displayOutcomeMessage(`${currentPlayer.getName()} Wins!`);
                } else if (checkDraw(gameBoard.getBoard())) {
                    gameOver = true;
                    outcomeMessage.style.display = 'flex';
                    displayOutcomeMessage(`It's a Draw!`);
                } else {
                    switchPlayer(); 
                }
            }
        }
    };

    const startGame = () => {
        currentPlayer = player1;
        gameOver = false;
        gameBoard.resetBoard();
    
        // Clear the board by removing child elements from each cell
        cells.forEach((cell) => {
            cell.textContent = '';
        });
    
        outcomeMessage.style.display = 'none';
    };

    const displayOutcomeMessage = (message) => {
        outcomeMessage.textContent = message;
    };

    cells.forEach((cell, index) => {
      cell.addEventListener('click', () => {
        if (!gameOver && cell.textContent === '') {
            const mark = document.createElement('div');
            mark.classList.add('mark');

            mark.textContent = currentPlayer.getSymbol();

            cell.appendChild(mark);
            playTurn(index);
        }
      });
    });    

    return { startGame, playTurn };
})();

outcomeMessage.addEventListener('click', () => {
    outcomeMessage.style.display = 'none';
    outcomeMessage.textContent = '';
})

clearButton.addEventListener('click', () => {
    displayController.startGame(); 
});

displayController.startGame();






