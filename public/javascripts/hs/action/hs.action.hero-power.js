
this.HS = this.HS || {};
this.HS.Action = this.HS.Action || {};

(function(){
    function HeroPower(from,to){
        HS.Action.Action.call(this);
        
        this.type = HS.Action.Type.Heropower;
        this.from=from;
        this.to=to;
    }

    HeroPower.prototype = {
        
    }

    extend(HeroPower , HS.Action.Action);

    HS.Action.HeroPower = HeroPower;
}());