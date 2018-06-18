var Action = require("./action");

class Dual extends Action{
    constructor(id , player,cardInformation){
        super(id , Action.Type.Dual , "開始排隊" , cardInformation , player.id , null , null);
    }
}

module.exports = Dual;