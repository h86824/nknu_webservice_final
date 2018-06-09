
this.HS = this.HS || {};

(function(){
    let socket;
    let battleField;
    let stage;
    
    function Core(){
        return {
            start: start
        };
    }

    function start(){
        socket = io('http://localhost:3001');

        socket.on('news', function (data) {
            console.log(data);
            socket.emit('my other event', { my: 'data' });
        });
        
        stage = new createjs.Stage("battlefield");
        stage.enableMouseOver(10);
        
        battleField = new HS.BattleField();
        battleField.x = HS.Global.battleFieldX;
        battleField.y = HS.Global.battleFieldY;
        stage.addChild(battleField);

        for(let i = 0 ; i < 10 ; i++){
            card = new HS.Card(i , HS.Global.Source.getResult("CardBack"));
            battleField.selfHandArea.addCard(card);
        }

        for(let i = 0 ; i < 10 ; i++){
            card = new HS.Card(i , HS.Global.Source.getResult("CardBack"));
            card.moveable = false;
            battleField.opponentHandArea.addCard(card);
        }
        
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
}());

function extend(child, supertype)
{
   child.prototype.__proto__ = supertype.prototype;
}
