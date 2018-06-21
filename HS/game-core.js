
var Setting = require("./action/action.setting");
var bfSetting = require("./action/action.battleField")
var Discard = require("./action/action.discard");
var battlefield = require("./battleField");
//var endTurn = require("./action/action.endturn");
var hero = require("./action/action.hero");
var Action = require("./action/action");
var start = require("./action/action.start");
var disconnect = require("./action/action.disconnect");
var Endgame = require("./action/action.endgame");
var battleCry = require("./action/action.battlecry");
var heroPower1 = require("./action/action.heropower");

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

        this.players.forEach( player => { player.socket.on("match", data => this._handlePlayerMessage(player, data) ) });
        this.players.forEach( player => { player.socket.on("disconnect", data =>this._handleDisconnect(player) ) });
        console.log("Listener OK!!");
    }

    _gameLoop() {
        this.currentPlayer = this.players[0];
        this.opponent = this.players[1];
        this.playernumber = 0;
        
        this.currentPlayer.socket.emit("match",new hero(this.actionCount++,this.currentPlayer.socket,this.currentPlayer.hero));
        this.opponent.socket.emit("match",new hero(this.actionCount++,this.currentPlayer.socket,this.currentPlayer.hero));
        this.currentPlayer.socket.emit("match",new hero(this.actionCount++,this.opponent.socket,this.opponent.hero));
        this.opponent.socket.emit("match",new hero(this.actionCount++,this.opponent.socket,this.opponent.hero));

    
        this.currentPlayer.draw(3 ,this.opponent.socket);
        //this.currentPlayer.socket.emit("match",new Drainage(this.actionCount++,this.currentPlayer.socket,drawArr));
        //this.opponent.socket.emit("match", new Drainage(this.actionCount++ , this.currentPlayer.socket , {cards:[],number:3,rc:this.currentPlayer.cardNumbers}));
        
        this.currentPlayer.cost++;//水晶增加
        this.currentPlayer.newCost=this.currentPlayer.cost;//設定水晶
        
        
        this.opponent.draw(4,this.currentPlayer.socket);
        //this.opponent.socket.emit("match",new Drainage(this.actionCount++,this.opponent.socket,drawArr2));
        //this.currentPlayer.socket.emit("match", new Drainage(this.actionCount++ , this.opponent.socket , {cards:[],number:4,rc:this.opponent.cardNumbers}));


        this.currentPlayer.socket.emit("match", new start(this.actionCount++ , this.currentPlayer.socket,this.currentPlayer.cost));//回合Msg
        this.opponent.socket.emit("match" , new start(this.actionCount++,this.currentPlayer.socket,this.currentPlayer.cost));//回合Msg
        this.currentPlayer.draw(1,this.opponent.socket);
        //this.currentPlayer.socket.emit("match",new Drainage(this.actionCount++,this.currentPlayer.socket,firstDraw));
        //this.opponent.socket.emit("match", new Drainage(this.actionCount++ , this.currentPlayer.socket , {cards:[],number:1,rc:this.currentPlayer.cardNumbers}));
    }

    _handlePlayerMessage(player , data){
        if(this.currentPlayer === player){
            switch(data.type){
                case Action.Type.Endturn:
                    //let EndArr = this.bf.EndTurnInvoke(this.currentPlayer);
                    //this._sendBF(EndArr);
                  
                    this.playernumber++;
                    this.currentPlayer = this.players[(this.playernumber)%2];
                    this.opponent = this.players[(this.playernumber+1)%2];
                    if(this.currentPlayer.cost<10){
                        this.currentPlayer.cost++;//水晶增加
                    }
                    this.currentPlayer.newCost=this.currentPlayer.cost;//設定水晶
                    this.currentPlayer.socket.emit("match" , new start(this.actionCount++,this.currentPlayer.socket,this.currentPlayer.cost));//回合Msg
                    this.opponent.socket.emit("match" , new start(this.actionCount++,this.currentPlayer.socket,this.currentPlayer.cost));//回合Msg
                    for(let j=0;j<this.currentPlayer.allayList.length;j++){
                        this.currentPlayer.allayList[j].attackable = true;
                    }//變成可以攻擊
                    
                    //let beginArr = this.bf.BeginTurnInvoke(this.currentPlayer);
                    //this._sendBF(beginArr);
                    this.currentPlayer.draw(1,this.opponent.socket);
                    /*if(!drawtemp.cards.length){
                       this. _sendHero(this.currentPlayer.hero);
                    }
                    else{
                        this.currentPlayer.socket.emit("match",new Drainage(this.actionCount++,this.currentPlayer.socket,drawtemp));
                        this.opponent.socket.emit("match",new Drainage(this.actionCount++,this.currentPlayer.socket,{cards:[],number:1,rc:this.currentPlayer.cardNumbers}));
                    }*/
                    
                    break;
                case  Action.Type.Setting:
                    break;
                case Action.Type.Discard:
                    let cardArr = this.currentPlayer.discard(data.obj.cardID,data.obj.position);
                    this._sendDiscard(cardArr);
                    let BattleArr = this.bf.BattlecryInvoke(this.currentPlayer,this.opponent,data.obj.cardID);
                    this._sendBattleCry(BattleArr,data.obj.cardID,null);
                    let winYet= this.bf.isWin();
                    if(!winYet){
                    }
                    else{
                        this.currentPlayer.socket.emit("dual",new Endgame(this.actionCount++,winYet));
                        this.opponent.socket.emit("dual",new Endgame(this.actionCount++,winYet));
                    }
                    let DeathArr=this.bf.DeathrattleInvoke(this.currentPlayer,this.opponent,data.obj.cardID);
                    this._sendBattleCry(DeathArr,data.obj.cardID,null);
                    break;
                case Action.Type.Attack:
                    if(data.from!=data.to){
                        let attackTemp = this.bf.attackInvoke(this.currentPlayer,this.opponent,data.from,data.to);
                        this._sendBF(attackTemp,data.from,data.to);
                        let winYet= this.bf.isWin();
                        if(!winYet){
                        }
                        else{
                            this.currentPlayer.socket.emit("dual",new Endgame(this.actionCount++,winYet));
                            this.opponent.socket.emit("dual",new Endgame(this.actionCount++,winYet));
                        }
                        let DeathArr=this.bf.DeathrattleInvoke(this.currentPlayer,this.opponent,data.from);
                        this._sendBattleCry(DeathArr,data.from,null);
                    }
                    break;
                case Action.Type.Heropower:
                    let heroArr = this.bf.HeropowerInvoke(this.currentPlayer,this.opponent,data.from,data.to);
                    this._sendHeroPower(heroArr,data.from,data.to);
                    let DArr = this.bf.DeathrattleInvoke(this.currentPlayer,this.opponent,data.from);
                    this._sendBattleCry(DArr,data.from,null);
                
            }
                
            
        }
    }
    _sendBattleCry(cards,from,to){
        this.players.forEach( player => {
            player.socket.emit("match" , new heroPower1(this.actionCount++ , player,cards,from,to));
        });
    }
    _sendBattleCry(cards,from,to){
        this.players.forEach( player => {
            player.socket.emit("match" , new battleCry(this.actionCount++ , player,cards,from,to));
        });
    }
    _handleDisconnect(player){
        let tempPlayer = this.players.indexOf(player);
        this.players.splice(tempPlayer,1);
        this.players.forEach(leftplayer=>{
            leftplayer.socket.emit("dual",new disconnect(this.actionCount++));
        })
    }
    _sendHero(herocard){
        this.players.forEach( player => {
            player.socket.emit("match" , new hero(this.actionCount++ , player.socket , herocard));
        });
    }
    _sendBF(cards,f,t){
        this.players.forEach( player => {
            player.socket.emit("match" , new bfSetting(this.actionCount++ , player,cards,f,t));
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