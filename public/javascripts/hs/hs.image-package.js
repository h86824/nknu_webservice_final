
this.HS = this.HS || {};

(function(){
    function ImagePackage(image){
        createjs.Shape.call(this);
        this.graphics.clear().beginBitmapFill(image, "no-repeat").drawRect(0,0,image.width , image.height);
        this.scaleX = HS.Global.imagePackageWidth / image.width;
        this.scaleY = HS.Global.imagePackageHeight / image.height;
    }

    extend(ImagePackage , createjs.Shape);

    HS.ImagePackage = ImagePackage;
}())