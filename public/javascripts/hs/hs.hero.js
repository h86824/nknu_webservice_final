
this.HS = this.HS || {};

(function(){
    function Hero(){
        this._hp = 0;
        this.cristalList = [];
        createjs.Container.call(this);

        let template = new createjs.Shape();
        templateImage = HS.Global.Source.getResult("HeroTemplate");
        template.graphics.beginBitmapFill(templateImage, "no-repeat", true, false)
        .drawRect(0, 0, templateImage.width, templateImage.height);
        template.scaleY = template.scaleX = HS.Global.handCardDistance * 1.5 / templateImage.width;
        
        this.addChild(template);

        createjs.Ticker.addEventListener("tick", (event) => {
            if(!event.paused && this.cristalList.length){
                this.cristalList.forEach(cristal => {
                    cristal.rotation += 1 * (60 / createjs.Ticker.getMeasuredFPS());
                });
            }
        });

        this.hpText = new createjs.Text("HP: ", HS.Global.TextFont, "#E57373");
        this.hpText.set({
            textAlign:"left",
            x: HS.Global.handCardDistance * 0.55,
            y: HS.Global.handCardDistance * 0.50,
            outline:false,
        });
        this.hpTextOutLine = new createjs.Text("HP: ", HS.Global.TextFont, "#B71C1C");
        this.hpTextOutLine.set({
            textAlign:"left",
            x: HS.Global.handCardDistance * 0.55,
            y: HS.Global.handCardDistance * 0.50,
            outline:HS.Global.outline - 1,
        });

        this.mpText = new createjs.Text("MP: ", HS.Global.TextFont, "#64B5F6");
        this.mpText.set({
            textAlign:"left",
            x: HS.Global.handCardDistance * 0.55,
            y: HS.Global.handCardDistance * 0.70,
            outline:false,
        });
        this.mpTextOutLine = new createjs.Text("MP: ", HS.Global.TextFont, "#0D47A1");
        this.mpTextOutLine.set({
            textAlign:"left",
            x: HS.Global.handCardDistance * 0.55,
            y: HS.Global.handCardDistance * 0.70,
            outline:HS.Global.outline - 1,
        });

        this.rcText = new createjs.Text("RC: ", HS.Global.TextFont, "#8D6E63");
        this.rcText.set({
            textAlign:"left",
            x: HS.Global.handCardDistance * 0.55,
            y: HS.Global.handCardDistance * 0.90,
            outline:false,
        });
        this.rcTextOutLine = new createjs.Text("RC: ", HS.Global.TextFont, "#0D47A1");
        this.rcTextOutLine.set({
            textAlign:"left",
            x: HS.Global.handCardDistance * 0.55,
            y: HS.Global.handCardDistance * 0.90,
            outline:HS.Global.outline - 1,
        });

        this.addChild(this.hpTextOutLine);
        this.addChild(this.hpText);
        this.addChild(this.mpTextOutLine);
        this.addChild(this.mpText);
        this.addChild(this.rcTextOutLine);
        this.addChild(this.rcText);
        this.cristal = 0;
        this.hp = 40;
    }

    Hero.prototype = {
        set hp(value){
            this._hp = value;
            this.hpTextOutLine.text = this.hpText.text = "HP: " + value;
        },
        set cristal(value){
            this._crystal = value;
            this.cristalList.forEach(cristal => {
                this.removeChild(cristal);
            })
            this.cristalList = [];
            this.mpTextOutLine.text = this.mpText.text = "MP: " + value;
            let centerX = HS.Global.handCardDistance * 1.5 / 2;
            let centerY = HS.Global.handCardDistance * 1.5 / 2;

            let rotation = 360 / value;
            for(let i = 0 ; i < value ; i++){
                let cristal = new createjs.Shape();
                cristal.graphics.beginFill("#0288D1").drawPolyStar(HS.Global.handCardDistance, HS.Global.handCardDistance, HS.Global.handCardDistance /4, 9, 0.3, 0);
                cristal.scaleX = 0.42;
                cristal.scaleY = 0.42;
                cristal.x = centerX;
                cristal.y = centerY;
                cristal.rotation = rotation * i;
                this.cristalList.push(cristal);
                this.addChild(cristal);
            }
            
        },
        get crystal(){
            return this._crystal;
        },
        set rc(value){
            this._rc = value;
            this.rcTextOutLine.text = this.rcText.text = "RC: " + value;
        },
    }
    
    extend(Hero , createjs.Container);
    HS.Hero = Hero;
}());