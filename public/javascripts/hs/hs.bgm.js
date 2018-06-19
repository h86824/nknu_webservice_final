
this.HS = this.HS || {};

(function(){

    function BGM(){
        let now = 1;
        let instance;
        let volume = 0.3;
        this.start = () => {
            this.play("sound2");
        }

        this.handleComplete = (event) => {
            now = Math.floor((Math.random() * 9) + 1);
            this.play("sound" + now);
        }

        this.play = (id) => {
            instance = createjs.Sound.play(id);  // play using id.  Could also use full sourcepath or event.src.
            instance.on("complete", this.handleComplete, this);
            instance.volume = volume;
        }

        this.buttonClick = () => {
            createjs.Sound.play("buttonClick");
        }
        
    }

    HS.BGM = BGM;
}())