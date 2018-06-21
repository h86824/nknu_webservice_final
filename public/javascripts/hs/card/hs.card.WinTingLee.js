this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function WinTingLee(id){
        HS.Card.call(this , id , 'CardWinTingLee' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    WinTingLee.prototype = {
        getBattleCryImage: function(){
            return HS.Global.Source.getResult("BattleCryWinTingLee");
        },
        battleCry: function(){
            HS.BGM.play("bell");
        },
        afterBattleCry:function(){
            HS.BGM.play("angels");
        },
    }
    extend(WinTingLee , HS.Card);

        HS.Card.WinTingLee = WinTingLee;
    }());