
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
        
        socket.emit("dual" , new HS.Action.Dual());
        socket.emit("match", new HS.Action.Drainage());

        let bgm = new HS.BGM();
        bgm.start();
        socket.on('dual', function (data) {
            handleAction(data);
        });

        socket.on('match', function (data) {
            handleAction(data);
        });
        
        stage = new createjs.Stage("battlefield");
        stage.enableMouseOver(10);

        battleField = new HS.BattleField();
        battleField.x = HS.Global.battleFieldX;
        battleField.y = HS.Global.battleFieldY;
        //stage.addChild(battleField);

        let matchScreen = stage.addChild(new HS.MatchScreen());
        matchScreen.onmatch(() => {
            HS.MessageBox.show("配對中...");
        });

        createjs.Ticker.addEventListener("tick", handleTick);
        createjs.Ticker.setFPS(63);
        createjs.Ticker.framerate = 63;

        fpsLabel = new createjs.Text("-- fps", "bold 18px Arial", "#0F0");
        stage.addChild(fpsLabel);
        fpsLabel.x = 10;
        fpsLabel.y = 10;
        let ts = ["溫聽力大怪獸" , "精英溫聽力" , "溫聽力史萊姆"];
        for(let i = 0 ; i < 10 ; i++){
            let card = new HS.Card.DMYeh(0);
            battleField.selfHandArea.addCard(card); 
            card.cost = i + 1;
            card.moveable = true;
            card.active = true;
           // card.isCardBack = true;
            card.name = ts[i%ts.length];
            card.onmoving = function(event){
                if(HS.Method.isSelfBattleArea(event.stageX , event.stageY)){
                    battleField.selfBattleArea.relocate(card.getStageX());
                }else{
                    battleField.selfBattleArea.relocate();
                }
            };
            card.onmoved = (function(event){
                if(HS.Method.isSelfBattleArea(event.stageX , event.stageY)){
                    handleDiscard(event);
                }
            });
        }


        var arrowsManager = new HS.ArrowsManager();
        arrowsManager.handle(stage , battleField);

        stage.addChild(HS.AlertBox);
        stage.addChild(HS.MessageBox);
    };

    HS.Core = Core;

    function handleTick(event) {
        stage.update();
        fpsLabel.text = Math.round(createjs.Ticker.getMeasuredFPS()) + " fps";
        if (!event.paused) {
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
        case HS.Action.endturn:
            handleEndTurn(action);
            break
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
                    handleDiscard(event);
                }
            });
        }
            
    }

    function handleDiscard(event){
        if(battleField.selfBattleArea.cards.length >= 7){
            battleField.selfBattleArea.relocate();
            return;
        }
        let card = event.currentTarget;
        console.log({type:HS.Action.discard ,msg:"出牌" , obj:card.information});
        
        battleField.selfHandArea.removeCard(card);
        battleField.selfBattleArea.addCard(card , battleField.selfBattleArea.getInsertIndex(event.stageX));
        card.moveable = false;
        card.assignable = true;
        socket.emit('match', {type:HS.Action.discard ,msg:"出牌" , obj:card.information});
    }
    function handleEndTurn(event){
        console.log({type:HS.Action.endturn ,msg:"結束回合"});
        socket.emit('match',{type:HS.Action.endturn ,msg:"結束回合"})
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
        endturn:0
    };

}());