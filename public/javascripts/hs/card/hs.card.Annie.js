this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function Annie(id){
        HS.Card.call(this , id , 'CardAnnie' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    Annie.prototype = {
        
    }
    extend(Annie , HS.Card);

        HS.Card.Annie = Annie;
    }());