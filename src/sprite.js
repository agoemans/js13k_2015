function Sprite(x,y,image)
{
    GameObject.call(this, x, y);

    this.loaded = false;
    if (typeof image === "string")
    {
        var img = new Image();
        img.src = image;
        this.image = img;
        var that = this;
        this.image.onload = function(){
            that.width = that.image.width;
            that.height = that.image.height;
            that.loaded = true;
        };
    }
    else if (typeof image === "object")
    {
        this.image = image;
        this.loaded = true;
    }
};

Sprite.prototype = Object.create(GameObject.prototype);

Sprite.prototype.update = function(deltaSeconds){

};

Sprite.prototype.render = function(context){
    if(this.loaded)
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
};

ctor(Sprite);
