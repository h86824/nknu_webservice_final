this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function CPH(id){
        HS.Card.call(this , id , 'CardCPH' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    CPH.prototype = {
        
    }
    extend(CPH , HS.Card);

        HS.Card.CPH = CPH;
    }());