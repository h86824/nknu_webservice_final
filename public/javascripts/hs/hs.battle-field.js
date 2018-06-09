
this.HS = this.HS || {};

(function(){
    let stage;
    let background;

    function BattleField(){
        createjs.Container.call(this);
        
        let graphics = new createjs.Graphics().beginFill("#B39DDB").drawRect(0, 0, HS.Global.battleFieldWidth , HS.Global.battleFieldHeight);
        let background = new createjs.Shape(graphics);

        //this.addChild(background);
        this.opponentHandArea = new HS.HandArea();
        this.opponentHandArea.x = 0;
        this.opponentHandArea.y = HS.Global.opponentHandAreaY;
        this.addChild(this.opponentHandArea);

        this.selfHandArea = new HS.HandArea();
        this.selfHandArea.x = 0;
        this.selfHandArea.y = HS.Global.selfHandAreaY;
        this.addChild(this.selfHandArea);
    }

    BattleField.prototype = {
        opponentHandArea: undefined,
        selfHandArea: undefined
    }

    extend(BattleField , createjs.Container);
    this.HS.BattleField = BattleField;
}());