var Drainage = require("./action/action.drainage");
var Setting = require("./action/action.setting");
var bfSetting = require("./action/action.battleField")
var Discard = require("./action/action.discard");
var battlefield = require("./battleField");
var endTurn = require("./action/action.endturn");
var hero = require("./action/action.hero");

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
        this._gameLoop();
        this.players.forEach( player => { player.socket.on("match", data => this._handlePlayerMessage(player, data) ) });
        
    }

    _gameLoop() {
        this.currentPlayer = this.players[0];
        let draw3;
        for(draw3=0;draw3<3;){//起手排
            let drawArr = this.currentPlayer.draw();
            this._sendDraw(drawArr);

        }
        this.currentPlayer.cost++;//水晶增加
        this.playernumber = 0;
        this.opponent = this.players[1]
        let draw4;
        for(draw4=0;draw4<4;){//起手排
            let drawArr = this.opponent.draw();
            this._sendDraw(drawArr);
        }
        this.currentPlayer.emit("match", new Setting(this.actionCount++ , player.socket));//回合Msg
        this.opponent.emit("match",new Setting(this.actionCount++ , player.socket));//回合Msg
    }

    _handlePlayerMessage(player , data){
        if(this.currentPlayer === player){
            console.log(data);
            switch(data.type){
                case HS.Action.Endturn:
                    let EndArr = this.bf.EndTurnInvoke(this.currentPlayer)
                    this._sendBF(EndArr);
                    this.playernumber++;
                    this.currentPlayer = this.players[(this.playernumber)%2];
                    this.currentPlayer.cost++;//水晶增加
                    this.currentPlayer.socket.emit("match" , new endTurn(this.actionCount++,this.currentPlayer.socket,this.currentPlayer.cost));//回合Msg
                    let beginArr = this.bf.BeginTurnInvoke(this.currentPlayer);
                    this._sendBF(beginArr);
                    let drawtemp = this.currentPlayer.draw();
                    if(drawtemp==null){
                       this. _sendHero(this.currentPlayer.hero);
                    }
                    else{
                        this._sendDraw(drawtemp);
                    }
                    this.opponent = this.players[(this.playernumber+1)%2];
                    break;
                case HS.Action.Drainage:
                    let drawtemp1 = this.currentPlayer.draw();
                    if(drawtemp1==null){
                       this._sendHero(this.currentPlayer.hero);
                    }
                    else{
                        this._sendDraw(drawtemp1);
                    }
                    
                    break;
                case  HS.Action.Setting:
                    break;
                case HS.Action.Discard:
                    let cardArr = this.currentPlayer.discard(data.obj.cardID);
                    this._sendDiscard(cardArr);
                    let BattleArr = this.bf.BattlecryInvoke(this.currentPlayer,data.from,data.to);
                    this._sendBF(BattleArr);
                    let DeathArr=this.bf.DeathrattleInvoke();
                    this._sendBF(DeathArr);
                    break;
                case HS.Action.Attack:
                    let attackTemp = this.bf.attackInvoke(this.currentPlayer,this.opponent,data.from,data.to);
                    this._sendBF(attackTemp);
                    let DeadArr = this.bf.DeathrattleInvoke();
                    this._sendBF(DeadArr);
                    break;
                case HS.Action.Heropower:
                    let heroArr = this.bf.HeropowerInvoke(this.currentPlayer,data.to);
                    this._sendBF(heroArr);
                    let DArr = this.bf.DeathrattleInvoke();
                    this._sendBF(DArr);
                
            }
                
            
        }
    }

    _sendHero(herocard){
        this.players.forEach( player => {
            player.socket.emit("match" , new hero(this.actionCount++ , player.socket , herocard));
        });
    }
    _sendDraw(cards){
        this.players.forEach( player => {
            if(player===this.currentPlayer){player.socket.emit("match" , new Drainage(this.actionCount++ , player.socket , cards));}
            else{
                player.socket.emit("match" , new Drainage(this.actionCount++ , player.socket , {}));
            }
            
        });
    }
    _sendBF(cards){
        this.players.forEach( player => {
            player.socket.emit("match" , new bfSetting(this.actionCount++ , player,cards));
        });
    }
    _createGame(){
        this.bf = new battlefield(players[0],players[1]);
    }
    _sendDiscard(cards){
        this.players.forEach( player => {
            player.socket.emit("match" , new Discard(this.actionCount++,player.socket,cards));
        });
    }
}

module.exports = GameCore;