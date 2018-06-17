
this.HS = this.HS || {};

(function(){
    let stage;
    let backgroundContainer;

    function BattleField(){
        createjs.Container.call(this);
        
        backgroundContainer = new createjs.Container();
        this.addChild(backgroundContainer);
        setBackground();
        
        this.opponentHandArea = new HS.HandArea();
        this.opponentHandArea.alpha = 1;
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

        this.opponentHandArea.alpha = this.selfHandArea.alpha = 0.98;
        this.selfBattleArea.alpha = this.opponentBattleArea.alpha = 0.95;

        this.opponentHero = new HS.Hero();
        this.opponentHandArea.hero = this.opponentHero ;
        /*this.opponentHero.x = HS.Global.handCardDistance * 5;
        this.opponentHero.y = 0;
        this.addChild(this.opponentHero);*/

        this.selfHero = new HS.Hero();
        this.selfHandArea.hero = this.selfHero ;
        /*this.selfHero.x = HS.Global.handCardDistance * 5;
        this.selfHero.y = HS.Global.selfHandAreaY;
        this.addChild(this.selfHero);*/

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
                let pt = target.localToLocal( 0 , 0 , this.selfBattleArea.cards[i] );
                if( this.opponentBattleArea.cards[i].hitTest(pt.x , pt.y) )
                    return this.opponentBattleArea.cards[i];
            }
            let pt = target.localToLocal( 0 , 0 , this.opponentHero );
            if(this.opponentHero.hitTest(pt.x , pt.y)){
                return this.opponentHero;
            }
            pt = target.localToLocal( 0 , 0 , this.selfHero );
            if(this.selfHero.hitTest(pt.x , pt.y)){
                return this.selfHero;
            }
        }
    }

    function setBackground(){
        let backgroundImg = HS.Global.Source.getResult("Background");
        let background1_1 = new createjs.Shape(); 
        background1_1.graphics.beginBitmapFill(backgroundImg, null, true, false).drawRect(0,0, backgroundImg.width, backgroundImg.height).endFill();
        //background.template.scaleX = HS.Global.cardWidth / templateImg.width;
        background1_1.x = backgroundImg.width / 2;
        background1_1.scaleY = background1_1.scaleX = HS.Global.width * 0.33 / backgroundImg.width;
        background1_1.snapToPixel = true;
        background1_1.cache(0,0, backgroundImg.width, backgroundImg.height);
        background1_1.y = backgroundImg.height / 2;
        background1_1.regX = backgroundImg.width / 2;
        background1_1.regY = backgroundImg.height / 2;

        let background1_2 = background1_1.clone();
        background1_2.x = HS.Global.width - backgroundImg.width/2;
        background1_2.y = HS.Global.height - backgroundImg.height/2;
        
        backgroundImg = HS.Global.Source.getResult("Background2");
        let background2_1 = new createjs.Shape(); 
        background2_1.graphics.beginBitmapFill(backgroundImg, null, true, false).drawRect(0,0, backgroundImg.width, backgroundImg.height).endFill();
        background2_1.x = backgroundImg.width / 2;
        background2_1.scaleY = background2_1.scaleX = HS.Global.width * 0.25 / backgroundImg.width;
        background2_1.snapToPixel = true;
        background2_1.cache(0,0, backgroundImg.width, backgroundImg.height);
        background2_1.x = HS.Global.width * 0.6;
        background2_1.y = backgroundImg.height / 2.5;
        background2_1.regX = backgroundImg.width / 2;
        background2_1.regY = backgroundImg.height / 2;

        let background2_2 = background2_1.clone();
        background2_2.x = HS.Global.width * 0.4;
        background2_2.y = HS.Global.height - backgroundImg.height/2;

        backgroundImg = HS.Global.Source.getResult("Background3");
        let background3_1 = new createjs.Shape(); 
        background3_1.graphics.beginBitmapFill(backgroundImg, null, true, false).drawRect(0,0, backgroundImg.width, backgroundImg.height).endFill();
        background3_1.x = backgroundImg.width / 2;
        background3_1.scaleY = background3_1.scaleX = HS.Global.width * 0.25 / backgroundImg.width;
        background3_1.snapToPixel = true;
        background3_1.cache(0,0, backgroundImg.width, backgroundImg.height);
        background3_1.x = HS.Global.width;
        background3_1.y = backgroundImg.height / 2;
        background3_1.regX = backgroundImg.width / 2;
        background3_1.regY = backgroundImg.height / 2;

        let background3_2 = background3_1.clone();
        background3_2.x = 0;
        background3_2.y = HS.Global.height * 0.85;
        
        backgroundContainer.addChild(background1_1);
        backgroundContainer.addChild(background1_2);
        backgroundContainer.addChild(background2_1);
        backgroundContainer.addChild(background2_2);
        backgroundContainer.addChild(background3_1);
        backgroundContainer.addChild(background3_2);

        createjs.Ticker.addEventListener("tick", () => {
            background1_1.rotation -= 0.05;
            background1_2.rotation -= 0.05;
            background2_1.rotation += 0.04;
            background2_2.rotation += 0.04;
            background3_1.rotation -= 0.04;
            background3_2.rotation -= 0.04;
        });
    }

    BattleField.prototype = {
        opponentHandArea: undefined,
        selfHandArea: undefined,
        findCard:undefined,
    }

    extend(BattleField , createjs.Container);
    HS.BattleField = BattleField;
}());