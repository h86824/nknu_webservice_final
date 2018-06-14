
this.HS = this.HS || {};

(function(){

    function Button(){
        createjs.Container.call(this);
        
        let background = new createjs.Shape();
        background.graphics.beginFill("#ff0000").drawRoundRect(0, 0, 100, 100);
    }

    extend(BattleField , createjs.Container);
    this.HS.Button = Button;
}());