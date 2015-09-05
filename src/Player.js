function Player(x, y)
{
    Sprite.call(this, x, y, 'assets/player.png', 2, 2);
    this.physics = true;

    this.walkSpeed = 300;
    this.elapsed = 0;
    this.moveDirX = 0;
    this.inputLocked = false;
};

Player.prototype = Object.create(Sprite.prototype);

Player.prototype.move = function (dir)
{
    if (!this.inputLocked)
    {
        this.moveDirX = dir;
        this.play(0, true, 15);
    }
};

Player.prototype.die = function ()
{
    this.physics = false;
    this.inputLocked = true;
    this.visible = false;
    this.stop();
};

Player.prototype.stop = function ()
{
    this.velocity.x = 0;
    this.moveDirX = 0;
    Sprite.prototype.stop.call(this);
};

Player.prototype.jump = function ()
{

    if (!this.inputLocked && (this.colliding.bottom || this.colliding.top))
    {
        this.play(1, false);
        this.velocity.y = -1300 * Math.sign(this.gravity);
    }
};

Player.prototype.flip = function ()
{
    if (this.inputLocked)
        return;

    this.gravity *= -1;
    this.flipY = !this.flipY;
}

Player.prototype.update = function (deltaSeconds)
{
    if (!this.inputLocked)
    {
        if (this.moveDirX !== 0)
            this.flipX = this.moveDirX < 0;
        this.velocity.x = this.moveDirX * this.walkSpeed;

        if (this.animation === 1 && this.velocity.y > 0)
        {
            Sprite.prototype.stop.call(this);
            this.frame = 0;
        }
    }

    Sprite.prototype.update.call(this, deltaSeconds);
};

ctor(Player);