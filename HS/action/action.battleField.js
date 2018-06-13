var Action = require("./action");
class battleField extends Action{
    constructor(player,battlefield){
        super(id , Action.Type.Battlefield , "戰場訊息" , battlefield , player.id , null , null);
    }
}

module.exports = battleField;