function Game()
{
    State.call(this);
    this.level = null;
};

Game.prototype = Object.create(State.prototype);

Game.prototype.enter = function()
{
    State.prototype.enter.call(this, context);

    this.level = new Level('assets/level1.txt');
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
    switch(key)
    {
        case 'A':
            this.level.player.move(-1);
            break;
        case 'D':
            this.level.player.move(1);
            break;
        case ' ':
            this.level.player.jump();
            break;
        case 'Q':
            this.level.player.gravity *= -1;
            break;
        default:
            break;
    }
};

Game.prototype.keyUp = function(key) {
    switch(key)
    {
        case 'A':
        case 'D':
            this.level.player.stop();
            break;
        default:
            break;
    }
};


ctor(Game);
