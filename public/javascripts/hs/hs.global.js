
this.HS = this.HS || {};

(function(){
    function Global(w , h){
        let width = w;
        let height = h;
        
        const cardWidth = width * 0.09;
        const cardHeight = height * 0.21;

        const percentBattleFieldWidth = 1;
        const percentBattleFieldHeight = 1;

        const percentHandArea = 0.45;
        const percentBattleArea = 0.55;

        const maxHandCard = 10;

        const battleFieldX = parseInt( width * ( 1 - percentBattleFieldWidth) );
        const battleFieldY = parseInt( height * ( 1 - percentBattleFieldHeight) );
        const battleFieldWidth = parseInt( width * percentBattleFieldWidth);
        const battleFieldHeight = parseInt( height * percentBattleFieldHeight);

        return {
            resize : function(w , h){
                HS.Global = Global(w,h);
                console.log(HS.Global);
            },

            focusing: undefined,
            
            width: width,
            height: height,

            battleFieldX: battleFieldX,
            battleFieldWidth: battleFieldWidth,

            battleFieldY: battleFieldY ,
            battleFieldHeight: battleFieldHeight,
            
            cardWidth: cardWidth,
            cardHeight: cardHeight,

            TextFontSmall: 100 * (width / 1920) + "% Arial",
            TextFont: 160 * (width / 1920) + "% Arial",
            TextFontLarge: 180 * (width / 1920) + "% Arial",
            outline: 5 * (width / 1920),
            cardCostTextX: cardWidth * 0.15, 
            cardCostTextY: cardHeight * 0.115,
            cardAtkTextX: cardWidth * 0.15,
            cardAtkTextY: cardHeight * 0.89,
            cardDefTextX: cardWidth * 0.87,
            cardDefTextY: cardHeight * 0.89,
            cardNameTextX: cardWidth * 0.58,
            cardNameTextY: cardHeight * 0.55,
            cardNameScale: width / 1920,
            ellipseStickerX: 0,
            ellipseStickerY: 0,
            ellipseStickerW: cardWidth * (1920 / width) ,
            ellipseStickerH: cardHeight * (1920 / width) ,
            
            
            handCardDistance: parseInt( battleFieldWidth / 11.5) ,

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

    HS.Global = Global(1920,1080);
}());