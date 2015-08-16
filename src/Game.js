function Game()
{
    State.call(this);
    this.level = null;
};

Game.prototype = Object.create(State.prototype);

Game.prototype.enter = function()
{
    State.prototype.enter.call(this, context);

    this.level = new Level('level1');
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

ctor(Game);
