this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function DaMing(id){
        HS.Card.call(this , id , 'CardDaMing' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    DaMing.prototype = {
        
    }
    extend(DaMing , HS.Card);

        HS.Card.DaMing = DaMing;
    }());