
this.HS = this.HS || {};

(function(){

    function BGM(){
        let now = 1;
        let bgm;
        let instance;
        let volume = 0.4;
        this.start = () => {
            this.playBgm("sound2");
        }

        this.handleComplete = (event) => {
            now = Math.floor((Math.random() * 9) + 1);
            this.play("sound" + now);
        }

        this.playBgm = (id) => {
            bgm = createjs.Sound.play(id);  // play using id.  Could also use full sourcepath or event.src.
            bgm.on("complete", this.handleComplete, this);
            bgm.on("failed", (e) => {
                console.error(e);
                this.handleComplete();
            });
            
            bgm.volume = volume;
        }

        this.buttonClick = () => {
            instance = createjs.Sound.play("buttonClick");
            instance.volume = 1;
        }

        this.alert = () => {
            instance = createjs.Sound.play("alert");
            instance.volume = 0.7;
        }

        this.message = () => {
            createjs.Sound.play("message");
        }

        this.attack = () => {
            createjs.Sound.play("attack");
        }

        this.play = (id) =>{
            createjs.Sound.play(id);
        }
        
    }

    HS.BGM = new BGM();
}())