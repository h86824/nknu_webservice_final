var Drainage = require("./action/action.drainage");
var Setting = require("./action/action.setting");

class GameCore {
    
    constructor(playerA , playerB){
        this.players = [];
        playerA.id = 0;

        this.players.push(playerA);

        this.actionCount = 0;
    }

    start() {
        this.players.forEach( player => {
            player.emit("match" , new Setting(this.actionCount++ , player) );
        });

        this.players.forEach( player => {
            player.emit("match" , new Drainage(this.actionCount++ , player) );
        });

        this.players.forEach( player => {
            player.emit("match" , new Drainage(this.actionCount++ , player) );
        });

        this.players.forEach( player => {
            player.emit("match" , new Drainage(this.actionCount++ , player) );
        });

        this._gameLoop();
    }

    _gameLoop() {
        
    }

}

module.exports = GameCore;