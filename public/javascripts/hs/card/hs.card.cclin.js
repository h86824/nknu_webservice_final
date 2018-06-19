
this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};

(function(){
    function CCLin(id){
        HS.Card.call(this , id , "CardCCLin" , new createjs.Matrix(1,0,0,1,-20,0));
        
    }

    CCLin.prototype = {

    }

    extend(CCLin , HS.Card);

    HS.Card.CCLin = CCLin;
}());
