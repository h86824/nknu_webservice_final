this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function YYT(id){
        HS.Card.call(this , id , 'CardYYT' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    YYT.prototype = {
        
    }
    extend(YYT , HS.Card);

        HS.Card.YYT = YYT;
    }());