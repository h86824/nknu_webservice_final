
this.HS = this.HS || {};

(function(){

    function Loader(){
        let loadList = [
            "https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.dev.js",
            "https://code.createjs.com/createjs-2015.11.26.min.js",
        ];

        let onload = function(){};
        let onprogress = function(){};
        let finishedCount = 0;

        function start(){
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

    function getManifest(){
        var manifest = [
            {src:"hs.js"},

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
            {id: "attack", src: "/sounds/attack.mp3"},
            {id: "explosion", src: "/sounds/explosion.mp3"},
            {id: "launcher", src: "/sounds/launcher.mp3"},
            {id: "playcard", src: "/sounds/putting_a_large_bag.mp3"},
            {id: "bell", src: "/sounds/bell.mp3"},
            {id: "angels", src: "/sounds/chorus_of_angels.mp3"},
            {id: "heroafterbattlecry", src: "/sounds/strange_wave.mp3"},
            {id: "herobattlecry", src: "/sounds/magic3.mp3"},
            
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
            {src:"/images/fire-ball.png", id:"FireBall"},
            {src:"/images/card_Ahri.png", id:"CardAhri"},
            {src:"/images/card_Annie.png", id:"CardAnnie"},
            {src:"/images/card_Ashe.png", id:"CardAshe"},
            {src:"/images/card_Azir.png", id:"CardAzir"},
            {src:"/images/card_Blitzcrank.png", id:"CardBlitzcrank"},
            {src:"/images/card_Braum.png", id:"CardBraum"},
            {src:"/images/card_Caitlyn.png", id:"CardCaitlyn"},
            {src:"/images/card_Camille.png", id:"CardCamille"},
            {src:"/images/card_CCLin.png", id:"CardCCLin"},
            {src:"/images/card_CPH.png", id:"CardCPH"},
            {src:"/images/card_DaMing.png", id:"CardDaMing"},
            {src:"/images/card_Darius.png", id:"CardDarius"},
            {src:"/images/card_DyMing.png", id:"CardDyMing"},
            {src:"/images/card_Flower.png", id:"CardFlower"},
            {src:"/images/card_GAYA.png", id:"CardGAYA"},
            {src:"/images/card_Haru.png", id:"CardHaru"},
            {src:"/images/card_HauShiang.png", id:"CardHauShiang"},
            {src:"/images/card_Jan.png", id:"CardJan"},
            {src:"/images/card_JianAn.png", id:"CardJianAn"},
            {src:"/images/card_JiungHan.jpg", id:"CardJiungHan"},
            {src:"/images/card_Justin.png", id:"CardJustin"},
            {src:"/images/card_Kuo.png", id:"CardKuo"},
            {src:"/images/card_Lily.png", id:"CardLily"},
            {src:"/images/card_LiWei.png", id:"CardLiWei"},
            {src:"/images/card_Maple.png", id:"CardMaple"},
            {src:"/images/card_Poo.png", id:"CardPoo"},
            {src:"/images/card_WinTingLee.jpg", id:"CardWinTingLee"},
            {src:"/images/card_Yee.png", id:"CardYee"},
            {src:"/images/card_Yo.png", id:"CardYo"},
            {src:"/images/card_YYT.jpg", id:"CardYYT"},
            {src:"/images/card_Fireball.png", id:"CardFireBall"},
            {src:"/images/card_Hero_BattleCry.png", id:"HeroBattleCry"},
            
            {src:"/images/dmyeh.jpg", id:"CardDMYeh"},
            {src:"/images/card_WinTingLee_BattleCry.png", id:"BattleCryWinTingLee"},
        ];

        return manifest;
    }

    function handleFileLoad(event) {
        var item = event.item; // A reference to the item that was passed in to the LoadQueue
        var type = item.type;
    }

    HS.Loader = Loader;
}());