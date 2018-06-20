this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function Camille(id){
        HS.Card.call(this , id , 'CardCamille' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    Camille.prototype = {
        
    }
    extend(Camille , HS.Card);

        HS.Card.Camille = Camille;
    }());