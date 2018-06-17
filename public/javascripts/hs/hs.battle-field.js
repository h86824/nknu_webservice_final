
this.HS = this.HS || {};

(function(){
    let stage;
    let background;

    function BattleField(){
        createjs.Container.call(this);
        
        let graphics = new createjs.Graphics().beginFill("#B39DDB").drawRect(0, 0, HS.Global.battleFieldWidth , HS.Global.battleFieldHeight);
        let background = new createjs.Shape(graphics);
        
        this.opponentHandArea = new HS.HandArea();
        this.opponentHandArea.x = 0;
        this.opponentHandArea.y = HS.Global.opponentHandAreaY;
        this.addChild(this.opponentHandArea);

        this.opponentBattleArea = new HS.BattleArea();
        this.opponentBattleArea.x = 0;
        this.opponentBattleArea.y = HS.Global.opponentBattleAreaY;
        this.addChild(this.opponentBattleArea);

        this.selfBattleArea = new HS.BattleArea();
        this.selfBattleArea.x = 0;
        this.selfBattleArea.y = HS.Global.selfBattleAreaY;
        this.addChild(this.selfBattleArea);

        this.selfHandArea = new HS.HandArea();
        this.selfHandArea.x = 0;
        this.selfHandArea.y = HS.Global.selfHandAreaY;
        this.addChild(this.selfHandArea);

        this.btn = new HS.Button("結束回合");
        this.btn.x = HS.Global.battleAreaWidth - HS.Global.buttonWidth;
        this.btn.y = HS.Global.selfBattleAreaY - HS.Global.buttonHeight / 2;
        this.addChild(this.btn);

        this.findCard = (target) => {
            //console.log(this.selfBattleArea.cards[i]);
            
            for(let i = 0 ; i < this.selfBattleArea.cards.length ; i++){
                let pt = target.localToLocal( 0 , 0 , this.selfBattleArea.cards[i] );
                if( this.selfBattleArea.cards[i].hitTest(pt.x , pt.y) )
                    return this.selfBattleArea.cards[i];
            }
            for(let i = 0 ; i < this.opponentBattleArea.cards.length ; i++){
                if( this.opponentBattleArea.cards[i].hitTest(x , y) )
                    return this.opponentBattleArea.cards[i];
            }
        }
    }

    BattleField.prototype = {
        opponentHandArea: undefined,
        selfHandArea: undefined,
        findCard:undefined,
    }



    extend(BattleField , createjs.Container);
    this.HS.BattleField = BattleField;
}());