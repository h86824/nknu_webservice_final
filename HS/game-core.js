var Drainage = require("./action/action.drainage");
var Setting = require("./action/action.setting");
var bfSetting = require("./action/action.battleField")
var Discard = require("./action/action.discard");
var battlefield = require("./battleField");
var endTurn = require("./action/action.endturn");

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
        let draw3;
        for(draw3=0;draw3<3;){
            this.currentPlayer.draw();
        }
        _sendBF();
        this.playernumber = 0;
        this.opponent = this.players[1]
        let draw4;
        for(draw4=0;draw4<4;){
            this.opponent.draw();
        }
        _sendBF();
        this.currentPlayer.emit("match", new Setting(this.actionCount++ , player.socket));//回合Msg
        this.opponent.emit("match",new Setting(this.actionCount++ , player.socket));//回合Msg
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
                    this.currentPlayer.socket.emit("match" , new endTurn(this.actionCount++,this.currentPlayer.socket));//回合Msg
                    this.bf.BeginTurnInvoke(this.currentPlayer);
                    this.currentPlayer.draw();
                    
                    this.opponent = this.players[(this.playernumber+1)%2];
                    break;
                case HS.Action.Drainage:
                    this.currentPlayer.draw();
                    _sendBF();
                    break;
                case  HS.Action.Setting:
                    break;
                case HS.Action.Discard:
                    this.currentPlayer.discard(data.obj.cardID);
                    
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
                    this.bf.DeathrattleInvoke();
                    _sendBF();
                
            }
                
            
        }
    }
    _sendDraw(cards){
        this.players.forEach( player => {
            player.socket.emit("match" , new Drainage(this.actionCount++ , player.socket , cards));
        });
    }
    _sendBF(obj){
        this.players.forEach( player => {
            player.socket.emit("match" , new bfSetting(player,this.bf));
        });
    }
    _sendEndTurn(){
        player.socket.emit("match" , new endTurn(this.actionCount++,player.socket));
    }
    _createGame(){
        this.bf = new battlefield(players[0],players[1]);
        _sendBF();
    }
    _sendDiscard(cards){
        this.players.forEach( player => {
            player.socket.emit("match" , new Discard(this.actionCount++,player.socket,cards));
        });
    }
}

module.exports = GameCore;