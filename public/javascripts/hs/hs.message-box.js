
this.HS = this.HS || {};

(function(){
    let msgQueue = [];
    let _this;
    let runItem;

    function Alert(){
        createjs.Container.call(this);
        _this = this;
        
        let template1 = new createjs.Shape();
        template1.graphics.beginFill('#1A237E');
        template1.alpha = 1;
        template1.graphics.drawRoundRect(0, 0, HS.Global.alertWidth, HS.Global.alertHeight , 10);
        template1.graphics.endFill();

        let template2 = new createjs.Shape();
        template2.graphics.beginFill('#7986CB');
        template2.alpha = 1;
        template2.graphics.drawRoundRect(HS.Global.alertWidth * 0.01 , HS.Global.alertHeight * 0.02 , HS.Global.alertWidth * 0.98 , HS.Global.alertHeight * 0.96, 10);
        template2.graphics.endFill();

        let centerX = HS.Global.alertWidth / 2;
        let centerY = HS.Global.alertHeight / 2;

        this.messageText = new createjs.Text("", HS.Global.TextFontVeryLarge, "#FFF");
        this.messageText.set({
            textAlign:"center",
            textBaseline: "middle",
            x: centerX,
            y: centerY
        });
        this.messageOutline = new createjs.Text("", HS.Global.TextFontVeryLarge, "#20120c");
        this.messageOutline.set({
            textAlign:"center",
            textBaseline: "middle",
            x: centerX,
            y: centerY,
            outline:HS.Global.outline,
        });

        this.x = HS.Global.width / 2 - HS.Global.alertWidth / 2;
        this.y = HS.Global.height / 2 - HS.Global.alertHeight / 2;

        this.addChild(template1);
        this.addChild(template2);
        this.addChild(this.messageOutline);
        this.addChild(this.messageText);

        this.alpha = 0;
        //createjs.Tween.get(this).to({alpha:1}, 300).wait(1200).to({alpha:0}, 300).call(handleComplete);

        this.addMessage = addMessage;
    }

    function MessageBox(){
        createjs.Container.call(this);

        let template1 = new createjs.Shape();
        template1.graphics.beginFill('#1A237E');
        template1.alpha = 1;
        template1.graphics.drawRoundRect(0, 0, HS.Global.alertWidth, HS.Global.alertHeight , 10);
        template1.graphics.endFill();

        let template2 = new createjs.Shape();
        template2.graphics.beginFill('#7986CB');
        template2.alpha = 1;
        template2.graphics.drawRoundRect(HS.Global.alertWidth * 0.01 , HS.Global.alertHeight * 0.02 , HS.Global.alertWidth * 0.98 , HS.Global.alertHeight * 0.96, 10);
        template2.graphics.endFill();

        let centerX = HS.Global.alertWidth / 2;
        let centerY = HS.Global.alertHeight / 2;

        this.messageText = new createjs.Text("123", HS.Global.TextFontVeryLarge, "#FFF");
        this.messageText.set({
            textAlign:"center",
            textBaseline: "middle",
            x: centerX,
            y: centerY
        });
        this.messageText = new createjs.Container();
        this.messageOutline = new createjs.Text("123", HS.Global.TextFontVeryLarge, "#20120c");
        this.messageOutline.set({
            textAlign:"center",
            textBaseline: "middle",
            x: centerX,
            y: centerY,
            outline:HS.Global.outline,
        });

        this.x = HS.Global.width / 2 - HS.Global.alertWidth / 2;
        this.y = HS.Global.height / 2 - HS.Global.alertHeight / 2;
        this.addChild(template1);
        this.addChild(template2);
        //this.addChild(this.messageOutline);
        this.addChild(this.messageText);
        this.alpha = 0;
        this.false = true;
        this.show = (msg) => {
            this.messageText.removeAllChildren();
            let startX = HS.Global.alertWidth / 2 - HS.Global.alertWidth * 0.05 * (msg.length / 2);
            for(let i = 0 ; i < msg.length ; i++){
                let cardNameTextConatiner = new createjs.Container();

                cardNameTextConatiner.set({
                    x: startX + HS.Global.alertWidth * 0.05 * (i + 0.5),
                    y:HS.Global.alertHeight * 0.5
                });
                let cardNameText = new createjs.Text(msg.charAt(i), HS.Global.TextFontVeryLarge, "#fff");
                cardNameText.set({
                    textAlign:"center",
                    textBaseline:"middle",
                    outline:false,
                });
                let cardNameTextOutline = new createjs.Text(msg.charAt(i), HS.Global.TextFontVeryLarge, "#20120c");
                cardNameTextOutline.set({
                    textAlign:"center",
                    textBaseline:"middle",
                    outline:HS.Global.outline,
                });
                cardNameTextConatiner.addChild(cardNameTextOutline , cardNameText )
                this.messageText.addChild( cardNameTextConatiner );
            }
            let count = 0;
            createjs.Ticker.addEventListener("tick", (event) => {
                count = (count + 5) % 360;
                let temp = count;
                this.messageText.children.forEach( child => {
                    temp = (temp += 30) % 360;
                    let scale = 0.5 + Math.sin( temp * 0.017453293 ) * 0.03;
                    child.y = HS.Global.alertHeight * scale;
                });
            });

            this.visible = true;
            HS.BGM.message();
            createjs.Tween.get(this).to({alpha:0.8}, 300);
        }
        this.hide = () => {
            createjs.Tween.get(this).to({alpha:0 , visible: false}, 300);
        }
    }

    addMessage = ( msg ) => {
        msgQueue.push(msg);
        if(!runItem){
            runItem = setTimeout( () => handleComplete(), 0);
        }

    }

    function showMessage(msg){
        _this.messageText.text = msg;
        _this.messageOutline.text = msg;
        HS.BGM.alert();
        createjs.Tween.get(_this).to({alpha:1}, 300).wait(1200).to({alpha:0}, 300).call(handleComplete);
    }

    function handleComplete(){
        if(msgQueue.length){
            let msg = msgQueue[0];
            msgQueue.splice(0,1);
            showMessage(msg);
        }else{
            runItem = null;
        }
    }

    extend(Alert , createjs.Container);
    extend(MessageBox , createjs.Container);

    HS.AlertBox = new Alert();
    HS.Alert = HS.AlertBox.addMessage;
    HS.MessageBox = new MessageBox();
}());