var Action = require("./action");

class heropower extends Action{
    constructor(id,player,OBJ,from,to){
        super(id , Action.Type.Heropower , "英雄能力" , OBJ , player.id , from , to);
    }
}

module.exports = heropower;