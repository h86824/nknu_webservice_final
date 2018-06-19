
this.HS = this.HS || {};

(function(){
    let socket;
    let battleField;
    let matchScreen;
    let stage;
    let playerId;
    
    function Core(){
        return {
            start: start
        };
    }

    function start(){
        socket = io('http://localhost:3001');
        stage = new createjs.Stage("battlefield");
        stage.enableMouseOver(10);

        let bgm = HS.BGM;
        bgm.start();

        socket.on('match', function (data) {
            handleAction(data);
        });
        
        battleField = new HS.BattleField();
        battleField.x = HS.Global.battleFieldX;
        battleField.y = HS.Global.battleFieldY;
        stage.addChild(battleField);
        battleField.visible = false;
        battleField.onendturn( ()=>{
            socket.emit('match', new HS.Action.EndTurn() );
        } );

        matchScreen = stage.addChild(new HS.MatchScreen());
        
        matchScreen.onmatch(() => {
            bgm.buttonClick();
            socket.emit("dual" , new HS.Action.Dual());
            HS.MessageBox.show("配對中...");
        });
        socket.on('dual', function (data) {
            handleDualAction(data);
        });

        createjs.Ticker.addEventListener("tick", handleTick);
        createjs.Ticker.setFPS(63);
        createjs.Ticker.framerate = 63;

        fpsLabel = new createjs.Text("-- fps", "bold 18px Arial", "#0F0");
        stage.addChild(fpsLabel);
        fpsLabel.x = 10;
        fpsLabel.y = 10;
        /*let ts = ["溫聽力大怪獸" , "精英溫聽力" , "溫聽力史萊姆"];
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
        }*/
        var arrowsManager = new HS.ArrowsManager();
        arrowsManager.handle(stage , battleField);
        arrowsManager.onassign( (from , to) => {
            socket.emit('match', new HS.Action.Attack( from.information.id , to.information.id) );
        });

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

    function handleDualAction(action){
        console.log(action);
        switch(action.type){
        case HS.Action.Type.Setting:
            HS.MessageBox.show("配對成功");
            playerId = action.player;
            matchScreen.visible = false;
            battleField.visible = true;
            HS.MessageBox.hide();
            break;
        }
    }

    function handleAction(action){
        console.log(action);
        HS.Alert( action.msg );
        switch(action.type){
        case HS.Action.Type.Setting:
            handleSetting(action);
            break;
        case HS.Action.Type.Drainage:
            handleDrainage(action);
            break;
        case HS.Action.Type.Endturn:
            handleEndTurn(action);
            break;
        case HS.Action.Type.Discard:
            handleDiscard(action);
            break;
        case HS.Action.Type.Start:
            handleStart(action);
            break
        }
    }

    function handleSetting(action){
        playerId = action.player;
    }

    let count = 0;
    function handleDrainage(action){
        count = action.id;
        if(playerId === action.player){
            if(!action.obj || !action.obj.cards.length){
                return;
            }
            let cardInfo = action.obj.cards[0];
            let card = new HS.Card(cardInfo.cardID);
            card.atk = cardInfo.originAtk;
            card.def = cardInfo.originDef;
            card.cost = cardInfo.cost;
            card.moveable = true;
            card.active = true;
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
                    handleSelfDiscard(event);
                }
            });
            
        }else{
            let card = new HS.Card( -1 );
            card.isCardBack = true;
            battleField.opponentHandArea.addCard(card);
        }

    }

    function handleSelfDiscard(event){
        if(battleField.selfBattleArea.cards.length >= 7){
            battleField.selfBattleArea.relocate();
            return;
        }
        let card = event.currentTarget;
        
        /*battleField.selfHandArea.removeCard(card);
        battleField.selfBattleArea.addCard(card , battleField.selfBattleArea.getInsertIndex(event.stageX));
        card.moveable = false;
        card.assignable = true;*/
        console.log(new HS.Action.PlayCard(card.information.id , battleField.selfBattleArea.getInsertIndex(event.stageX)));
        socket.emit('match', new HS.Action.PlayCard(card.information.id , battleField.selfBattleArea.getInsertIndex(event.stageX)));
    }

    function handleDiscard(action){
        
        if(action.obj){
            let card = action.obj.cards;

            if(action.player == playerId && card){
                let mycard = battleField.findCardWithId(card.cardID);
                battleField.selfHero.cristal = action.obj.crystal;
                if(mycard){
                    battleField.selfHandArea.removeCard(mycard);
                    battleField.selfBattleArea.addCard(mycard , action.obj.position);
                    mycard.cost = card.cost;
                    mycard.atk = card.newAtk;
                    mycard.def = card.newDef;
                    mycard.moveable = false;
                    mycard.assignable = true;
                    mycard.active = card.attackable;
                }
                battleField.selfHandArea.cards.forEach( card => {
                    if(card.cost <= battleField.selfHero.crystal){
                        card.active = true;
                    }else{
                        card.active = false;
                    }
                });
            }else if(action.player != playerId && card){
                let mycard = battleField.findCardWithId( -1 );
                battleField.opponentHandArea.removeCard(mycard);
                battleField.opponentHero.cristal = action.obj.crystal;
                if(mycard){
                    mycard = new HS.Card(card.cardID);
                    mycard.cost = card.cost;
                    mycard.atk = card.newAtk;
                    mycard.def = card.newDef;
                    mycard.moveable = false;
                    mycard.assignable = false;
                    battleField.opponentBattleArea.addCard(mycard , card.position);
                }
            }
        }

    }

    function handleStart(action){
        if(action.player == playerId){
            HS.Alert("你的回合");
            battleField.btn.enable = true;
            battleField.selfHero.cristal = action.obj.crystal;
            battleField.setTimer( () => {
                socket.emit('match', new HS.Action.EndTurn() );
            } , 60);

            battleField.selfHandArea.cards.forEach( card => {
                if(card.cost <= battleField.selfHero.crystal){
                    card.active = true;
                }else{
                    card.active = false;
                }
            });
            battleField.selfBattleArea.cards.forEach( card => {
                card.active = true;
            });
        }else{
            HS.Alert("對方的回合");
            battleField.btn.enable = false;
            battleField.opponentHero.cristal = action.obj.crystal;
            battleField.selfHandArea.cards.forEach( card => {
                card.active = false;
            });
            battleField.selfBattleArea.cards.forEach( card => {
                card.active = false;
            });
        }
    }

    function handleEndTurn(event){
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