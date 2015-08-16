function Game()
{
    State.call(this);
};

Game.prototype = Object.create(State.prototype);

Game.prototype.enter = function()
{
    State.prototype.enter.call(this, context);
};

Game.prototype.leave = function()
{
    State.prototype.leave.call(this, context);
};

Game.prototype.update = function(deltaSeconds){
    State.update.call(this, deltaSeconds);
};

Game.prototype.render = function(context){
    State.prototype.render.call(this, context);
};

ctor(Game);
