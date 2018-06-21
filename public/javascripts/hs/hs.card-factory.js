
this.HS = this.HS || {};

(function(){
    function CardFactory(){
        this.create = (name , id) => {
            if(cardMap[name]){
                return new cardMap[name].class(id);
            }else{
                return new HS.Card(id);
            }
        }
    }

    let cardMap = 
        {
        阿璃:{name:"阿璃", class:HS.Card.Ahri},
        安妮:{name:"安妮", class:HS.Card.Annie},
        艾希:{name:"艾希", class:HS.Card.Ashe},
        阿祈爾:{name:"阿祈爾", class:HS.Card.Azir},
        布里茨:{name:"布里茨", class:HS.Card.Blitzcrank},
        布郎姆:{name:"布郎姆", class:HS.Card.Braum},
        凱特琳:{name:"凱特琳", class:HS.Card.Caitlyn},
        卡蜜兒:{name:"卡蜜兒", class:HS.Card.Camille},
        哲正:{name:"哲正", class:HS.Card.CCLin},
        CPH:{name:"CPH", class:HS.Card.CPH},
        高師許大銘:{name:"高師許大銘", class:HS.Card.DaMing},
        達瑞斯:{name:"達瑞斯", class:HS.Card.Darius},
        葉師傅:{name:"葉師傅", class:HS.Card.DyMing},
        花花:{name:"花花", class:HS.Card.Flower},
        師哥:{name:"師哥", class:HS.Card.GAYA},
        Haru:{name:"Haru", class:HS.Card.Haru},
        浩翔:{name:"浩翔", class:HS.Card.HauShiang},
        小詹:{name:"小詹", class:HS.Card.Jan},
        建安:{name:"建安", class:HS.Card.JianAn},
        煞氣a屁孩:{name:"煞氣a屁孩", class:HS.Card.JiungHan},
        爆肝王:{name:"爆肝王", class:HS.Card.Justin},
        家旭:{name:"家旭", class:HS.Card.Kuo},
        oo黑魔導oo:{name:"oo黑魔導oo", class:HS.Card.Lily},
        立偉:{name:"立偉", class:HS.Card.LiWei},
        張晉:{name:"張晉", class:HS.Card.Maple},
        大便:{name:"大便", class:HS.Card.Poo},
        溫聽力:{name:"溫聽力", class:HS.Card.WinTingLee},
        文義:{name:"文義", class:HS.Card.Yee},
        Yo:{name:"Yo", class:HS.Card.Yo},
        遠澤:{name:"遠澤", class:HS.Card.YYT},
        火球術:{name:"火球術", class:HS.Card.FireBall},
    };

    extend(CardFactory , createjs.Shape);

    HS.CardFactory = new CardFactory();
}())
