this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function Maple(id){
        HS.Card.call(this , id , 'CardMaple' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    Maple.prototype = {
        
    }
    extend(Maple , HS.Card);

        HS.Card.Maple = Maple;
    }());