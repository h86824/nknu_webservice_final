
this.HS = this.HS || {};

(function(){
    function Card(id , image){
        createjs.Shape.call(this);
        this.information.id = id;
        if(image){
            this.graphics.beginBitmapFill(image, null, true, false).drawRect(0,0, image.width, image.height).endFill();
        }else{
            this.graphics.beginFill("#1565C0").drawRoundRect(0 , 0 , HS.Global.cardWidth , HS.Global.cardHeight , 2);
        }

        this.scaleX = HS.Global.cardWidth / image.width;
        this.scaleY = HS.Global.cardHeight / image.height;

        this.on("rollover" , (e) => { if(this.moveable) mouseOver(e) });
        this.on("rollout" , (e) => { if(this.moveable) mouseOut(e) });
        this.on("pressmove", (e) => { if(this.moveable) pressMove(e) });
        this.on("pressup", (e) => { if(this.moveable) pressUp(e) });
        this.on("mousedown" , (e) => { if(this.moveable) pressDown(e) });
        this.snapToPixel = true;
        this.cache(0, 0, image.width, image.height);
    }

    Card.prototype = {
        moveable: true,
        onmove: undefined,
        fixX:0,
        fixY:0,
        information: {}
    }

    function pressMove( event ){
        let offsetX = getParent(event.target , "x");

        event.currentTarget.set({
            x: event.stageX - offsetX - HS.Global.cardWidth / 2,
            y: event.stageY - event.target.parent.y - HS.Global.cardHeight / 2
        });
    }

    function pressUp( event ){
        
        event.currentTarget.set({
            x: event.currentTarget.fixX,
            y: event.currentTarget.fixY
        });

        if(event.target.onmove){
            event.target.onmove( event );
        }
    }

    function pressDown( event ) {
        event.currentTarget.fixX = event.currentTarget.x;
        event.currentTarget.fixY = event.currentTarget.y;
    }

    function getParent(item , property){
        if(!item.parent){
            return 0;
        }
        return item.parent[property] + getParent(item.parent , property);
    }

    function mouseOver(event){
        event.currentTarget.scaleX = event.currentTarget.scaleX * 1.045;
        event.currentTarget.scaleY = event.currentTarget.scaleY * 1.045;
    }

    function mouseOut(event){
        event.currentTarget.scaleX = event.currentTarget.scaleX * (1/1.045);
        event.currentTarget.scaleY = event.currentTarget.scaleY * (1/1.045);
    }

    extend(Card , createjs.Shape);
    HS.Card = Card;
}());