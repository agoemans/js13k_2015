function Key(x, y, imageName)
{
    Sprite.call(this, x, y, imageName);
    this.onGoalReached = null;
};

inherit(Key, Sprite);
ctor(Key);

Key.prototype.collide = function (other)
{
    this.collides = false;
    this.destroy();
    Level.instance.player.hasKey=true;
    
};

Key.prototype.update = function(deltaSeconds)
{
	if (this.onGoalReached){
		this.image.src="assets/wall.png"
	}	
	
    Sprite.prototype.update.call(this, deltaSeconds);
};