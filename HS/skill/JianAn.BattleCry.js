class JianAn_battleCry{
    constructor(){}
    invoke(allayplayer,enemy,target,Array){
        if(target==null){
            if( enemy.allayList.length>0){
                for(let i =0;i<enemy.allayList.length;i++){
                    enemy.allayList[i].newDef-=1;
                    Array.push( enemy.allayList[i] );
                }
            }
            if(allayplayer.allayList.length>0){
                for(let j=0;j<allayplayer.allayList.length;j++){
                    allayplayer.allayList[j].newDef-=1;
                    Array.push( allayplayer.allayList[j] );
                }
            }
        }
    }
}
module.exports = JianAn_battleCry;