class DaMing_BattleCry{
    constructor(){}
    invoke(allayplayer,enemy,target,Array,ID){
        if(target==null){
            allayplayer.draw(3,enemy.socket);
        }
    }
}
module.exports = DaMing_BattleCry;