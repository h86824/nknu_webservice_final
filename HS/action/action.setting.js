var Action = require("./action");

class Setting extends Action{
    constructor(id , player){
        super(id , Action.Type.Setting , "設定" , null , player.id , null , null);
    }
}

module.exports = Setting;