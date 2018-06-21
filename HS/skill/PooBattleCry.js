class PooBattleCry{
    constructor(){}
    invoke(allayplayer,enemy,target,Array,ID){
        if(target==null){
            if( allayplayer.allayList.length>0){
                for(let i=0;i<allayplayer.allayList.length;i++){
                    if(allayplayer.allayList[i]!=undefined){
                        if(allayplayer.allayList[i].cardID != ID){
                            allayplayer.allayList[i].newAtk=3;
                            Array.push(allayplayer.allayList[i]);
                        }
                    }
                }
            }
            if( enemy.allayList.length>0){
                for(let j =0;j<enemy.allayList.length;j++){
                    enemy.allayList[j].newAtk=2;
                    Array.push( enemy.allayList[j] );
                }
            }
            allayplayer.draw(1,enemy.socket);
        }
    }
}
module.exports = PooBattleCry;