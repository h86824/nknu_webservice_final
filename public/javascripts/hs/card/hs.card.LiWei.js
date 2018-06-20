this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function LiWei(id){
        HS.Card.call(this , id , 'CardLiWei' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    LiWei.prototype = {
        
    }
    extend(LiWei , HS.Card);

        HS.Card.LiWei = LiWei;
    }());