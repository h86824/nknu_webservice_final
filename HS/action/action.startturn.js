var Action = require("./action");

class StartTurn extends Action{
    constructor(id , player){
        super(id , Action.Type.End , "開始回合" , {} , player.id , null , null);
    }
}

module.exports = StartTurn;