var Action = require("./action");

class battleField extends Action{
    constructor(id,player,battlefield,from,to){
        super(id , Action.Type.Battlefield , "戰場訊息" , battlefield , player.id , from , to);
    }
}

module.exports = battleField;