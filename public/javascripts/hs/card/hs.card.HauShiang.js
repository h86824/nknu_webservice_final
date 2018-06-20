this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function HauShiang(id){
        HS.Card.call(this , id , 'CardHauShiang' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    HauShiang.prototype = {
        
    }
    extend(HauShiang , HS.Card);

        HS.Card.HauShiang = HauShiang;
    }());