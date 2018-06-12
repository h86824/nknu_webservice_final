var Action = require("./action");

class EndTurn extends Action{
    constructor(id , player){
        super(id , Action.Type.End , "結束回合" , {} , player.id , null , null);
    }
}

module.exports = Drainage;