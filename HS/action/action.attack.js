var Action = require("./action");

class Attack extends Action{
    constructor(id , player ,from,to){
        super(id , Action.Type.Discard , "攻擊" , {} , player.id , from , to);
    }
}

module.exports = Attack;