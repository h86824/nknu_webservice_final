this.HS = this.HS || {};
this.HS.Action = this.HS.Action || {};

(function(){
    function Attack(actionID,targetID){
        HS.Action.Action.call(this);
        
        this.type = HS.Action.Type.Attack;
        this.from=actionID;
        this.to=targetID;
    }

    Attack.prototype = {
        
    }

    extend(Attack , HS.Action.Action);

    HS.Action.Attack = Attack;
}());