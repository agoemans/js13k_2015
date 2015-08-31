function Sprite(x,y,image)
{
    GameObject.call(this, x, y);

    this.onDestroyed = null;
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


    this.flipY = false;
    this.flipX = false;

    this.collides = true;
    this.colliding = { top: false, bottom: false, left: false, right: false };
    this.onCollide = null;

    this.physics = false;
    this.gravity = 8500;
    this.velocity = { x: 0, y: 0 };
};

Sprite.prototype = Object.create(GameObject.prototype);

Sprite.prototype.resetCollision = function()
{
    this.colliding.top = this.colliding.bottom = this.colliding.left = this.colliding.right = false;
};

Sprite.prototype.overlap = function(x,y,width,height)
{
    //return this.collides;
    // TODO; fix this
    if(!this.collides)
        return false;


    var left = this.x;
    var right = this.x + this.width;
    var xOver = (left >= x && left <= x + width) || (right >= x && right <= x + width)
        || (left <= x && right >= x) || (left <= x+width && right >= x+width);

    var top = this.y;
    var bottom = this.y + this.height;
    var yOver = (top >= y && top <= y + height) || (bottom >= y && bottom <= y + height);

    return xOver && yOver;
};

Sprite.prototype.doCollision = function(elapsed)
{
    var totalSteps = 10;
    var x = this.x;
    var y = this.y;
    var steps = totalSteps;
    var progress = 0;
    var velX = this.velocity.x;
    var velY = this.velocity.y;
    var collidingObjects = [];


    // First integrate over Y
    for (var i = 0; i < totalSteps; i++)
    {
        y += this.velocity.y * elapsed / totalSteps;

        if(this.velocity.y < 0)
        {
            var tl = Level.instance.tileAt(x , y);
            var tr = Level.instance.tileAt(x + this.width-1, y);
            var tlOverlap = tl && tl.overlap(x,y,this.width,this.height);
            var trOverlap = tr && tr.overlap(x,y,this.width,this.height);

            if(tlOverlap)
                collidingObjects.push(tl);
            if(trOverlap)
                collidingObjects.push(tr);

            this.colliding.top = (tlOverlap || trOverlap);
        }
        else if(this.velocity.y > 0)
        {
            var bl = Level.instance.tileAt(x , y + this.height-1);
            var br = Level.instance.tileAt(x + this.width-1, y + this.height-1);
            var blOverlap = bl && bl.overlap(x,y,this.width,this.height);
            var brOverlap = br && br.overlap(x,y,this.width,this.height);

            if(blOverlap)
                collidingObjects.push(bl);
            if(brOverlap)
                collidingObjects.push(br);

            this.colliding.bottom = (blOverlap || brOverlap);
        }

        if (this.colliding.bottom || this.colliding.top)
        {
            this.velocity.y = 0;
            steps = i;
            break;
        }
    }

    progress = elapsed * steps / totalSteps;
    this.y += velY * progress;
    y = this.y;

    steps = totalSteps;

    // Then integrate over X
    for (var i = 0; i < totalSteps; i++)
    {
        x += this.velocity.x * elapsed / totalSteps;

        if(this.velocity.x < 0)
        {
            var tl = Level.instance.tileAt(x, y);
            var bl = Level.instance.tileAt(x, y + this.height-1);
            var tlOverlap = tl && tl.overlap(x,y,this.width,this.height);
            var blOverlap = bl && bl.overlap(x,y,this.width,this.height);

            if(tlOverlap)
                collidingObjects.push(tl);
            if(blOverlap)
                collidingObjects.push(bl);

            this.colliding.left = (tlOverlap || blOverlap);
        }
        else if(this.velocity.x > 0)
        {
            var tr = Level.instance.tileAt(x + this.width-1, y);
            var br = Level.instance.tileAt(x + this.width-1, y + this.height-1);

            var trOverlap = tr && tr.overlap(x,y,this.width,this.height);
            var brOverlap = br && br.overlap(x,y,this.width,this.height);

            if(trOverlap)
                collidingObjects.push(tr);
            if(brOverlap)
                collidingObjects.push(br);

            this.colliding.right = (trOverlap || brOverlap);
        }

        if (this.colliding.left || this.colliding.right)
        {
            this.velocity.x = 0;
            steps = i;
            break;
        }
    }

    collidingObjects.forEach(function(other){
       if(other && other.collides) other.collide(this);
    });

    progress = elapsed * steps / totalSteps;
    this.x += velX * progress;
};

Sprite.prototype.collide = function()
{
    if(this.onCollide) this.onCollide();
};

Sprite.prototype.destroy = function()
{
    Level.instance.removeAt(this.x, this.y);
    if(this.onDestroyed)this.onDestroyed(this);
};

Sprite.prototype.update = function(deltaSeconds)
{
    if(this.physics)
    {
        var elapsed = Math.min(deltaSeconds,0.016);
        this.velocity.y += this.gravity*elapsed;

        this.resetCollision();
        this.doCollision(deltaSeconds);
    }
};

Sprite.prototype.render = function(context){

    if(this.flipY || this.flipX)
    {
        context.save();
        var flipX = this.x + this.width/2;
        var flipY = this.y + this.height/2;
        context.translate(flipX, flipY);
        context.scale(this.flipX ? -1 : 1, this.flipY ? -1 : 1);
        context.translate(-flipX, -flipY);
    }

    if(this.loaded)
        context.drawImage(this.image, this.x, this.y, this.width, this.height);

    if(this.flipY || this.flipX)
        context.restore();
};

ctor(Sprite);
