export class Game{

    constructor(playerCount){
        this.playerCount = parseInt(playerCount);
        this.playersPosition = new Array(parseInt(playerCount)).fill(0);
        // this.playersPosition = [3,6,11,53]
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
        this.playersPosition[this.playerTurn] = this.playersPosition[this.playerTurn] + roll;
        // console.log(this.board[3][3].i,this.board[3][3].j)
        // this.board[3][3].element.style.backgroundColor = 'red';
        console.log(this.playersPosition)
        return roll
    }

    currentTurn(){
        return this.playerTurn;
    }

    checkWin(){
        let res = [false,0];
        for(let i = 0; i < this.playersPosition.length; i++){
            if (this.playersPosition[i] > 99){
                res = [true,i];
                
            }
        }
        return res
    }
}