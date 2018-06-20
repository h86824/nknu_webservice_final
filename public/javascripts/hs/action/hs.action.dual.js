
this.HS = this.HS || {};
this.HS.Action = this.HS.Action || {};

(function(){
    function Dual( deckID ){
        HS.Action.Action.call(this);
        
        this.type = HS.Action.Type.Dual;
        this.obj={hero:'WinTingLee',deckID:deckID};
    }

    Dual.prototype = {
        
    }

    extend(Dual , HS.Action.Action);

    HS.Action.Dual = Dual;
}());