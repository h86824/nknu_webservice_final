
class Action{

    constructor(id , type , msg , obj , player , from , to){
        this.id = id;
        this.type = type;
        this.msg = msg;
        this.obj = obj;
        this.player = player;
        this.from = from;
        this.to = to;
    }

}

Action.Type = {
    Setting: 0,
    Drainage: 1,
    Discard:2,
};

module.exports = Action;
