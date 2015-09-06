function Enemy(x,y)
{
    Sprite.call(this, x, y, 'assets/Enemy.png');
    this.collided = false;
    this.physics = true;
    this.gravity = 0;
    this.velocity.x = 55;

};

inherit(Enemy,Sprite);
ctor(Enemy);


Enemy.prototype.stabPlayer = function(other)
{
    if(!this.collided && this.overlap(Level.instance.player.x, Level.instance.player.y, Level.instance.player.width,Level.instance.player.height))
    {
        Sprite.prototype.collide.call(this);
        this.collided = true;
    }
};


Enemy.prototype.update = function(deltaSeconds)
{
	if (this.colliding.right===true){
		this.velocity.x =-55;
	}
	if (this.colliding.left===true){
		this.velocity.x =55;
	} 
	this.stabPlayer();
	
    Sprite.prototype.update.call(this, deltaSeconds);
};