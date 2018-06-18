
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
        this.addChild(this.messageOutline);
        this.addChild(this.messageText);
        this.alpha = 0;
        this.false = true;
        
        this.show = (msg) => {
            this.messageText.text = msg;
            this.messageOutline.text = msg;
            this.visible = true;
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
        createjs.Tween.get(_this).to({alpha:1}, 300).wait(1200).to({alpha:0}, 300).call(handleComplete);
    }

    function handleComplete(){
        if(msgQueue.length){
            showMessage(msgQueue[0]);
            msgQueue.splice(0,1);
        }
        runItem = null;
    }

    extend(Alert , createjs.Container);
    extend(MessageBox , createjs.Container);

    HS.AlertBox = new Alert();
    HS.Alert = HS.AlertBox.addMessage;
    HS.MessageBox = new MessageBox();
}());