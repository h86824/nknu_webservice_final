this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function Poo(id){
        HS.Card.call(this , id , 'CardPoo' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    Poo.prototype = {
        battleCry: function(){
            HS.BGM.play("bell");
        },
        getBattleCryImage: function(){
            return HS.Global.Source.getResult("BattleCryWinTingLee");
        },
        afterBattleCry:function(){
            HS.BGM.play("angels");
        },
    }
    extend(Poo , HS.Card);

        HS.Card.Poo = Poo;
    }());