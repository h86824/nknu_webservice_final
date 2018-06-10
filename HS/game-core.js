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

        this.players.forEach( player => { player.on("match", data => this._handlePlayerMessage(player, data) ) });

        this._gameLoop();
    }

    _gameLoop() {
        this.currentPlayer = this.players[0];

    }

    _handlePlayerMessage(player , data){
        if(this.currentPlayer === player){
            console.log(data);
        }
    }

}

module.exports = GameCore;