this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function Darius(id){
        HS.Card.call(this , id , 'CardDarius' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    Darius.prototype = {
        
    }
    extend(Darius , HS.Card);

        HS.Card.Darius = Darius;
    }());