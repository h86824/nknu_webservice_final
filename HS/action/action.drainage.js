var Action = require("./action");

class Drainage extends Action{
    constructor(id , player ,cards){
        super(id , Action.Type.Drainage , "抽牌" , cards , player.id , null , null);
    }
}

module.exports = Drainage;