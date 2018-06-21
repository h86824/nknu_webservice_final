
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

            TextFontVerySmall: 85 * (width / 1920) + "% Warnock",
            TextFontSmall: 100 * (width / 1920) + "% Warnock",
            TextFont: 160 * (width / 1920) + "% Warnock",
            TextFontLarge: 180 * (width / 1920) + "% Warnock",
            TextFontVeryLarge: 210 * (width / 1920) + "% Warnock",
            TextFontHuge: 400    * (width / 1920) + "% Warnock",
            TextFontVeryHuge: 750 * (width / 1920) + "% Warnock",
            outline: 5 * (width / 1920),
            cardCostTextX: cardWidth * 0.15, 
            cardCostTextY: cardHeight * 0.115,
            cardAtkTextX: cardWidth * 0.15,
            cardAtkTextY: cardHeight * 0.88,
            cardDefTextX: cardWidth * 0.87,
            cardDefTextY: cardHeight * 0.88,
            cardNameTextX: cardWidth * 0.58,
            cardNameTextY: cardHeight * 0.53,
            cardNameScale: width / 1920,
            ellipseStickerX: cardWidth * 0.2,
            ellipseStickerY: cardHeight * 0.07,
            ellipseStickerW: cardWidth * 0.6 ,
            ellipseStickerH: cardHeight * 0.55 ,
            
            handCardDistance: parseInt( battleFieldWidth / 11.5) ,
            battleAreaCardDistance: parseInt( battleFieldWidth / 10) ,

            opponentHandAreaY: parseInt( battleFieldY  ),
            opponentBattleAreaY: parseInt( (percentHandArea / 2) * battleFieldHeight + battleFieldY  ),

            selfBattleAreaY:  parseInt( (percentHandArea / 2 + percentBattleArea / 2) * battleFieldHeight + battleFieldY  ),
            selfHandAreaY:  parseInt( (percentHandArea / 2 + percentBattleArea ) * battleFieldHeight + battleFieldY  ),

            handAreaWidth: battleFieldWidth,
            handAreaHeight: parseInt( height * percentHandArea / 2 ),

            battleAreaWidth: battleFieldWidth,
            battleAreaHeight: parseInt( height * percentBattleArea / 2 ),

            buttonWidth: width * 0.06,
            buttonHeight: width * 0.03,

            alertWidth: width * 0.4,
            alertHeight: height * 0.2,

            deckWidth: width * 0.07,
            deckHeight: height * 0.2,

            rate:  width/1920,
            imagePackageWidth: width * 0.05,
            imagePackageHeight: width * 0.05,
        }
    }

    HS.Global = Global(3840,2160);
}());