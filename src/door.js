function Door(x, y, imageName)
{
    Sprite.call(this, x, y, imageName);
    this.onGoalReached = null;
	game.audio.add('door',1,[[1,,0.01,,0.2298,0.6306,,-0.53,,,,,,,,,,,1,,,,,0.3]]);
	game.audio.add('door_no',1,[[0,,0.18,0.41,,0.24,,,,,,0.4625,0.6586,,,,,,1,,,,,0.3]]);
};

inherit(Door, Sprite);
ctor(Door);

Door.prototype.collide = function (other)
{
	if(Level.instance.player.hasKey){	
	    this.collides = false;
	    this.destroy();
	    this.onGoalReached=true;
        game.audio.play('door');
	}
    else
        game.audio.play('door_no');
    
};