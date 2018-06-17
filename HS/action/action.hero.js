var Action = require("./action");

class hero extends Action{
    constructor(id,player,heroCard){
        super(id , Action.Type.Hero , "英雄" , heroCard , player.id , from , to);
    }
}

module.exports = hero;