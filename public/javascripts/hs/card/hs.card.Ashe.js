this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function Ashe(id){
        HS.Card.call(this , id , 'CardAshe' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    Ashe.prototype = {
        
    }
    extend(Ashe , HS.Card);

        HS.Card.Ashe = Ashe;
    }());