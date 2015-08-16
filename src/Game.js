function Game()
{
    State.call(this);
    this.level = null;
};

Game.prototype = Object.create(State.prototype);

Game.prototype.enter = function(config)
{
    State.prototype.enter.call(this, context);

    this.level = new Level(config.level);
};

Game.prototype.leave = function()
{
    State.prototype.leave.call(this, context);
};

Game.prototype.update = function(deltaSeconds){
    State.prototype.update.call(this, deltaSeconds);
    this.level.update(deltaSeconds);
};

Game.prototype.render = function(context){
    this.level.render(context);
    State.prototype.render.call(this, context);
};

Game.prototype.mouseMove = function(x,y){
};

Game.prototype.keyDown = function(key)
{
    if(key === "A")
        this.level.player.move(-1);
    if( key === 'D')
            this.level.player.move(1);
    if( key === ' ')
        this.level.player.jump();
    if( key === 'Q')
            this.level.player.gravity *= -1;
};

Game.prototype.keyUp = function(key) {
    if(key === "A" || key === "D")
        this.level.player.stop();
};


ctor(Game);
