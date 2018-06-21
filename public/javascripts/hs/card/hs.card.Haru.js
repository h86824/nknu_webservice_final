this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function Haru(id){
        HS.Card.call(this , id , 'CardHaru' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    Haru.prototype = {
        
    }
    extend(Haru , HS.Card);

        HS.Card.Haru = Haru;
    }());