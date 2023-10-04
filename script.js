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
        board.forEach((element, index) => {
            board[index] = '';
        })
    };

    return {getBoard, makeMove, resetBoard};
})();

const Player = (name, symbol) => {
    const getSymbol = () => symbol;
    const getName = () => name;

    return {getSymbol, getName};
};

