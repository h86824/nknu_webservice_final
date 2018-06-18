
this.HS = this.HS || {};
this.HS.Action = this.HS.Action || {};

(function(){
    function Endturn(){
        HS.Action.Action.call(this);
        
        this.type = HS.Action.Type.Endturn;
    }

    Endturn.prototype = {
        
    }

    extend(Endturn , HS.Action.Action);

    HS.Action.Endturn = Endturn;
}());