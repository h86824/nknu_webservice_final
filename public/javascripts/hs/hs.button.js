
this.HS = this.HS || {};

(function(){
    let color = "#3949AB";
    let colorPress = "#3F51B5";

    function Button(content){
        createjs.Container.call(this);
        
        this.background = new createjs.Shape();
        this.background.graphics.beginFill(color).drawRoundRect(0, 0, HS.Global.buttonWidth, HS.Global.buttonHeight , 10);
        
        let text = new createjs.Text(content, HS.Global.TextFont, "#fff");
        text.set({
            textAlign: "center",
            x:HS.Global.buttonWidth / 2 * 1.05,
            y:HS.Global.buttonHeight / 2 * 0.6
        });
        this.textOutLine = new createjs.Text(content, HS.Global.TextFont, "#616161");
        this.textOutLine.set({
            textAlign: "center",
            x:HS.Global.buttonWidth / 2 * 1.05,
            y:HS.Global.buttonHeight / 2 * 0.6,
            outline:HS.Global.outline,
        });

        this.addChild(this.background);
        this.addChild(this.textOutLine);
        this.addChild(text);

        this.on("mousedown" , () => {
            if(this.enable)
                this.background.graphics.clear().beginFill(colorPress).drawRoundRect(0, 0, HS.Global.buttonWidth, HS.Global.buttonHeight , 10);
        });
        this.on("click" , () => {
            if(this.enable){
                HS.BGM.buttonClick();
                this.background.graphics.clear().beginFill(color).drawRoundRect(0, 0, HS.Global.buttonWidth, HS.Global.buttonHeight , 10);
                if(this._onclick)
                    this._onclick();
            }
                
        });
        this.on("mouseout" , () => {
            if(this.enable)
                this.background.graphics.clear().beginFill(color).drawRoundRect(0, 0, HS.Global.buttonWidth, HS.Global.buttonHeight , 10);
        });
        this.enable = true;
        this.onclick = (cb) => {
            this._onclick = cb;
        };
    }

    Button.prototype = {
        set enable(value){
            this._enable = value;
            if(value){
                this.textOutLine.color = "#20120c";
                this.background.graphics.clear().beginFill(color).drawRoundRect(0, 0, HS.Global.buttonWidth, HS.Global.buttonHeight , 10);
            }else{
                this.textOutLine.color = "#616161";
                this.background.graphics.clear().beginFill(colorPress).drawRoundRect(0, 0, HS.Global.buttonWidth, HS.Global.buttonHeight , 10);
            }
        },
        get enable(){
            return this._enable;
        }
    }

    extend(Button , createjs.Container);
    this.HS.Button = Button;
}());