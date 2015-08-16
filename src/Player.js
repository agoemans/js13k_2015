function Player(x,y)
{
    Sprite.call(this, x, y, 'assets/player.png');
    this.physics = true;

    this.elapsed = 0;

};

Player.prototype = Object.create(Sprite.prototype);


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
