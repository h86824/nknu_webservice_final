var Action = require("./action");

class Start extends Action{
    constructor(id , player, crystals){
        super(id , Action.Type.Start , "回合開始" , {"crystal":crystals} , player.id , null , null);
    }
}

module.exports = Start;