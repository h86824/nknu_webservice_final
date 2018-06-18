var Action = require("./action");

class EndTurn extends Action{
    constructor(id , player, crystals){
        super(id , Action.Type.End , "結束回合" , {"crystal":crystals} , player.id , null , null);
    }
}

module.exports = EndTurn;