
this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};

(function(){
    function Ahri(id){
        HS.Card.call(this , id , "CardAhri" , new createjs.Matrix(1,0,0,1,0,0));
        
    }

    Ahri.prototype = {

    }

    extend(Ahri , HS.Card);

    HS.Card.Ahri = Ahri;
}());
