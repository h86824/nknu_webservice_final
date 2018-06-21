class JianAn_battleCry{
    constructor(){}
    invoke(allayplayer,enemy,target,Array,ID){
        if(target==null){
            if( enemy.allayList.length>0){
                for(let i =0;i<enemy.allayList.length;i++){
                    enemy.allayList[i].newDef-=3;
                    Array.push( enemy.allayList[i] );
                }
            }
            if(allayplayer.allayList.length>0){
                for(let j=0;j<allayplayer.allayList.length;j++){
                    if(allayplayer.allayList[j].cardID != ID){
                        allayplayer.allayList[j].newDef-=3;
                        Array.push( allayplayer.allayList[j] );
                    }
                }
            }
        }
    }
}
module.exports = JianAn_battleCry;