let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
    ]

let player1Place = null
let player2Place = null

let player1Name = ""
let player2Name = ""

let gameStatus = null

let currentPlayerPlace = null
let currentPlayer = null

//Function startGame is called when the game start
function startGame(){
    var boutonx = document.createElement("button");

    boutonx.innerHTML = "Select X";
    boutonx.id = "selectXBTN";

    var boutono = document.createElement("button");
    boutono.innerHTML = "Select O";
    boutono.id = "selectOBTN";

    var textName = document.createElement("input");

    textName.innerHTML = "Name";
    textName.name = "nom"
    textName.type = "Name"
    textName.placeholder = "Player 1 name"
    textName.id = "playerName";

    document.getElementById("boutonContainer").appendChild(boutonx);
    document.getElementById("boutonContainer").appendChild(boutono);
    document.getElementById("boutonContainer").appendChild(textName);

    //This part is for check if player 1 or player 2 press "X" select button and give "X" to the player who choose
    boutono.addEventListener("click", function() {
        if(player1Place == null){
        player1Name = document.querySelector('input[name="nom"]').value;

            if(player1Name != ""){

                boutono.remove()
                player1Place = 'O'
                document.querySelector('input[name="nom"]').value = ""
                textName.placeholder = "Player 2 name"

                currentPlayerPlace = player1Place
                currentPlayer = player1Name
            }
            else{
                    document.querySelector('input[name="nom"]').value = ""
                    textName.placeholder = "Put name before select"
            }
        }
        else{
            player2Name = document.querySelector('input[name="nom"]').value;
        
            if(player2Name != ""){
                if(player2Name != player1Name){
                    boutono.remove()
                    textName.remove()

                    player2Place = 'O'

                    displayBoard();
                    console.log("Player 1: " + player1Name + " play with: " + player1Place + " |  Player 2: " + player2Name + " play with: " + player2Place)
                    document.getElementById("playerPlay").innerHTML = "Player: " + currentPlayer + " Turn to place: (" + currentPlayerPlace + ")" 
                }
                else{
                    document.querySelector('input[name="nom"]').value = ""
                    textName.placeholder = "This name is already use"
                }
            }
            else{
                    document.querySelector('input[name="nom"]').value = ""
                    textName.placeholder = "Put name before select"
            }
        }
    });

    //This part is for check if player 1 or player 2 press "O" select button and give "O" to the player who choose
    boutonx.addEventListener("click", function() {
        if(player1Place == null){
            player1Name = document.querySelector('input[name="nom"]').value;
        
            if(player1Name != ""){

                boutonx.remove()
                player1Place = 'X'
                document.querySelector('input[name="nom"]').value = ""
                textName.placeholder = "Player 2 name"

                currentPlayerPlace = player1Place
                currentPlayer = player1Name
            }
            else{
                    document.querySelector('input[name="nom"]').value = ""
                    textName.placeholder = "Put name before select"
            }
        }
        else{
            player2Name = document.querySelector('input[name="nom"]').value;
        
            if(player2Name != ""){
                if(player2Name != player1Name){
                    boutonx.remove()
                    textName.remove()

                    player2Place = 'X'

                    displayBoard();
                    console.log("Player 1: " + player1Name + " play with: " + player1Place + " |  Player 2: " + player2Name + " play with: " + player2Place)
                    document.getElementById("playerPlay").innerHTML = "Player: " + currentPlayer + " Turn to place: (" + currentPlayerPlace + ")" 
                }
                else{
                    document.querySelector('input[name="nom"]').value = ""
                    textName.placeholder = "This name is already use"
                }
            }
            else{
                    document.querySelector('input[name="nom"]').value = ""
                    textName.placeholder = "Put name before select"
            }
        }
    });
}

