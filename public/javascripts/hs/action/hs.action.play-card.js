
this.HS = this.HS || {};
this.HS.Action = this.HS.Action || {};

(function(){
    function PlayCard(id){
        HS.Action.Action.call(this);
        
        this.type = HS.Action.Type.Discard;
        this.type.obj = {cardID : id};
    }

    PlayCard.prototype = {
        
    }

    extend(PlayCard , HS.Action.Action);

    HS.Action.PlayCard = PlayCard;
}());