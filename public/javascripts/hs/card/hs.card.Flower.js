this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function Flower(id){
        HS.Card.call(this , id , 'CardFlower' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    Flower.prototype = {
        
    }
    extend(Flower , HS.Card);

        HS.Card.Flower = Flower;
    }());