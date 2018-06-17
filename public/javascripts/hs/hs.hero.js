
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
                    cristal.rotation += 2;
                });
            }
        });

        this.hpText = new createjs.Text("HP: ", HS.Global.TextFont, "#E57373");
        this.hpText.set({
            textAlign:"left",
            x: HS.Global.handCardDistance * 0.55,
            y: HS.Global.handCardDistance * 0.55,
            outline:false,
        });
        this.hpTextOutLine = new createjs.Text("HP: ", HS.Global.TextFont, "#B71C1C");
        this.hpTextOutLine.set({
            textAlign:"left",
            x: HS.Global.handCardDistance * 0.55,
            y: HS.Global.handCardDistance * 0.55,
            outline:HS.Global.outline - 1,
        });

        this.mpText = new createjs.Text("MP: ", HS.Global.TextFont, "#64B5F6");
        this.mpText.set({
            textAlign:"left",
            x: HS.Global.handCardDistance * 0.55,
            y: HS.Global.handCardDistance * 0.8,
            outline:false,
        });
        this.mpTextOutLine = new createjs.Text("MP: ", HS.Global.TextFont, "#0D47A1");
        this.mpTextOutLine.set({
            textAlign:"left",
            x: HS.Global.handCardDistance * 0.55,
            y: HS.Global.handCardDistance * 0.8,
            outline:HS.Global.outline - 1,
        });

        this.addChild(this.hpTextOutLine);
        this.addChild(this.hpText);
        this.addChild(this.mpTextOutLine);
        this.addChild(this.mpText);
        this.cristal = 6;
        this.hp = 40;
    }

    Hero.prototype = {
        set hp(value){
            this._hp = value;
            this.hpTextOutLine.text = this.hpText.text = "HP: " + value;
        },
        set cristal(value){
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
            
        }
    }
    
    extend(Hero , createjs.Container);
    HS.Hero = Hero;
}());