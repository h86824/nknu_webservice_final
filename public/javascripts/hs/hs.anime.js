
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
                x: from.x,
                y: offset.y * 0.5
            } , 100).to({
                x: offset.x ,
                y: offset.y
            } , 50).call( HS.BGM.attack )
            .to({
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

        this.itemAttack = (from , to , item , cb) => {
            item = new HS.ImagePackage(item);
            if(!from instanceof HS.Card){
                throw new HS.Error.TypeError("attacker" , "HS.Card");
            }
            if(!to instanceof HS.Card){
                throw new HS.Error.TypeError("defensor" , "HS.Card");
            }
            let fromTp = from.localToGlobal(0 , 0);
            let toTp = to.localToGlobal(0 , 0);
            item.set({
                x: fromTp.x + HS.Global.cardWidth / 4,
                y: fromTp.y + HS.Global.cardHeight / 4
            })
            item.visibel = true;
            from.stage.addChild(item);
            let distanceX = fromTp.x - toTp.x;
            let distanceY = fromTp.y - toTp.y;

            let offset = {x: -distanceX + fromTp.x , y:  - distanceY + fromTp.y};

            createjs.Tween.get(item, {override:true}).to({
                x: offset.x + HS.Global.cardWidth / 4,
                y: offset.y + HS.Global.cardHeight / 4
            } , 300).wait(150).call(() => {
                HS.BGM.play("explosion");
                item.stage.removeChild(item);
            }).call(cb);
        }
    }

    HS.Anime = new Anime();
}())