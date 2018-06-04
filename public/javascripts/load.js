
this.HS = this.HS || {};

(function(){

    function Loader(){
        let loadList = [
            "https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.dev.js",
            "https://code.createjs.com/createjs-2015.11.26.min.js",
            "/javascripts/hs/hs.core.js",
        ];

        let onload = function(){};
        let finishedCount = 0;

        function start(){

            loadList.forEach( srcUrl => {
                var script = document.createElement('script');
                script.onload = finishCheck;
                script.src = srcUrl;
                document.head.appendChild(script);
            });
    
        }

        function load(onloadCB){
            onload = onloadCB;
        };
        
        function finishCheck(){
            finishedCount++;

            if(finishedCount == loadList.length)
                onload();
        }

        return {
            start: start,
            load: load
        }
    }

    HS.Loader = Loader;
}());