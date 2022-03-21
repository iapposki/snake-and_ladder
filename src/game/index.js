export class Game{

    constructor(playerCount){
        this.playerCount = parseInt(playerCount);
        this.playersPosition = new Array(parseInt(playerCount)).fill(0);
        // this.playersPosition = [91,92]
        this.board = [];
        this.playerTurn = 0;
        this.tileStatus = {
            NORMAL: "normal",
            HEAD: "head",
            LADDER: "ladder"
        };
        this.playerColor = {
            0: "red",
            1: "blue",
            2: "yellow",
            3: "green"
        }
        // console.log(this.playersPosition)
        this.createBoard();
    }

    createBoard(){
        let count = 1;
        for (let i = 0; i < 10; i++) {
            const row = [];
            for (let j = 0; j < 10; j++) {
                const element = document.createElement("div");
                // element.style.height = "50px";
                // element.style.width = "50px";
                // element.style.backgroundColor = "green";
                // element.style.margin = "1px"
                element.dataset.status = this.tileStatus.NORMAL;
                const tile = {
                    i,
                    j,
                    tileNumber:count,
                    element,
                    ladderTop:0,
                    tail:0,
                    playerPresent:[],
                    get status(){
                        return element.dataset.status;
                    },
                    set status(value){
                        this.element.dataset.status = value;
                    }
                }
                
                this.playersPosition.forEach((el,index) => {
                    if (el === tile.tileNumber){
                        tile.element.style.backgroundColor = this.playerColor[index]
                    }
                })
                if (tile.tileNumber === 99){
                    tile.element.dataset.status = this.tileStatus.HEAD
                    tile.tail = 41;
                } else if (tile.tileNumber === 89){
                    tile.element.dataset.status = this.tileStatus.HEAD
                    tile.tail = 53;
                } else if (tile.tileNumber === 76){
                    tile.element.dataset.status = this.tileStatus.HEAD
                    tile.tail = 58;
                } else if (tile.tileNumber === 66){
                    tile.element.dataset.status = this.tileStatus.HEAD
                    tile.tail = 45;
                } else if (tile.tileNumber === 54){
                    tile.element.dataset.status = this.tileStatus.HEAD
                    tile.tail = 31;
                } else if (tile.tileNumber === 43){
                    tile.element.dataset.status = this.tileStatus.HEAD
                    tile.tail = 18;
                } else if (tile.tileNumber === 40){
                    tile.element.dataset.status = this.tileStatus.HEAD
                    tile.tail = 3;
                } else if (tile.tileNumber === 27){
                    tile.element.dataset.status = this.tileStatus.HEAD
                    tile.tail = 5;
                } else if (tile.tileNumber === 4){
                    tile.element.dataset.status = this.tileStatus.LADDER
                    tile.ladderTop = 25;
                } else if (tile.tileNumber === 13){
                    tile.ladderTop = 46;
                    tile.element.dataset.status = this.tileStatus.LADDER
                } else if (tile.tileNumber === 33){
                    tile.ladderTop = 49;
                    tile.element.dataset.status = this.tileStatus.LADDER
                } else if (tile.tileNumber === 42){
                    tile.ladderTop = 63;
                    tile.element.dataset.status = this.tileStatus.LADDER
                } else if (tile.tileNumber === 50){
                    tile.ladderTop = 69;
                    tile.element.dataset.status = this.tileStatus.LADDER
                } else if (tile.tileNumber === 62){
                    tile.ladderTop = 81;
                    tile.element.dataset.status = this.tileStatus.LADDER
                } else if (tile.tileNumber === 74){
                    tile.ladderTop = 92;
                    tile.element.dataset.status = this.tileStatus.LADDER
                }

                count++;
                row.push(tile)
            }
            this.board.push(row)
        }
        this.board = this.board.reverse();
    }

    updateBoard(roll){
        var res = []
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                // this.playersPosition.forEach((el,index) => {
                //     if (el == String(this.board[i][j].tileNumber)){
                //         // this.board[i][j].element.backgroundColor = this.playerColor[index]
                //         res[index] = res[index] + el

                //     }
                // })
                if (this.board[i][j].tileNumber == this.playersPosition[this.playerTurn]){
                    res.push(i)
                    res.push(j)
                    res.push(roll)
                    res.push(this.playerTurn)
                }
            }
        }
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (this.board[i][j].tileNumber == this.playersPosition[this.playerTurn] - roll){
                    res.push(i)
                    res.push(j)
                    this.board[i][j].playerPresent.shift()
                }
            }
        }
        this.playerTurn = (this.playerTurn + 1)%this.playerCount; 

        // console.log(res) 
        return res;

    }

    nextTurn(){
        var roll = Math.ceil(Math.random()*6)
        // if (this.playersPosition[this.playerTurn] + roll < 101){
        // }
        this.playersPosition[this.playerTurn] = this.playersPosition[this.playerTurn] + roll;
        // console.log(this.board[3][3].i,this.board[3][3].j)
        // this.board[3][3].element.style.backgroundColor = 'red';
        console.log(this.playersPosition)
        // return [roll,this.playersPosition[this.playerTurn] + roll]
        return roll
    }

    currentTurn(){
        return this.playerTurn;
    }

    checkWin(){
        let res = [false,0];
        for(let i = 0; i < this.playersPosition.length; i++){
            if (this.playersPosition[i] > 99){
                // this.playersPosition[i] = 100;
                res = [true,i];
                
            }
        }
        return res
    }

    getPositionOnBoard(tileNum){
        for(let i = 0; i < 10; i++){
            for(let j = 0; j < 10; j++){
                if (this.board[i][j].tileNumber === tileNum){{
                    return [i,j];
                }}
            }
        }
    }

}