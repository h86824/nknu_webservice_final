this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function JiungHan(id){
        HS.Card.call(this , id , 'CardJiungHan' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    JiungHan.prototype = {
        
    }
    extend(JiungHan , HS.Card);

        HS.Card.JiungHan = JiungHan;
    }());