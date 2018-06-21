this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function FireBall(id){
        HS.Card.call(this , id , 'CardFireBall' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    FireBall.prototype = {
    }
    extend(FireBall , HS.Card);

        HS.Card.FireBall = FireBall;
}());