this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function Justin(id){
        HS.Card.call(this , id , 'CardJustin' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    Justin.prototype = {
        
    }
    extend(Justin , HS.Card);

        HS.Card.Justin = Justin;
    }());