this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function Yo(id){
        HS.Card.call(this , id , 'CardYo' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    Yo.prototype = {
        
    }
    extend(Yo , HS.Card);

        HS.Card.Yo = Yo;
    }());