var Action = require("./action");

class attack extends Action{
    constructor(id,player,from,to){
        super(id , Action.Type.Attack , "戰鬥" , {} , player.id , from , to);
    }
}

module.exports = attack;