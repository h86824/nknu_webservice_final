this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function Azir(id){
        HS.Card.call(this , id , 'CardAzir' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    Azir.prototype = {
        
    }
    extend(Azir , HS.Card);

        HS.Card.Azir = Azir;
    }());