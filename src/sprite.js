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

    this.physics = false;
    this.gravity = 1500;
    this.velocity = { x: 0, y: 0 };
};

Sprite.prototype = Object.create(GameObject.prototype);

Sprite.prototype.update = function(deltaSeconds)
{
    if(this.physics)
    {
        var elapsed = Math.min(deltaSeconds,0.016);
        var x = this.x;
        var y = this.y;
        var totalSteps = 20;
        var steps = totalSteps;

        this.velocity.y += this.gravity*elapsed;

        for (var i = 0; i < totalSteps; i++)
        {
            x += this.velocity.x * elapsed / totalSteps;
            y += this.velocity.y * elapsed / totalSteps;

            var sides = Level.instance.tileAt(x , y) || Level.instance.tileAt(x + this.width, y)
                || Level.instance.tileAt(x, y + this.height) || Level.instance.tileAt(x + this.width , y + this.height);
            if (sides)
            {
                steps = i;
                break;
            }
        }

        var progress = elapsed * steps / totalSteps;
        this.x += this.velocity.x * progress;
        this.y += this.velocity.y * progress;
    }
};

Sprite.prototype.render = function(context){
    if(this.loaded)
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
};

ctor(Sprite);
