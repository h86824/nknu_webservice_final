
this.HS = this.HS || {};

(function(){
    function Global(){

        const width = 1920;
        const height = 1080;
        
        const cardWidth = width * 0.08;
        const cardHeight = height * 0.185;

        const percentBattleFieldWidth = 0.9;
        const percentBattleFieldHeight = 1;

        const percentHandArea = 0.4;
        const percentBattleArea = 0.6;

        const maxHandCard = 10;

        const battleFieldX = parseInt( width * ( 1 - percentBattleFieldWidth) );
        const battleFieldY = parseInt( height * ( 1 - percentBattleFieldHeight) );
        const battleFieldWidth = parseInt( width * percentBattleFieldWidth);
        const battleFieldHeight = parseInt( height * percentBattleFieldHeight);

        return {
            width: width,
            height: height,

            battleFieldX: battleFieldX,
            battleFieldWidth: battleFieldWidth,

            battleFieldY: battleFieldY ,
            battleFieldHeight: battleFieldHeight,
            
            cardWidth: cardWidth,
            cardHeight: cardHeight,
            
            handCardDistance: parseInt( battleFieldWidth / 10) ,

            opponentHandAreaY: parseInt( battleFieldY  ),
            opponentBattleAreaY: parseInt( (percentHandArea / 2) * battleFieldHeight + battleFieldY  ),

            selfBattleAreaY:  parseInt( (percentHandArea / 2 + percentBattleArea / 2) * battleFieldHeight + battleFieldY  ),
            selfHandAreaY:  parseInt( (percentHandArea / 2 + percentBattleArea ) * battleFieldHeight + battleFieldY  ),

            handAreaWidth: battleFieldWidth,
            handAreaHeight: parseInt( height * percentHandArea / 2 ),

            battleAreaWidth: battleFieldWidth,
            battleAreaHeight: parseInt( height * percentBattleArea / 2 ),
        }
    }

    HS.Global = Global();
}());