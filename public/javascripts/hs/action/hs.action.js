
this.HS = this.HS || {};
this.HS.Action = this.HS.Action || {};

(function(){

    function Action(){

    }

    Action.prototype = {
        id : null,
        type : null,
        msg : null,
        obj : null,
        player : null,
        from : null,
        to : null,
    }

    let type = {
        Setting: 0,
        Drainage: 1,
        Discard:2,
        Endturn:3,
        Battlefield:4,
        Attack:5,
        Heropower:6,
        Hero:7,
        Dual:8,
        Start:9
    };    

    HS.Action.Action = Action;
    HS.Action.Type = type;
}())