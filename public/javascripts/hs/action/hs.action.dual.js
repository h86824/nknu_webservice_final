
this.HS = this.HS || {};
this.HS.Action = this.HS.Action || {};

(function(){
    function Dual(){
        HS.Action.Action.call(this);
        
        this.type = HS.Action.Type.Dual;
        this.obj={hero:'WinTingLin',deckID:1};
    }

    Dual.prototype = {
        
    }

    extend(Dual , HS.Action.Action);

    HS.Action.Dual = Dual;
}());