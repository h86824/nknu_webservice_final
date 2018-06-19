
this.HS = this.HS || {};

(function(){
    let socket;
    let battleField;
    let matchScreen;
    let stage;
    let playerId;
    var arrowsManager;
    
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

        socket.on('connect', function() {
            HS.MessageBox.hide();
        });

        socket.on("disconnect", function(){
            HS.MessageBox.show("連線中斷");
            playerId = null;
            matchScreen.visible = true;
            battleField.visible = false;
        });

        socket.on('match', function (data) {
            handleAction(data);
        });
        
        battleField = new HS.BattleField();
        battleField.x = HS.Global.battleFieldX;
        battleField.y = HS.Global.battleFieldY;
        stage.addChild(battleField);
        battleField.visible = false;
        battleField.onendturn( ()=>{
            sendEndTurn();
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

        arrowsManager = new HS.ArrowsManager();
        arrowsManager.handle(stage , battleField);
        arrowsManager.onassign( (from , to) => {
            console.log("pass" );
            console.log(new HS.Action.Attack( from.information.id , to.information.id) );
            socket.emit('match', new HS.Action.Attack( from.information.id , to.information.id) );
        });

        stage.addChild(HS.AlertBox);
        stage.addChild(HS.MessageBox);
    };

    HS.Core = Core;

    function handleTick(event) {
        stage.update();
        fpsLabel.text = "測試版 v0.2018061901\n"+
        "解析度 " + HS.Global.width + " x " + HS.Global.height + "\n"
        +Math.round(createjs.Ticker.getMeasuredFPS()) + " fps";
        if (!event.paused) {
        }
    }

    function handleDualAction(action){
        switch(action.type){
        case HS.Action.Type.Setting:
            HS.MessageBox.show("配對成功");
            playerId = action.player;
            matchScreen.visible = false;
            battleField.clear();
            battleField.visible = true;
            HS.MessageBox.hide();
            break;
        case HS.Action.Type.Disconnect:
            HS.Alert("對手離開");
            playerId = null;
            matchScreen.visible = true;
            battleField.visible = false;
            break;
        }
    }

    function handleAction(action){
        console.log(action);
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
            break;
        case HS.Action.Type.Battlefield:
            handleAttack(action);
            break;
        case HS.Action.Type.Hero:
            handleHero(action);
            break;
        }
    }

    function handleSetting(action){
        playerId = action.player;
    }

    let count = 0;
    function handleDrainage(action){
        count = action.id;
        if(playerId === action.player){
            if(!action.obj || !action.obj.cards){
                return;
            }
            HS.Alert("抽牌(" + action.obj.number  +")");
            
            action.obj.cards.forEach( cardInfo => {
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
            })
            battleField.selfHero.rc = action.obj.rc;
            
        }else{
            HS.Alert("對方抽牌(" + action.obj.number  +")");
            for(let i =0 ; i < action.obj.number ; i++){
                let card = new HS.Card( -1 );
                card.isCardBack = true;
                battleField.opponentHandArea.addCard(card);
            }
            battleField.opponentHero.rc = action.obj.rc;
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
            let card = action.obj.card;

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
                sendEndTurn();
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
        console.log({type:HS.Action.endturn ,msg:"結束回合"});
        socket.emit('match',{type:HS.Action.endturn ,msg:"結束回合"})
    }

    function sendEndTurn(){
        socket.emit('match', new HS.Action.EndTurn() );
        battleField.stopTimer();
    }

    function handleAttack(action){
        if(action){
            let from = battleField.findCardWithId( action.from );
            let to = battleField.findCardWithId( action.to );
            if(from && to)
                HS.Anime.attack(from , to , () => {
                    action.obj.cards.forEach( item => {
                        let card = battleField.findCardWithId( item.cardID );
                        if(card){
                            if(item.newDef <= 0){
                                battleField.removeCard(card);
                            }
                        }
                    });
                    action.obj.cards.forEach( item => {
                        let card = battleField.findCardWithId( item.cardID );
                        if(card){
                            card.atk = item.newAtk;
                            card.def = item.newDef;
                            card.cost = item.cost;
                            card.active = item.attackable;
                        }
                    })
                });
        }
    }

    function handleHero(action){
        if(action.player == playerId){
            battleField.selfHero.information.id = action.obj.cardID;
            battleField.selfHero.hp = action.obj.newDef;
        }else if(action.player != playerId) {
            battleField.opponentHero.information.id = action.obj.cardID;
            battleField.opponentHero.hp = action.obj.newDef;
        }
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