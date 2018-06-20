this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function Blitzcrank(id){
        HS.Card.call(this , id , 'CardBlitzcrank' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    Blitzcrank.prototype = {
        
    }
    extend(Blitzcrank , HS.Card);

        HS.Card.Blitzcrank = Blitzcrank;
    }());