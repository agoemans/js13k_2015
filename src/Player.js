function Player(x,y)
{
    Sprite.call(this, x, y, 'assets/player.png');
    this.physics = true;

    this.walkSpeed = 400;
    this.elapsed = 0;
    this.moveDirX = 0;
};

Player.prototype = Object.create(Sprite.prototype);

Player.prototype.move = function(dir)
{
    this.moveDirX = dir;
};

Player.prototype.stop = function()
{
    this.moveDirX = 0;
};

Player.prototype.jump = function()
{
    if(this.colliding.bottom || this.colliding.top)
        this.velocity.y = -1300 * Math.sign(this.gravity);
};

Player.prototype.flip = function()
{
    this.gravity *= -1;
    this.flipY = !this.flipY;
}

Player.prototype.update = function(deltaSeconds){

    this.flipX = this.moveDirX < 0;
    this.velocity.x = this.moveDirX * this.walkSpeed;


    Sprite.prototype.update.call(this, deltaSeconds);
};

ctor(Player);
