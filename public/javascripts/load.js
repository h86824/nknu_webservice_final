
this.HS = this.HS || {};

(function(){

    function Loader(){
        let loadList = [
            "https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.dev.js",
            "https://code.createjs.com/createjs-2015.11.26.min.js",
            "/javascripts/hs/hs.core.js",
            "/javascripts/hs/hs.global.js",
            "/javascripts/hs/hs.method.js",
            "/javascripts/hs/hs.card.js",
            "/javascripts/hs/hs.hero.js",
            "/javascripts/hs/hs.battle-field.js",
            "/javascripts/hs/hs.handArea.js",
            "/javascripts/hs/hs.battle-area.js",
            "/javascripts/hs/hs.button.js",
            "/javascripts/hs/hs.arrows-manager.js",
            "/javascripts/hs/hs.message-box.js",
            
            "/javascripts/hs/action/hs.action.js",
            "/javascripts/hs/action/hs.action.dual.js",

            "/javascripts/hs/card/hs.card.tinlee.js",
            "/javascripts/hs/card/hs.card.cclin.js",
            "/javascripts/hs/card/hs.card.dmyeh.js",
            
            "/javascripts/hs/error/hs.error.type-error.js"
        ];

        let onload = function(){};
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
            onload = onloadCB;
        };
        
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
                queue.on("fileload", handleFileLoad, this);
                queue.on("complete", onload, this);
                queue.loadManifest(getManifest());
                
                HS.Global.Source = queue;
            }
        }

        return {
            start: start,
            load: load
        }
    }

    function onFileLoaded(evt){
        var item = evt.item;
        var type = evt.type;
    }

    function getManifest(){
        var manifest = [
            {src:"/images/card-back.png", id:"CardBack"},
            {src:"/images/card-atk.png", id:"CardAtk"},
            {src:"/images/card-def.png", id:"CardDef"},
            {src:"/images/card-template.png", id:"CardTemplate"},
            {src:"/images/hero-template.png", id:"HeroTemplate"},
            {src:"/images/background.png", id:"Background"},
            {src:"/images/background2.png", id:"Background2"},
            {src:"/images/background3.jpg", id:"Background3"},
            
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

    HS.Loader = Loader;
}());