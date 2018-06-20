this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function Poo(id){
        HS.Card.call(this , id , 'CardPoo' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    Poo.prototype = {
        
    }
    extend(Poo , HS.Card);

        HS.Card.Poo = Poo;
    }());