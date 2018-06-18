
this.HS = this.HS || {};
this.HS.Action = this.HS.Action || {};

(function(){
    function EndTurn(id ){
        HS.Action.Action.call(this);
        this.type = HS.Action.Type.Endturn;
    }

    EndTurn.prototype = {
        
    }

    extend(EndTurn , HS.Action.Action);

    HS.Action.EndTurn = EndTurn;
}());