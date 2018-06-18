
this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};

(function(){
    function TinLee(id){
        HS.Card.call(this , id , "CardSticker");
        
    }

    TinLee.prototype = {

    }

    extend(TinLee , HS.Card);

    HS.Card.TinLee = TinLee;
}());
