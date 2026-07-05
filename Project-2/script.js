const cells = document.querySelectorAll(".cell");
const turnText = document.getElementById("turn");
const resultText = document.getElementById("resultText");

const restartBtn = document.getElementById("restartBtn");
const newGameBtn = document.getElementById("newGameBtn");

const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const drawScore = document.getElementById("drawScore");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

let xWins = 0;
let oWins = 0;
let draws = 0;

const winningConditions = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

cells.forEach(cell => {
    cell.addEventListener("click", playerMove);
});

restartBtn.addEventListener("click", restartGame);
newGameBtn.addEventListener("click", newMatch);

function playerMove(){

    const index = this.dataset.index;

    if(board[index] !== "" || !gameActive || currentPlayer !== "X"){
        return;
    }

    makeMove(index,"X");

    if(gameActive){
        currentPlayer="O";
        turnText.textContent="Computer's Turn";

        setTimeout(computerMove,500);
    }
}

function computerMove(){

    if(!gameActive) return;

    let move = findWinningMove("O");

    if(move === -1){
        move = findWinningMove("X");
    }

    if(move === -1){

        if(board[4] === ""){
            move = 4;
        }
    }

    if(move === -1){

        const empty = [];

        board.forEach((value,index)=>{
            if(value===""){
                empty.push(index);
            }
        });

        move = empty[Math.floor(Math.random()*empty.length)];
    }

    makeMove(move,"O");

    if(gameActive){
        currentPlayer="X";
        turnText.textContent="Your Turn";
    }
}

function makeMove(index,player){

    board[index]=player;

    cells[index].textContent=player;
    cells[index].disabled=true;

    checkWinner(player);
}

function findWinningMove(player){

    for(let condition of winningConditions){

        const [a,b,c]=condition;

        const values=[board[a],board[b],board[c]];

        const playerCount=values.filter(v=>v===player).length;
        const emptyCount=values.filter(v=>v==="").length;

        if(playerCount===2 && emptyCount===1){

            if(board[a]==="") return a;
            if(board[b]==="") return b;
            if(board[c]==="") return c;

        }

    }

    return -1;
}

function checkWinner(player){

    for(let condition of winningConditions){

        const[a,b,c]=condition;

        if(
            board[a]===player &&
            board[b]===player &&
            board[c]===player
        ){

            cells[a].classList.add("win");
            cells[b].classList.add("win");
            cells[c].classList.add("win");

            gameActive=false;

            if(player==="X"){
                resultText.textContent="🎉 You Win!";
                xWins++;
                scoreX.textContent=xWins;
            }else{
                resultText.textContent="🤖 Computer Wins!";
                oWins++;
                scoreO.textContent=oWins;
            }

            turnText.textContent="Game Over";

            disableBoard();

            return;
        }
    }

    if(!board.includes("")){

        gameActive=false;
        draws++;
        drawScore.textContent=draws;
        resultText.textContent="🤝 It's a Draw!";
        turnText.textContent="Game Over";
    }
}

function disableBoard(){

    cells.forEach(cell=>{
        cell.disabled=true;
    });

}

function restartGame(){

    board=["","","","","","","","",""];
    gameActive=true;
    currentPlayer="X";

    resultText.textContent="";
    turnText.textContent="Your Turn";

    cells.forEach(cell=>{
        cell.textContent="";
        cell.disabled=false;
        cell.classList.remove("win");
    });

}

function newMatch(){

    xWins=0;
    oWins=0;
    draws=0;

    scoreX.textContent=0;
    scoreO.textContent=0;
    drawScore.textContent=0;

    restartGame();

}