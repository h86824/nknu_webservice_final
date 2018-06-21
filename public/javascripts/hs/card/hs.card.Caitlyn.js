this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function Caitlyn(id){
        HS.Card.call(this , id , 'CardCaitlyn' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    Caitlyn.prototype = {
        
    }
    extend(Caitlyn , HS.Card);

        HS.Card.Caitlyn = Caitlyn;
    }());