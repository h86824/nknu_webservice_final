
this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};

(function(){
    function TinLee(id){
        HS.Card.call(this , id , "CardSticker");
        
    }

    TinLee.prototype = {
        getBattleCryImg: function(){
            return HS.Global.Source.getResult("BattleCryWinTingLee");
        },
        battleCry: function(){
            HS.BGM.play("bell");
        },
        afterBattleCry:function(){
            HS.BGM.play("angels");
        },
    }

    extend(TinLee , HS.Card);

    HS.Card.TinLee = TinLee;
}());
