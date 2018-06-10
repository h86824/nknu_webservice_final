var Action = require("./action");

class Drainage extends Action{
    constructor(id , player){
        super(id , Action.Type.Drainage , "抽牌" , {} , player.id , null , null);
    }
}

module.exports = Drainage;