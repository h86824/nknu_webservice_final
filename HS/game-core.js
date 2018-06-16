var Drainage = require("./action/action.drainage");
var Setting = require("./action/action.setting");
var bfSetting = require("./action/action.battleField")
var Discard = require("./action/action.discard");
var battlefield = require("./battleField");

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
                case HS.Action.Endturn:
                    this.bf.EndTurnInvoke(this.currentPlayer)
                    _sendBF();
                    this.playernumber++;
                    this.currentPlayer = this.players[(this.playernumber)%2];
                    this.bf.BeginTurnInvoke(this.currentPlayer);
                    _sendBF();
                    this.opponent = this.players[(this.playernumber+1)%2];
                    break;
                case HS.Action.Drainage:
                    this.bf.currentPlayer.draw();
                    _sendBF();
                    break;
                case  HS.Action.Setting:
                    break;
                case HS.Action.Discard:
                    this.bf.currentPlayer.discard(data.obj.cardID);
                    _sendBF();
                    this.bf.BattlecryInvoke(this.currentPlayer,data.from,data.to);
                    _sendBF();
                    this.bf.DeathrattleInvoke();
                    _sendBF();
                    break;
                case HS.Action.Attack:
                    this.bf.attackInvoke(this.currentPlayer,this.opponent,data.from,data.to);
                    _sendBF();
                    this.bf.DeathrattleInvoke();
                    _sendBF();
                    break;
                case HS.Action.Heropower:
                    this.bf.HeropowerInvoke(this.currentPlayer,data.to);
                    _sendBF();
                
            }
                
            
        }
    }
    _sendBF(){
        this.players.forEach( player => {
            player.socket.emit("game" , new bfSetting(player,this.bf));
        });
    }
    _createGame(){
        this.bf = new battlefield(player1,player2);
        _sendBF();
    }

}

module.exports = GameCore;