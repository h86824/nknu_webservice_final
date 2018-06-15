var Drainage = require("./action/action.drainage");
var Setting = require("./action/action.setting");
var bfSetting = require("./action/action.battleField")
var Discard = require("./action/action.discard");
var battlefield = require("./battleField").default;

class GameCore {
    
    constructor(playerA , playerB){
        this.players = [];
        this.players.push(playerA);
        this.players.push(playerB)
        this.actionCount = 0;
    }

    start() {
        this._createGame();

        this.players.forEach( player => {
            player.socket.emit("match" , new Setting(this.actionCount++ , player.socket) );
        });

        this.players.forEach( player => {
            player.socket.emit("match" , new Drainage(this.actionCount++ , player.socket) );
        });

        this.players.forEach( player => {
            player.socket.emit("match" , new Drainage(this.actionCount++ , player.socket) );
        });

        this.players.forEach( player => {
            player.socket.emit("match" , new Drainage(this.actionCount++ , player.socket) );
        });
        /*this.players.forEach(player => {
            player.socket.emit("match" , new attack(this.actionCount++ , player.socket,actionCard,targetCard) );
            
        });*/

        this.players.forEach( player => { player.socket.on("match", data => this._handlePlayerMessage(player, data) ) });

        this._gameLoop();
    }

    _gameLoop() {
        this.currentPlayer = this.players[0];
        this.playernumber = 0;
        this.opponent = this.players[1]
    }

    _handlePlayerMessage(player , data){
        if(this.currentPlayer === player){
            console.log(data);
            switch(data.type){
                case HS.Action.endturn:
                    this.bf.EndTurnInvoke(this.currentPlayer)
                    this.playernumber++;
                    this.currentPlayer = this.players[(this.playernumber)%2];
                    this.bf.BeginTurnInvoke(this.currentPlayer);
                    this.opponent = this.players[(this.playernumber+1)%2];
                    break;
                case HS.Action.Drainage:
                    this.bf.currentPlayer.draw();
                    break;
                case  HS.Action.setting:
                    break;
                case HS.Action.Discard:
                    this.bf.currentPlayer.discard(data.obj.cardID);
                    this.bf.BattlecryInvoke(this.currentPlayer,data.from,data.to);
                    this.bf.DeathrattleInvoke();
                    break;
                case HS.Action.attack:
                    this.bf.attackInvoke(this.currentPlayer,this.opponent,data.from,data.to);
                    this.bf.DeathrattleInvoke();
                    break;
                
                    
            }
                
            
        }
    }
    _createGame(){
        this.bf = new battlefield(player1,player2);
        this.players.forEach( player => {
            player.socket.emit("game" , new bfSetting(player,this.bf));
        });
    }

}

module.exports = GameCore;