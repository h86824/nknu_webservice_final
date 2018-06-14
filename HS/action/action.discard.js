var Action = require("./action");

class Discard extends Action{
    constructor(id , player){
        super(id , Action.Type.Discard , "出牌" , {} , player.id , null , null);
    }
}

module.exports = Discard;