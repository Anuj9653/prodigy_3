let currentPlayer = 'X';  // Player X starts
let gameBoard = ['', '', '', '', '', '', '', '', ''];  // Empty board
let gameOver = false;

const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetButton = document.getElementById('resetButton');

// Event listener for each cell
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        // Prevent clicks if game is over or cell is already filled
        if (gameOver || gameBoard[index] !== '') return;

        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer;  // Display mark
        checkWinner();  // Check if there's a winner
        if (!gameOver) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';  // Switch player
            status.textContent = `${currentPlayer}'s turn`;  // Update status
        }
    });
});

// Function to check for a winner or draw
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]  // Diagonals
    ];

    for (let [a, b, c] of winPatterns) {
        // If all three cells in a pattern are the same (and not empty), declare a winner
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            status.textContent = `${currentPlayer} wins!`;
            gameOver = true;
            setTimeout(resetGame, 2000);  // Restart the game after a short delay
            return;
        }
    }

    // Check if all cells are filled (draw condition)
    if (!gameBoard.includes('')) {  
        status.textContent = "It's a draw!";
        gameOver = true;
        setTimeout(resetGame, 2000);  // Restart the game after a short delay
    }
}

// Function to reset the game
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];  // Reset the board
    gameOver = false;  // Set gameOver flag to false
    currentPlayer = 'X';  // Set starting player to 'X'
    status.textContent = "Player X's turn";  // Reset status text
    cells.forEach(cell => cell.textContent = '');  // Clear the board visually
}

// Reset the game when the reset button is clicked
resetButton.addEventListener('click', resetGame);
