var Action = require("./action");

class Discard extends Action{
    constructor(id , player , theCard){
        super(id , Action.Type.Discard , "出牌" , theCard , player.id , null , null);
    }
}

module.exports = Discard;