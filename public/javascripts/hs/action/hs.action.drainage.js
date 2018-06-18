
this.HS = this.HS || {};
this.HS.Action = this.HS.Action || {};

(function(){
    function Drainage(){
        HS.Action.Action.call(this);
        
        this.type = HS.Action.Type.Drainage;
    }

    Drainage.prototype = {
        
    }

    extend(Drainage , HS.Action.Action);

    HS.Action.Drainage = Drainage;
}());