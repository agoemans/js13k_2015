function Player(x,y)
{
    Sprite.call(this, x, y, 'assets/player.png');
    this.physics = true;

    this.walkSpeed = 400;
    this.elapsed = 0;

};

Player.prototype = Object.create(Sprite.prototype);

Player.prototype.move = function(dir)
{
    this.velocity.x = dir * this.walkSpeed;
};

Player.prototype.stop = function(dir)
{
    this.velocity.x = 0;
};

Player.prototype.jump = function()
{
    if(this.colliding.bottom || this.colliding.top)
        this.velocity.y = -1300 * Math.sign(this.gravity);
};

Player.prototype.update = function(deltaSeconds){
    Sprite.prototype.update.call(this, deltaSeconds);

    /*this.elapsed += deltaSeconds;
    if(this.elapsed > 3)
    {
        this.velocity.y = -500;
        this.elapsed = 0;
    }*/
};

ctor(Player);
