
this.HS = this.HS || {};

(function(){

    function Loader(){
        let loadList = [
            "https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.dev.js",
            "https://code.createjs.com/createjs-2015.11.26.min.js",
            /*"/javascripts/hs/hs.core.js",
            "/javascripts/hs/hs.global.js",
            "/javascripts/hs/hs.method.js",
            "/javascripts/hs/hs.match.js",
            "/javascripts/hs/hs.card.js",
            "/javascripts/hs/hs.hero.js",
            "/javascripts/hs/hs.battle-field.js",
            "/javascripts/hs/hs.handArea.js",
            "/javascripts/hs/hs.battle-area.js",
            "/javascripts/hs/hs.button.js",
            "/javascripts/hs/hs.arrows-manager.js",
            "/javascripts/hs/hs.message-box.js",
            "/javascripts/hs/hs.bgm.js",
            
            "/javascripts/hs/action/hs.action.js",
            "/javascripts/hs/action/hs.action.dual.js",

            "/javascripts/hs/card/hs.card.tinlee.js",
            "/javascripts/hs/card/hs.card.cclin.js",
            "/javascripts/hs/card/hs.card.dmyeh.js",
            
            "/javascripts/hs/error/hs.error.type-error.js"*/
        ];

        let onload = function(){};
        let onprogress = function(){};
        let finishedCount = 0;

        function start(){

           /* loadList.forEach( srcUrl => {
                var script = document.createElement('script');
                script.onload = finishCheck;
                script.src = srcUrl;
                document.head.appendChild(script);
            });*/

            loadNext();
    
        }

        function load(onloadCB){
            onload = function(event){ 
                HS.Global.Source = this.queue;
                onloadCB(event)
            };
        };

        function progress(onprogressCB){
            onprogress = onprogressCB;
        }
        
        function loadNext(){
            if(loadList.length){
                let script = document.createElement('script');
                let srcUrl = loadList[0];
                loadList.splice(0 , 1);
                script.onload = loadNext;
                script.src = srcUrl;
                document.head.appendChild(script);
            }
            else if(!loadList.length){

                var queue = new createjs.LoadQueue(true);
                this.queue = queue;
                queue.installPlugin(createjs.Sound);
                queue.on("fileload", handleFileLoad, this);
                queue.on("complete", onload, this);
                queue.on("progress", onprogress, this);

                queue.loadManifest(getManifest());
            }
        }

        return {
            start: start,
            load: load,
            progress:progress
        }
    }

    function onFileLoaded(evt){
        var item = evt.item;
        var type = evt.type;
    }

    function getManifest(){
        var manifest = [
            {src:"/javascripts/hs/hs.core.js"},
            {src:"/javascripts/hs/hs.global.js"},
            {src:"/javascripts/hs/hs.method.js"},
            {src:"/javascripts/hs/hs.match.js"},
            {src:"/javascripts/hs/hs.card.js"},
            {src:"/javascripts/hs/hs.hero.js"},
            {src:"/javascripts/hs/hs.battle-field.js"},
            {src:"/javascripts/hs/hs.handArea.js"},
            {src:"/javascripts/hs/hs.battle-area.js"},
            {src:"/javascripts/hs/hs.button.js"},
            {src:"/javascripts/hs/hs.arrows-manager.js"},
            {src:"/javascripts/hs/hs.message-box.js"},
            {src:"/javascripts/hs/hs.bgm.js"},
            {src:"/javascripts/hs/hs.anime.js"},
            {src:"/javascripts/hs/hs.deck.js"},
            
            {src:"/javascripts/hs/action/hs.action.js"},
            {src:"/javascripts/hs/action/hs.action.dual.js"},
            {src:"/javascripts/hs/action/hs.action.end-turn.js"},
            {src:"/javascripts/hs/action/hs.action.play-card.js"},
            {src:"/javascripts/hs/action/hs.action.attack.js"},

            {src:"/javascripts/hs/card/hs.card.tinlee.js"},
            {src:"/javascripts/hs/card/hs.card.cclin.js"},
            {src:"/javascripts/hs/card/hs.card.dmyeh.js"},
            
            {src:"/javascripts/hs/error/hs.error.type-error.js"},

            {id: "sound1", src: "/sounds/sound01.ogg"},
            {id: "sound2", src: "/sounds/sound02.ogg"},
            {id: "sound3", src: "/sounds/sound03.ogg"},
            {id: "sound4", src: "/sounds/sound04.ogg"},
            {id: "sound5", src: "/sounds/sound05.ogg"},
            {id: "sound6", src: "/sounds/sound06.ogg"},
            {id: "sound7", src: "/sounds/sound07.ogg"},
            {id: "sound8", src: "/sounds/sound08.ogg"},
            {id: "sound9", src: "/sounds/sound09.ogg"},
            {id: "buttonClick", src: "/sounds/button-click.mp3"},
            {id: "alert", src: "/sounds/alert.mp3"},
            {id: "message", src: "/sounds/message.mp3"},

            {src:"/images/card-back.png", id:"CardBack"},
            {src:"/images/card-atk.png", id:"CardAtk"},
            {src:"/images/card-def.png", id:"CardDef"},
            {src:"/images/card-template.png", id:"CardTemplate"},
            {src:"/images/hero-template.png", id:"HeroTemplate"},
            {src:"/images/background.png", id:"Background"},
            {src:"/images/background2.png", id:"Background2"},
            {src:"/images/background3.jpg", id:"Background3"},
            {src:"/images/match-background.jpg", id:"MatchBackground"},
            {src:"/images/deck1_cover.jpg", id:"DeckCover0"},
            {src:"/images/deck2_cover.png", id:"DeckCover1"},
            
            {src:"/images/card-sticker.jpg", id:"CardSticker"},
            {src:"/images/cclin.jpg", id:"CardCCLin"},
            {src:"/images/dmyeh.jpg", id:"CardDMYeh"},
        ];

        return manifest;
    }

    function handleFileLoad(event) {
        var item = event.item; // A reference to the item that was passed in to the LoadQueue
        var type = item.type;
    }

    function loadSound(event) {
        // This is fired for each sound that is registered.
        console.log("loaded!")
        var instance = createjs.Sound.play("sound2");  // play using id.  Could also use full source path or event.src.
        //instance.on("complete", this.handleComplete, this);
        instance.volume = 0.5;
    }

    HS.Loader = Loader;
}());