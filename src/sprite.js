function Sprite(x,y,image)
{

    if (typeof image === "string")
    {
        var img = new Image();
        img.src = image;
        this.image = img;
    }
    else if (typeof image === "object")
    {
        this.image = image;
    }

    GameObject.call(this, x, y);
};

Sprite.prototype = Object.create(GameObject.prototype);

Sprite.prototype.update = function(deltaSeconds){

};

Sprite.prototype.render = function(context){
    context.drawImage(this.image, this.x, this.y);
};

ctor(Sprite);
