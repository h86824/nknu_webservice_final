this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function Lily(id){
        HS.Card.call(this , id , 'CardLily' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    Lily.prototype = {
        
    }
    extend(Lily , HS.Card);

        HS.Card.Lily = Lily;
    }());