class YoDeath{
    constructor(){

    }
    invoke(allayplayer,enemy,target,Array,ID){
        if(target==null){
            allayplayer.hero.newDef-=2;
            Array.push(allayplayer.hero);
            enemy.hero.newDef-=2;
            Array.push(enemy.hero);
        }
    }
}
module.exports = YoDeath;