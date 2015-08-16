function Player(x,y)
{
    Sprite.call(this, x, y, 'assets/player.png');
    this.physics = false;

};

Player.prototype = Object.create(Sprite.prototype);


Player.prototype.update = function(deltaSeconds){
    Sprite.prototype.update.call(this, deltaSeconds);
};

ctor(Player);
