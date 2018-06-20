this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function Jan(id){
        HS.Card.call(this , id , 'CardJan' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    Jan.prototype = {
        
    }
    extend(Jan , HS.Card);

        HS.Card.Jan = Jan;
    }());