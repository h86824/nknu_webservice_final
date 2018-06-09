
this.HS = this.HS || {};

(function(){
    function CardChild(){
        HS.Card.call(this , "哈哈");
        
    }

    CardChild.prototype = {

    }

    extend(CardChild , HS.Card);

    HS.CardChild = CardChild;
}());
