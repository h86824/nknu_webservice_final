var Action = require("./action");

class EndGame extends Action{
    constructor(id,player){
        super(id,Action.Type.EndGame,"遊戲結束",{} , player.id , null , null);
    }
}
module.exports = EndGame;