
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
            
            {src:"/javascripts/hs/action/hs.action.js"},
            {src:"/javascripts/hs/action/hs.action.dual.js"},
            {src:"/javascripts/hs/action/hs.action.endturn.js"},
            {src:"/javascripts/hs/action/hs.action.play-card.js"},

            {src:"/javascripts/hs/card/hs.card.tinlee.js"},
            {src:"/javascripts/hs/card/hs.card.cclin.js"},
            {src:"/javascripts/hs/card/hs.card.dmyeh.js"},
            
            {src:"/javascripts/hs/error/hs.error.type-error.js"},

            {id: "sound1", src: "/sounds/sound1.ogg"},
            {id: "sound2", src: "/sounds/sound2.ogg"},
            {id: "sound3", src: "/sounds/sound3.ogg"},
            {id: "sound4", src: "/sounds/sound4.ogg"},
            {id: "sound5", src: "/sounds/sound5.ogg"},
            {id: "sound6", src: "/sounds/sound6.ogg"},
            {id: "sound7", src: "/sounds/sound7.ogg"},
            {id: "sound8", src: "/sounds/sound8.ogg"},
            {id: "sound9", src: "/sounds/sound9.ogg"},

            {src:"/images/card-back.png", id:"CardBack"},
            {src:"/images/card-atk.png", id:"CardAtk"},
            {src:"/images/card-def.png", id:"CardDef"},
            {src:"/images/card-template.png", id:"CardTemplate"},
            {src:"/images/hero-template.png", id:"HeroTemplate"},
            {src:"/images/background.png", id:"Background"},
            {src:"/images/background2.png", id:"Background2"},
            {src:"/images/background3.jpg", id:"Background3"},
            {src:"/images/match-background.jpg", id:"MatchBackground"},
            
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