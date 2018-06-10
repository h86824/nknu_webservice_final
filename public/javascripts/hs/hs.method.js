
this.HS = this.HS || {};

(function(){
    function Method(){
        return {
            isSelfBattleArea:isSelfBattleArea
        }
    };

    function isSelfBattleArea(x , y){
        return HS.Global.selfBattleAreaY < y 
            && HS.Global.selfHandAreaY > y 
            && HS.Global.battleFieldX < x 
            && HS.Global.width > x;
    }

    HS.Method = Method();
}())