
this.HS = this.HS || {};

(function(){
    createjs.MotionGuidePlugin.install();
    function Anime(){
        this.attack = ( from , to , cb ) => {
            if(!from instanceof HS.Card){
                throw new HS.Error.TypeError("attacker" , "HS.Card");
            }
            if(!to instanceof HS.Card){
                throw new HS.Error.TypeError("defensor" , "HS.Card");
            }
            let fromTp = from.localToGlobal(from.x , from.y);
            let toTp = to.localToGlobal(to.x , to.y);

            let distanceX = fromTp.x - toTp.x;
            let distanceY = fromTp.y - toTp.y;

            let offset = from.globalToLocal( -distanceX + fromTp.x ,  - distanceY + fromTp.y);
            
            from.toTop();
            createjs.Tween.get(from, {override:true}).to({
                x: offset.x - ( offset.x - from.x * 0.5  ) ,
                y: offset.y * 0.5
            } , 100).to({
                x: offset.x ,
                y: offset.y
            } , 50).to({
                x: from.x ,
                y: from.y
            } , 150).call(cb);
        }

        this.disappear = ( target , cb ) => {
            if(!target instanceof HS.Card){
                throw new HS.Error.TypeError("attacker" , "HS.Card");
            }
            
            createjs.Tween.get(target, {override:true}).to({
                alpha:0
            } , 300).call(cb);
        }

        this.appear = ( target , cb ) => {
            if(!target instanceof HS.Card){
                throw new HS.Error.TypeError("attacker" , "HS.Card");
            }
            
            createjs.Tween.get(target, {override:true}).to({
                alpha:1
            } , 700).call(cb);
        }
    }

    HS.Anime = new Anime();
}())