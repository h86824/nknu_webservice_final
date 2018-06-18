
this.HS = this.HS || {};
this.HS.Action = this.HS.Action || {};

(function(){
    function Dual(){
        HS.Action.Action.call(this);
        
        this.type = HS.Action.Type.Dual;
    }

    Dual.prototype = {

    }

    extend(Dual , HS.Action.Action);

    HS.Action.Dual = Dual;
}());