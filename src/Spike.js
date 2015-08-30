function Spike(x,y,imageName)
{
    Sprite.call(this, x, y, imageName);
    this.onGoalReached = null;
};

inherit(Spike,Sprite);
ctor(Spike);

Spike.prototype.collide = function(other)
{
    Sprite.prototype.collide.call(this, other);
    this.collides = false;
};