
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
    Endturn:3,
    Battlefield:4,
    Attack:5,
    Heropower:11,
    Hero:7,
    Dual:8,
    Start:9,
    Disconnect:10,
    EndGame:6,
    battleCry:12
};

module.exports = Action;
