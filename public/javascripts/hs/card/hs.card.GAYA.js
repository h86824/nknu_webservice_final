this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function GAYA(id){
        HS.Card.call(this , id , 'CardGAYA' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    GAYA.prototype = {
        
    }
    extend(GAYA , HS.Card);

        HS.Card.GAYA = GAYA;
    }());