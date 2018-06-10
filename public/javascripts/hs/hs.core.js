
this.HS = this.HS || {};

(function(){
    let socket;
    let battleField;
    let stage;
    let playerId;
    
    function Core(){
        return {
            start: start
        };
    }

    function start(){
        socket = io('http://localhost:3001');

        socket.on('match', function (data) {
            handleAction(data);
        });
        
        stage = new createjs.Stage("battlefield");
        stage.enableMouseOver(10);
        
        battleField = new HS.BattleField();
        battleField.x = HS.Global.battleFieldX;
        battleField.y = HS.Global.battleFieldY;
        stage.addChild(battleField);

        createjs.Ticker.addEventListener("tick", handleTick);
        createjs.Ticker.setFPS(60);

        fpsLabel = new createjs.Text("-- fps", "bold 18px Arial", "#0F0");
        stage.addChild(fpsLabel);
        fpsLabel.x = 10;
        fpsLabel.y = 10;
    };

    HS.Core = Core;

    function handleTick(event) {
        stage.update();
        fpsLabel.text = Math.round(createjs.Ticker.getMeasuredFPS()) + " fps";
        if (!event.paused) {
            // Actions carried out when the Ticker is not paused.
        }
    }

    function handleAction(action){
        console.log(action);
        switch(action.type){
        case HS.Action.setting:
            handleSetting(action);
            break;
        case HS.Action.drainage:
            handleDrainage(action);
            break;
        }
    }

    function handleSetting(action){
        playerId = action.player;
    }
    let count = 0;
    function handleDrainage(action){

        if(playerId === action.player){
            let card = new HS.Card(count++ , HS.Global.Source.getResult("CardBack"));
            battleField.selfHandArea.addCard(card); 
            card.onmoving = function(event){
                if(HS.Method.isSelfBattleArea(event.stageX , event.stageY)){
                    battleField.selfBattleArea.relocate(card.getStageX());
                }else{
                    battleField.selfBattleArea.relocate();
                }
            };
            card.onmoved = (function(event){
                if(HS.Method.isSelfBattleArea(event.stageX , event.stageY)){
                    handleDiscard(card);
                }
            });
        }
            
    }

    function handleDiscard(card){
        console.log({type:HS.Action.discard ,msg:"出牌" , obj:card.information});
        battleField.selfBattleArea.addCard(card);
        battleField.selfHandArea.removeCard(card); 
        card.moveable = false;
        socket.emit('match', {type:HS.Action.discard ,msg:"出牌" , obj:card.information});
    }

}());

function extend(child, supertype)
{
   child.prototype.__proto__ = supertype.prototype;
}

(function(){

    HS.Action = {
        setting: 0,
        drainage: 1,
        discard: 2,
    };

}());