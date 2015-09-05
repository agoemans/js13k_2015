function Goal(x, y, imageName)
{
    Sprite.call(this, x, y, imageName);
    this.onGoalReached = null;
};

inherit(Goal, Sprite);
ctor(Goal);

Goal.prototype.collide = function (other)
{
    this.collides = false;
    this.destroy();
    if (this.onGoalReached) this.onGoalReached(this.x + this.width/2,this.y + this.height/2);
};