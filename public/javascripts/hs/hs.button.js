
this.HS = this.HS || {};

(function(){

    function Button(content){
        createjs.Container.call(this);
        
        let background = new createjs.Shape();
        background.graphics.beginFill("#2E7D32").drawRoundRect(0, 0, HS.Global.buttonWidth, HS.Global.buttonHeight , 10);
        
        let text = new createjs.Text(content, HS.Global.TextFont, "#fff");
        text.set({
            textAlign: "center",
            x:HS.Global.buttonWidth / 2 * 1.05,
            y:HS.Global.buttonHeight / 2 * 0.6
        });
        let textOutLine = new createjs.Text(content, HS.Global.TextFont, "#20120c");
        textOutLine.set({
            textAlign: "center",
            x:HS.Global.buttonWidth / 2 * 1.05,
            y:HS.Global.buttonHeight / 2 * 0.6,
            outline:HS.Global.outline,
        });

        this.addChild(background);
        this.addChild(textOutLine);
        this.addChild(text);

        this.on("mousedown" , () => {
            background.graphics.beginFill("#388E3C").drawRoundRect(0, 0, HS.Global.buttonWidth, HS.Global.buttonHeight , 10);
        });
        this.on("click" , () => {
            background.graphics.beginFill("#2E7D32").drawRoundRect(0, 0, HS.Global.buttonWidth, HS.Global.buttonHeight , 10);
        });
        this.on("mouseout" , () => {
            background.graphics.beginFill("#2E7D32").drawRoundRect(0, 0, HS.Global.buttonWidth, HS.Global.buttonHeight , 10);
        });
    }

    extend(Button , createjs.Container);
    this.HS.Button = Button;
}());