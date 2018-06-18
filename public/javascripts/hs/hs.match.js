
this.HS = this.HS || {};

(function(){
    
    function MatchScreen(){

        createjs.Container.call(this);

        let background = new createjs.Shape();
        background.graphics.beginFill("#5C6BC0").drawRect(0, 0, HS.Global.width, HS.Global.height);
        background.alpha = 0.95;

        let matchBackgroundImg = HS.Global.Source.getResult("MatchBackground");
        let matchBackground = new createjs.Shape();
        matchBackground.graphics.beginBitmapFill(matchBackgroundImg).drawRect(0, 0, matchBackgroundImg.width, matchBackgroundImg.height);
        matchBackground.regX = matchBackgroundImg.width / 2;
        matchBackground.regY = matchBackgroundImg.height / 2;
        matchBackground.x = HS.Global.width / 2;
        matchBackground.y = HS.Global.height / 2;
        matchBackground.scaleX = matchBackground.scaleY = HS.Global.width / matchBackgroundImg.width  * 0.5;

        let text = new createjs.Text("Heart Stone", HS.Global.TextFontVeryHuge, "#E8EAF6");
        text.set({
            textAlign: "center",
            x:HS.Global.width * 0.5,
            y:HS.Global.height * 0.1
        });
        let textOutLine = text.clone();
        textOutLine.set({
            textAlign: "center",
            color:"#616161",
            outline:HS.Global.outline + 5,
        });

        let btn = new Button("開始配對");
        btn.x = HS.Global.width / 2 - btn.width / 2;
        btn.y = HS.Global.height * 0.8;
        btn.addEventListener("click" , () => {
            if(this._onmatch)
                this._onmatch();
        })

        this.addChild(matchBackground);
        this.addChild(background);
        this.addChild(textOutLine);
        this.addChild(text);
        this.addChild(btn);

        HS.Alert("歡迎來到心の石的世界");

        createjs.Ticker.addEventListener("tick", (event) => {
            matchBackground.rotation += 0.01;
        });

        this.onmatch = (onmatch) => {
            this._onmatch = onmatch;
        }
    }

    function Button(content){
        createjs.Container.call(this);
        let width = HS.Global.width * 0.3;
        let height = HS.Global.height * 0.1;
        let color = "#3949AB";
        let colorPress = "#3F51B5";
        this.width = width;
        this.height = height;
        this.background = new createjs.Shape();
        this.background.graphics.beginFill(color).drawRoundRect(0, 0, width, height , 10);
        this.background.alpha = 0.8;
        
        let text = new createjs.Text(content, HS.Global.TextFontHuge, "#fff");
        text.set({
            textBaseline: "middle",
            textAlign: "center",
            x:width / 2,
            y:height / 2,
            alpha: 0.8,
        });
        let textOutLine = text.clone();
        textOutLine.set({
            color:"#616161",
            outline:HS.Global.outline + 3,
        });

        this.addChild(this.background);
        this.addChild(this.textOutLine);
        this.addChild(text);

        this.on("mousedown" , () => {
            if(this.enable)
                this.background.graphics.clear().beginFill(colorPress).drawRoundRect(0, 0, width, height , 10);
        });
        this.on("click" , () => {
            if(this.enable){
                this.background.graphics.clear().beginFill(color).drawRoundRect(0, 0, width, height, 10);
            }
        });
        this.on("mouseout" , () => {
            if(this.enable)
                this.background.graphics.clear().beginFill(color).drawRoundRect(0, 0, width, height, 10);
        });
        this.enable = true;
    }
    
    extend(Button , createjs.Container);
    extend(MatchScreen , createjs.Container);
    HS.MatchScreen = MatchScreen;
}());