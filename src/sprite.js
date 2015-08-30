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


    this.colliding = { top: false, bottom: false, left: false, right: false };
    this.physics = false;
    this.gravity = 8500;
    this.velocity = { x: 0, y: 0 };
};

Sprite.prototype = Object.create(GameObject.prototype);

Sprite.prototype.resetCollision = function()
{
    this.colliding.top = this.colliding.bottom = this.colliding.left = this.colliding.right = false;
};

Sprite.prototype.update = function(deltaSeconds)
{
    if(this.physics)
    {
        var elapsed = Math.min(deltaSeconds,0.016);
        var x = this.x;
        var y = this.y;
        var totalSteps = 20;
        var steps = totalSteps;
        var progress = 0;
        this.velocity.y += this.gravity*elapsed;
        var velX = this.velocity.x;
        var velY = this.velocity.y;
        this.resetCollision();

        for (var i = 0; i < totalSteps; i++)
        {
            y += this.velocity.y * elapsed / totalSteps;

            if(this.velocity.y < 0)
                this.colliding.top = !!(Level.instance.tileAt(x , y) || Level.instance.tileAt(x + this.width, y));
            else if(this.velocity.y > 0)
                this.colliding.bottom = !!(Level.instance.tileAt(x , y + this.height) || Level.instance.tileAt(x + this.width, y + this.height));

            if (this.colliding.bottom || this.colliding.top)
            {
                this.velocity.y = 0;
                steps = i;
                break;
            }
        }

        progress = elapsed * steps / totalSteps;
        this.y += velY * progress;

        steps = totalSteps;
        for (var i = 0; i < totalSteps; i++)
        {
            x += this.velocity.x * elapsed / totalSteps;

            if(this.velocity.x < 0)
                this.colliding.left = !!(Level.instance.tileAt(x , y + this.height/2));
            else if(this.velocity.x > 0)
                this.colliding.right = !!(Level.instance.tileAt(x + this.width, y + this.height/2));

            if (this.colliding.left || this.colliding.right)
            {
                this.velocity.x = 0;
                steps = i;
                break;
            }
        }

        progress = elapsed * steps / totalSteps;
        this.x += velX * progress;
    }
};

Sprite.prototype.render = function(context){
    if(this.loaded)
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
};

ctor(Sprite);
