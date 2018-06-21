this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function Braum(id){
        HS.Card.call(this , id , 'CardBraum' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    Braum.prototype = {
        
    }
    extend(Braum , HS.Card);

        HS.Card.Braum = Braum;
    }());