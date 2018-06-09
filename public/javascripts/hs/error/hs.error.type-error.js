
this.HS = this.HS || {};

this.HS.Error = this.HS.Error || {};

(function(){

    function HsTypeError(type , name){
        return new TypeError(name + " is not instance of " + type);
    }

    this.HS.Error.TypeError = HsTypeError;

}())
