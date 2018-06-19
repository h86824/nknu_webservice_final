
this.HS = this.HS || {};

(function(){

    function ArrowsManager(){
        let color = "#B71C1C";

        let arrowLine = new createjs.Shape();
        arrowLine.dash = arrowLine.graphics.sd([2,10], 0).command;
        arrowLine.graphics.ss(6,"round").s(color);
        arrowLine.start = arrowLine.graphics.mt(0,0).command;
        arrowLine.end = arrowLine.graphics.lt(100,100).command;

        let arrowHead = new createjs.Shape().set({rotation: 45});
        arrowHead.graphics.f(color).drawPolyStar(0,0,20,3);
        
        let stage;

        this.handle = (istage , battleField) => {
            stage = istage;
            let isDragging;

            stage.on("mousedown" , (event) =>{
                let item = event.target.parent;
                if(item instanceof HS.Card && item.active && item.assignable){
                    showArrow(item.getStageX() + HS.Global.cardWidth * 0.55 , item.getStageY() + HS.Global.cardHeight * 0.55);
                    isDragging = item;
                }

            });

            stage.on("pressmove" , (event) => {
                let item = event.target.parent;
                if(isDragging){
                    moveArrow(event.stageX , event.stageY);
                }
                else if(item instanceof HS.Card && item.active && item.assignable){
                    showArrow(item.getStageX() + HS.Global.cardWidth * 0.55 , item.getStageY() + HS.Global.cardHeight * 0.55);
                    isDragging = item;
                }

            });

            stage.on("pressup" , (event) => {
                if(isDragging){
                    removeArrow(event.stageX , event.stageY);
                    isDragging = null;
                    let target = battleField.findCard( arrowHead);
                    if(target){
                        this._onassign(isDragging , target);
                    }
                }
            });

            stage.on("mousemove" , (event) => {
                if(isDragging){
                    moveArrow(event.stageX , event.stageY);
                }
            });

            stage.on("click" , (event) => {
                if(isDragging){
                    removeArrow(event.stageX , event.stageY);
                    isDragging = null;
                    let target = battleField.findCard( arrowHead);
                    if(target){
                        this._onassign(isDragging , target);
                    }
                }
            });

            createjs.Ticker.on("tick", () => {
                if(isDragging){
                    arrowLine.dash.offset++;
                }
            });

            this.setArrow = (target) =>{
                isDragging = target;
            }
        }

        let showArrow = (x , y) => {
            arrowLine.start.x = arrowLine.end.x = x;
            arrowLine.start.y = arrowLine.end.y = y;
            moveArrow(x , y);
            stage.addChild(arrowLine,arrowHead);
        }

        let moveArrow = ( x , y ) => {
            arrowHead.x = arrowLine.end.x = x;
            arrowHead.y = arrowLine.end.y = y;
            
            let difX = arrowLine.end.x - arrowLine.start.x;
            let difY = arrowLine.end.y - arrowLine.start.y;
            arrowHead.rotation = Math.atan2(difY, difX) * 180/Math.PI;
        }

        let removeArrow = () => {
            stage.removeChild(arrowLine, arrowHead);
        }

        this.onassign = (assign) => {
            this._onassign = assign;
        }

    }

    HS.ArrowsManager = ArrowsManager;
}())