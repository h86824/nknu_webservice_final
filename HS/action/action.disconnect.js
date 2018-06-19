var Action = require("./action");

class Disconnect extends Action{
    constructor(id ){
        super(id , Action.Type.Disconnect , "對手離開" , null , null , null , null);
    }
}

module.exports = Disconnect;