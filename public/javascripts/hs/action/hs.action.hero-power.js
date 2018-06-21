
this.HS = this.HS || {};
this.HS.Action = this.HS.Action || {};

(function(){
    function HeroPower(){
        HS.Action.Action.call(this);
        
        this.type = HS.Action.Type.Heropower;
    }

    HeroPower.prototype = {
        
    }

    extend(HeroPower , HS.Action.Action);

    HS.Action.HeroPower = HeroPower;
}());