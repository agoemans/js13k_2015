function Player(x,y)
{
    Sprite.call(this, x, y, 'assets/player.png');
    this.physics = true;

    this.walkSpeed = 300;
    this.elapsed = 0;
    this.moveDirX = 0;
    this.inputLocked = false;
};

Player.prototype = Object.create(Sprite.prototype);

Player.prototype.move = function(dir)
{
    this.moveDirX = dir;
};

Player.prototype.die = function()
{
    this.inputLocked = true;
}

Player.prototype.stop = function()
{
    this.moveDirX = 0;
};

Player.prototype.jump = function()
{
    if(!this.inputLocked && (this.colliding.bottom || this.colliding.top))
        this.velocity.y = -1300 * Math.sign(this.gravity);
};

Player.prototype.flip = function()
{
    this.gravity *= -1;
    this.flipY = !this.flipY;
}

Player.prototype.update = function(deltaSeconds)
{
    if(!this.inputLocked)
    {
        if(this.moveDirX !== 0)
            this.flipX = this.moveDirX < 0;
        this.velocity.x = this.moveDirX * this.walkSpeed;
    }

    Sprite.prototype.update.call(this, deltaSeconds);
};

ctor(Player);
