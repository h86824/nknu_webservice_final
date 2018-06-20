this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function JianAn(id){
        HS.Card.call(this , id , 'CardJianAn' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    JianAn.prototype = {
        
    }
    extend(JianAn , HS.Card);

        HS.Card.JianAn = JianAn;
    }());