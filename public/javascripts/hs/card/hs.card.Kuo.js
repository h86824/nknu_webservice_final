this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function Kuo(id){
        HS.Card.call(this , id , 'CardKuo' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    Kuo.prototype = {
        
    }
    extend(Kuo , HS.Card);

        HS.Card.Kuo = Kuo;
    }());