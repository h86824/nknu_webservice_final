var Action = require("./action");

class battleCry extends Action{
    constructor(id,player,battlefield,from,to){
        super(id , Action.Type.battleCry , "戰吼" , battlefield , player.id , from , to);
    }
}

module.exports = battleCry;