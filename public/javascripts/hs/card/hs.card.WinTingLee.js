this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function WinTingLee(id){
        HS.Card.call(this , id , 'CardWinTingLee' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    WinTingLee.prototype = {
        
    }
    extend(WinTingLee , HS.Card);

        HS.Card.WinTingLee = WinTingLee;
    }());