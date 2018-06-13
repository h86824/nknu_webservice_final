var Drainage = require("./action/action.drainage");
var Setting = require("./action/action.setting");
var bfSetting = require("./action/action.battleField")
var Battlefield = require("./battleField");
var Player = require("./player")
class GameCore {
    
    constructor(playerA , playerB){
        this.players = [];
        this.p1deck=[];
        this.p2deck=[]
        player1 = new Player(playerA,"傳入TingLee英雄實體",p1deck);
        player2 = new Player(playerB,"傳入郭哥英雄實體",p2deck);
        this.players.push(player1);
        this.players.push(player2)
        this.actionCount = 0;
    }

    start() {
        this.players.forEach( player => {
            player.socket.emit("match" , new Setting(this.actionCount++ , player) );
        });

        this.players.forEach( player => {
            player.socket.emit("match" , new Drainage(this.actionCount++ , player) );
        });

        this.players.forEach( player => {
            player.socket.emit("match" , new Drainage(this.actionCount++ , player) );
        });

        this.players.forEach( player => {
            player.socket.emit("match" , new Drainage(this.actionCount++ , player) );
        });

        this.players.forEach( player => { player.socket.on("match", data => this._handlePlayerMessage(player, data) ) });

        this._gameLoop();
    }

    _gameLoop() {
        this.currentPlayer = this.players[0];
        this.playernumber = 0;
    }

    _handlePlayerMessage(player , data){
        if(this.currentPlayer === player){
            console.log(data);
            switch(data.type){
                case HS.Action.endturn:
                    this.currentPlayer = this.players[(playernumber+1)%2];
                    break;
                case HS.Action.Drainage:
                    break;
                case  HS.Action.setting:
                    break;
            }
            
        }
    }
    _createGame(){
        this.bf = new Battlefield(player1,player2);
        this.players.forEach( player => {
            player.socket.emit("game" , new bfSetting(bf,player));
        });
    }

}

module.exports = GameCore;