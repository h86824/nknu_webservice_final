
this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};

(function(){
    function CCLin(id){
        HS.Card.call(this , id , "CardCCLin");
        
    }

    CCLin.prototype = {

    }

    extend(CCLin , HS.Card);

    HS.Card.CCLin = CCLin;
}());