function makeMoove(row, col){
    if(board[row][col] === '' && gameStatus == null){

        board[row][col] = currentPlayerPlace;

        displayBoard();

        if(checkWin(currentPlayerPlace)){
            gameStatus = "Win"
            setTimeout(clearBoard, 100);
            return;
        }

        if(checkDraw()){
            alert("Game Draw !")
            resetGame()
            return;
        }

        currentPlayerPlace = (currentPlayerPlace === player1Place) ? player2Place : player1Place;
        currentPlayer = (currentPlayer === player1Name) ? player2Name : player1Name;

        document.getElementById("playerPlay").innerHTML = "Player: " + currentPlayer + " Turn to place: (" + currentPlayerPlace + ")" 
    }
}

function checkWin(player){
    let win = false;

    // Check rows
    for(let row = 0; row < 3; row++){
        if(board[row][0] === player && board[row][1] === player && board[row][2] === player){
            win = true;
            for(let col = 0; col < 3; col++){
                document.querySelector(`#board > div:nth-child(${row * 3 + col + 1})`).classList.add('win-cell');
            }
        }
    }

    // Check columns
    for(let col = 0; col < 3; col++){
        if(board[0][col] === player && board[1][col] === player && board[2][col] === player){
            win = true;
            for(let row = 0; row < 3; row++){
                document.querySelector(`#board > div:nth-child(${row * 3 + col + 1})`).classList.add('win-cell');
            }
        }
    }

    // Check diagonals
    if(board[0][0] === player && board[1][1] === player && board[2][2] === player){
        win = true;
        for(let i = 0; i < 3; i++){
            document.querySelector(`#board > div:nth-child(${i * 3 + i + 1})`).classList.add('win-cell');
        }
    }
    if(board[0][2] === player && board[1][1] === player && board[2][0] === player){
        win = true;
        for(let i = 0; i < 3; i++){
            document.querySelector(`#board > div:nth-child(${(2 - i) * 3 + i + 1})`).classList.add('win-cell');
        }
    }

    return win;
}

function checkDraw(){
    for(let row = 0; row < 3; row++){
        for(let col = 0; col <3; col++){
            if(board[row][col] === ''){
                return false;
            }
        }
    }
    return true;
}

function displayBoard(){
    const boardContainer = document.querySelector("#board")
    boardContainer.innerHTML = '';

    for(let row = 0; row < 3; row++){
        for(let col = 0; col < 3; col++){
            const cell = document.createElement('div');
            cell.classList = "cell";
            cell.textContent = board[row][col];


            cell.addEventListener("click", function(){
                makeMoove(row, col);
            });

            boardContainer.appendChild(cell)
        }
    }
}

function clearBoard(){
    if(gameStatus == "Win"){

        var gameWin = document.createElement("h2");
        gameWin.id = "win";

        var gameLoose = document.createElement("h3");
        gameLoose.id = "loose";

        var restart = document.createElement("button");
        restart.id = "restart";
        restart.innerHTML = "Restart game"

        if (currentPlayer == player1Name){
            gameWin.innerHTML = "And the winner is: " + player1Name + "!";
            gameLoose.innerHTML = "And " + player2Name + " are the looser :c";
        }

        if(currentPlayer == player2Name){
            gameWin.innerHTML = "And the winner is: " + player2Name + "!";
            gameLoose.innerHTML = "And " + player1Name + " are the looser :c";
        }  

        document.getElementById("boutonContainer").appendChild(gameWin);
        document.getElementById("boutonContainer").appendChild(gameLoose);
        document.getElementById("boutonContainer").appendChild(restart);

        restart.addEventListener("click", function(){
            document.getElementById("boutonContainer").innerHTML = ""
            resetGame()
        });
    }

    document.getElementById("playerPlay").innerHTML = ""
}

function resetGame(){
    board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
    ]

    gameStatus = null

    document.getElementById("playerPlay").innerHTML = "Player: " + currentPlayer + " Turn to place: (" + currentPlayerPlace + ")" 
    displayBoard()
}

//Function showReaction is for make box have some color when you win, loose, or when you interact with one already check
// function showReaction(){
//     if (board.contains(currentPlayer)){
//         elements = document.getElementsByClassName(currentPlayer);
//         for (var i = 0; i < elements.length; i++) {
//             elements[i].style.backgroundColor="green";
//         }
//     }
// }

startGame();