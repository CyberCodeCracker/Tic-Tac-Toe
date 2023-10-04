const gameBoard = (() => {
    const board = ['', '', '', '', '', '', '', '', ''];
    const getBoard = () => board;

    const makeMove = (index, player) => {
        if(board[index] === '') {
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

    return { getSymbol, getName };
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
                                 [0, 3, 6], [1, 4, 7], [2, 5, 8],   // Columns
                                 [0, 4, 8], [2, 4, 6]               // Diagonals
    ];

    for (combiantion in winCombinations) {
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

    const playTurn = (index) => {
        if (!gameOver) {
            if (gameBoard.makeMove(index, currentPlayer)) {
                if (checkWin(gameBoard(), currentPlayer)) {
                    gameOver = true;
                } else if (checkDraw(gameBoard.getBoard())) {
                    gameOver = true;
                }
            } else {
                switchPlayer();
            }
        }
    };

    const startGame = () => {
        currentPlayer = player1;
        gameOver = false;
        gameBoard.resetBoard();
    };

    return { startGame, playTurn };
})(); 