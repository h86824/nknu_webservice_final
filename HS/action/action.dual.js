var Action = require("./action");

class Dual extends Action{
    constructor(id , player,cardInformation){
        super(id , Action.Type.End , "結束回合" , cardInformation , player.id , null , null);
    }
}

module.exports = EndTurn;