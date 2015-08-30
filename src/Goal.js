function Goal(x,y,imageName)
{
    Sprite.call(this, x, y, imageName);
    this.onGoalReached = null;
};

inherit(Goal,Sprite);
ctor(Goal);

Goal.prototype.collide = function(other)
{
    // TODO:
    // - Show victory particles/animation
    // - Then call goalCleared
    console.log("Hit other: " + typeof other);
    this.destroy();

    setTimeout(function()
    {
        if(this.onGoalReached) this.onGoalReached();
    }.bind(this), 1000);

};
