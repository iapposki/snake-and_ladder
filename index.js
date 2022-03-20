import { Game } from "./src/game/index.js";

const playerCountForm = document.getElementById("playerCountForm")
const app = document.getElementById("app");
const playingBoard = document.getElementById("playingBoard")
const playerCount = document.getElementById("playerCount")
const goButton = document.getElementById("go")
const turnDiv = document.getElementById("turn")
goButton.addEventListener('click',handleSubmit)
const rollButton = document.getElementById("roll")

// const inputPlayerCount = document.createElement("input");
// inputPlayerCount.type = "number";
// inputPlayerCount.min = 2;
// inputPlayerCount.max = 4;
// inputPlayerCount.value = 2;
// // console.log(inputPlayerCount.value)
// app.append(inputPlayerCount)

// const submitPlayerCount = document.createElement("button");
// submitPlayerCount.value = "ok"
// app.append(submitPlayerCount)
// submitPlayerCount.onsubmit = setupGame

// function setupGame() {
//     app.innerHTML = "" 
// }

function handleSubmit(){
    // console.log("ok")
    console.log(playerCount.value)
    const newGame = new Game(playerCount.value)
    playerCountForm.remove();
    let count = 0;
    newGame.board.forEach(row => {
        if (count%2 === 0){
            // console.log("even")
            row = row.reverse()
        } 
        row.forEach(tile => {
            playingBoard.append(tile.element);
            tile.element.innerHTML = tile.tileNumber;
            // console.log(tile.i,tile.j)
        })
        count++;
    });
    rollButton.style.display = "flex"
    turnDiv.innerHTML = `Player ${newGame.playerColor[newGame.playerTurn]}'s turn`
    rollButton.style.backgroundColor = `${newGame.playerColor[newGame.playerTurn]}`
    rollButton.addEventListener('click',() => {
        let rolled = newGame.nextTurn();
        let res = newGame.updateBoard(rolled);
        console.log(res)
        let colors  = "";
        newGame.board[res[0]][res[1]].playerPresent.push(res[3])
        turnDiv.innerHTML = `Player ${newGame.playerColor[newGame.playerTurn]}'s turn`
        rollButton.style.backgroundColor = `${newGame.playerColor[newGame.playerTurn]}`


        for (let i = 0; i < newGame.board[res[0]][res[1]].playerPresent.length; i++){
            if (colors === ""){
                colors = newGame.playerColor[newGame.board[res[0]][res[1]].playerPresent[i]] + "," + newGame.playerColor[newGame.board[res[0]][res[1]].playerPresent[i]]
            } else {
                colors = colors + "," + newGame.playerColor[newGame.board[res[0]][res[1]].playerPresent[i]] + "," + newGame.playerColor[newGame.board[res[0]][res[1]].playerPresent[i]]
            }
        }
        console.log(colors)
        newGame.board[res[0]][res[1]].element.style.background = `linear-gradient(${colors})`
        colors  = "";
        
        
        if (newGame.board[res[4]][res[5]].playerPresent.length < 1){
            newGame.board[res[4]][res[5]].element.style.background = "none";
            newGame.board[res[4]][res[5]].element.style.backgroundColor = "white";
            // console.log(newGame.board[res[4]][res[5]].element.style.backgroundColor)
        } else {
            for (let i = 0; i < newGame.board[res[4]][res[5]].playerPresent.length; i++){
                if (colors === ""){
                    colors = newGame.playerColor[newGame.board[res[4]][res[5]].playerPresent[i]] + "," + newGame.playerColor[newGame.board[res[4]][res[5]].playerPresent[i]]
                } else {
                    colors = colors + "," + newGame.playerColor[newGame.board[res[4]][res[5]].playerPresent[i]] + "," + newGame.playerColor[newGame.board[res[4]][res[5]].playerPresent[i]]
                }
            }
        }
        newGame.board[res[4]][res[5]].playerPresent.shift()
        // newGame.board[res[4]][res[5]].element.style.background = "none";
        newGame.board[res[4]][res[5]].element.style.background = `linear-gradient(${colors})`

        let winOrNot = newGame.checkWin();
        if (winOrNot[0]){
            rollButton.style.backgroundColor = `${newGame.playerColor[winOrNot[1]]}`
            var newRollButton = rollButton.cloneNode(true)
            rollButton.parentNode.replaceChild(newRollButton, rollButton)
            newRollButton.style.width = "300px"
            newRollButton.innerHTML = `Player ${newGame.playerColor[winOrNot[1]]} WIN!!! `   
        }

    })
    
}
