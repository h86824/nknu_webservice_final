this.HS = this.HS || {};
this.HS.Action = this.HS.Action || {};

(function(){
    function Attack(from,to){
        HS.Action.Action.call(this);
        
        this.type = HS.Action.Type.Attack;
        this.from=from;
        this.to=to;
    }

    Attack.prototype = {
        
    }

    extend(Attack , HS.Action.Action);

    HS.Action.Attack = Attack;
}());