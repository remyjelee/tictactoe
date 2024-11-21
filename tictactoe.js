const startTictactoe = function() {    
    const Gameboard = (function() {
        let gameboard = []; // three by three array
        // 0 1 2 
        // 3 4 5
        // 6 7 8
           
        const didPlayerWin = () => {
            // Checks horizontal lines for win condition
            for (let i = 0; i < 3; i++) {
                let j = i * 3
                const horizontalWin = (gameboard[j] === gameboard[j + 1]) 
                && (gameboard[j]=== gameboard[j + 2]) && (gameboard[j] !== undefined);
                if (horizontalWin) {
                    return {
                        playerWon: true
                    }
                }
            }
    
            // Checks vertical lines for win condition
            for (let i = 0; i < 3; i++) {
                const verticalWin = (gameboard[i] === gameboard[i + 3])
                && (gameboard[i] === gameboard[i + 6]) && (gameboard[i] !== undefined);
                if (verticalWin) {
                    return {
                        playerWon: true
                    }
                }
            }
            // Checks diagonal lines for win condition
            const diagonal1 = (gameboard[0] === gameboard[4]) && (gameboard[0] === gameboard[8])
            const diagonal2 = (gameboard[2] === gameboard[4]) && (gameboard[2] === gameboard[6])
            if ((diagonal1 || diagonal2) && (gameboard[4] !== undefined)) {
                return {
                    playerWon: true
                }
            }
            console.log('player did not win', gameboard)
            return {
                playerWon: false
            }
        }
    
        const addChoiceToBoard = (playerSymbol, boardIndex) => { // attach an index to each html grid
            gameboard[boardIndex] = playerSymbol;
            return didPlayerWin();
        }
    
        const positionAvailability = (index) => {
            if (gameboard[index] !== undefined) { // should be undefined
                console.log('Already taken');
                return false;
            } else {
                return true;
            }
        }
        
        const displayOnTerminal = () => {
            let display = '';
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    display += `${gameboard[j + (i * 3)] || '-'} `;
                }
                display += `\n`;
            }
            return display;
        }

        const checkBoundaries = (index) => {
            if (index < 0 || index > 8) {
                console.log("Out of boundaries")
                return false;
            } else {
                return true;
            }
        }

        let legalMovesMade = 0;
        const incrementMoves = () => legalMovesMade++;
        const gameTied = () => {
            if (legalMovesMade === 9) {
                console.log('Tied!');
                return true;
            }
            return false;
        }

        return {
            addChoiceToBoard,
            didPlayerWin,
            positionAvailability,
            displayOnTerminal,
            checkBoundaries,
            incrementMoves,
            gameTied,
        }
    })()


    function createPlayer(symbol) {
        function makeMove() {
            let choiceIndex;
            do {
                choiceIndex = prompt(`What's your move? ${symbol}\n${Gameboard.displayOnTerminal()}`)
                if (choiceIndex.toLowerCase() === 'q') {
                    console.log("Game Quit")
                    return;
                } 
            } while (!Gameboard.positionAvailability(choiceIndex)
            || !Gameboard.checkBoundaries(choiceIndex))
            
            Gameboard.incrementMoves();
            return Gameboard.addChoiceToBoard(symbol, choiceIndex)
        }

        return {
            makeMove,
            symbol
        }
    }
    

    const player1 = createPlayer('O');
    const player2 = createPlayer('X');

    while (!Gameboard.gameTied()) {
        if (player1.makeMove().playerWon === true) {
            console.log(`Player ${[player1.symbol]} won!\n${Gameboard.displayOnTerminal()}`)
            return;
        }

        if (Gameboard.gameTied()) {
            return;
        }

        if (player2.makeMove().playerWon === true) {
            console.log(`Player ${player2.symbol} won!\n${Gameboard.displayOnTerminal()}`)
            return;
        }
    }
}

startTictactoe();
// add Names
// add Start/restart. (restart is essentially start.)
// add results at end.

//     const Gameboard = (function() {  State logic  })();
// const DisplayController = (function() {  DOM rendering  })();
// const GameController = (function() {  Game flow  })();
