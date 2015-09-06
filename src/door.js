function Door(x, y, imageName)
{
    Sprite.call(this, x, y, imageName);
    this.onGoalReached = null;
};

inherit(Door, Sprite);
ctor(Door);

Door.prototype.collide = function (other)
{
	if(Level.instance.player.hasKey){	
	    this.collides = false;
	    this.destroy();
	    this.onGoalReached=true;
	}
    
};

Door.prototype.update = function(deltaSeconds)
{
    Sprite.prototype.update.call(this, deltaSeconds);
};