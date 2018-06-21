this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function DyMing(id){
        HS.Card.call(this , id , 'CardDyMing' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    DyMing.prototype = {
        
    }
    extend(DyMing , HS.Card);

        HS.Card.DyMing = DyMing;
    }());