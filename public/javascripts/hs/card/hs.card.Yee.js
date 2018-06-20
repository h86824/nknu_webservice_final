this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function Yee(id){
        HS.Card.call(this , id , 'CardYee' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    Yee.prototype = {
        
    }
    extend(Yee , HS.Card);

        HS.Card.Yee = Yee;
    }());