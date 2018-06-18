var Drainage = require("./action/action.drainage");
var Setting = require("./action/action.setting");
var bfSetting = require("./action/action.battleField")
var Discard = require("./action/action.discard");
var battlefield = require("./battleField");
var endTurn = require("./action/action.endturn");
var hero = require("./action/action.hero");
var Action = require("./action/action");
var start = require("./action/action.start")

class GameCore {
    
    constructor(playerA , playerB){
        this.players = [];
        this.players.push(playerA);
        this.players.push(playerB);
        this.actionCount = 0;
        this._gameLoop();
        console.log("gameLoop OK!!");
    }

    start() {
        this._createGame();

        /*this.players.forEach( player => {
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
        console.log("Listener OK!!");
    }

    _gameLoop() {
        this.currentPlayer = this.players[0];
        this.opponent = this.players[1];
        this.playernumber = 0;
        
        for(let draw3=0;draw3<3;draw3++){//起手排
            let drawArr = this.currentPlayer.draw();
            this.currentPlayer.socket.emit("match",new Drainage(this.actionCount++,this.currentPlayer.socket,drawArr));
            this.opponent.socket.emit("match", new Drainage(this.actionCount++ , this.currentPlayer.socket , {}));
        }
        this.currentPlayer.cost++;//水晶增加
        
        
        for(let draw4=0;draw4<4;draw4++){//起手排
            let drawArr2 = this.opponent.draw();
            this.opponent.socket.emit("match",new Drainage(this.actionCount++,this.opponent.socket,drawArr2));
            this.currentPlayer.socket.emit("match",new Drainage(this.actionCount++,this.opponent.socket,{}));

        }
        this.currentPlayer.socket.emit("match", new start(this.actionCount++ , this.currentPlayer.socket,this.currentPlayer.cost));//回合Msg
        this.opponent.socket.emit("match" , new start(this.actionCount++,this.currentPlayer.socket,this.currentPlayer.cost));//回合Msg
        let firstDraw =  this.currentPlayer.draw();
        this.currentPlayer.socket.emit("match",new Drainage(this.actionCount++,this.currentPlayer.socket,firstDraw));
        this.opponent.socket.emit("match", new Drainage(this.actionCount++ , this.currentPlayer.socket , {}));
    }

    _handlePlayerMessage(player , data){
        if(this.currentPlayer === player){
            console.log(data);
            switch(data.type){
                case Action.Type.Endturn:
                    //let EndArr = this.bf.EndTurnInvoke(this.currentPlayer)
                    //this._sendBF(EndArr);
                    this.playernumber++;
                    this.currentPlayer = this.players[(this.playernumber)%2];
                    this.opponent = this.players[(this.playernumber+1)%2];
                    this.currentPlayer.cost++;//水晶增加
                    this.currentPlayer.socket.emit("match" , new start(this.actionCount++,this.currentPlayer.socket,this.currentPlayer.cost));//回合Msg
                    this.opponent.socket.emit("match" , new start(this.actionCount++,this.currentPlayer.socket,this.currentPlayer.cost));//回合Msg
                    //let beginArr = this.bf.BeginTurnInvoke(this.currentPlayer);
                    //this._sendBF(beginArr);
                    let drawtemp = this.currentPlayer.draw();
                    if(!drawtemp.cards.length){
                       this. _sendHero(this.currentPlayer.hero);
                    }
                    else{
                        this.currentPlayer.socket.emit("match",new Drainage(this.actionCount++,this.currentPlayer.socket,drawtemp));
                        this.opponent.socket.emit("match",new Drainage(this.actionCount++,this.currentPlayer.socket,{}));
                    }
                    
                    break;
                case  Action.Type.Setting:
                    break;
                case Action.Type.Discard:
                    let cardArr = this.currentPlayer.discard(data.obj.cardID,data.obj.position);
                    console.log(cardArr);
                    this._sendDiscard(cardArr);
                   // let BattleArr = this.bf.BattlecryInvoke(this.currentPlayer,data.from,data.to);
                    //this._sendBF(BattleArr);
                    //let DeathArr=this.bf.DeathrattleInvoke();
                    //this._sendBF(DeathArr);
                    break;
                case Action.Type.Attack:
                    let attackTemp = this.bf.attackInvoke(this.currentPlayer,this.opponent,data.from,data.to);
                    this._sendBF(attackTemp);
                    let DeadArr = this.bf.DeathrattleInvoke();
                    this._sendBF(DeadArr);
                    break;
                case Action.Type.Heropower:
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
    _sendBF(cards){
        this.players.forEach( player => {
            player.socket.emit("match" , new bfSetting(this.actionCount++ , player,cards));
        });
    }
    _createGame(){
        this.bf = new battlefield(this.players[0],this.players[1]);
    }
    _sendDiscard(cards){
        this.players.forEach( player => {
            player.socket.emit("match" , new Discard(this.actionCount++,this.currentPlayer.socket,cards));
        });
    }
}

module.exports = GameCore;