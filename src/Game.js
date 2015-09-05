function Game()
{
    State.call(this);
    this.level = null;
    this.cameraOffset = 0;
};

Game.prototype = Object.create(State.prototype);

Game.prototype.enter = function (config)
{
    State.prototype.enter.call(this, context);

    this.cameraOffset = 0;

    var level = getUrlParameter('level') || config.level;
    var levelName = 'assets/level'+level+'.txt';

    this.level = new Level(levelName);

    var levelInt = parseInt(level);
    if(levelInt == 1)
        game.popup('tutorial',  { lines: ['Use A and D to move around', 'Use Spacebar to jump'] });
    else if(levelInt == 2)
        game.popup('tutorial',  { lines: ['Use Q to flip gravity'] });
    else if(levelInt == 4)
        game.popup('tutorial',  { lines: ['Watch out for those spikes!'] });
};

Game.prototype.leave = function ()
{
    State.prototype.leave.call(this, context);
};

Game.prototype.update = function (deltaSeconds)
{
    this.level.update(deltaSeconds);
    State.prototype.update.call(this, deltaSeconds);
};

Game.prototype.render = function (context)
{
    if (this.level.player)
    {
        this.cameraOffset = Math.floor(Math.clamp(-this.level.player.x + game.width / 2, -Level.instance.width + game.width, 0));
        context.setTransform(1, 0, 0, 1, this.cameraOffset, 0);
    }

    this.level.render(context);
    State.prototype.render.call(this, context);

    context.setTransform(1, 0, 0, 1, 0, 0);
};

Game.prototype.mouseMove = function (x, y)
{
};

Game.prototype.keyDown = function (key)
{
    if (!this.level.player)
        return;

    if (key === 65)
        this.level.player.move(-1);
    if (key === 68)
        this.level.player.move(1);
    if (key === 32)
        this.level.player.jump();
    if (key === 17 || key == 81)
        this.level.player.flip();
};

Game.prototype.keyUp = function (key)
{
    if (!this.level.player)
        return;

    if (key === 65  || key === 68)
        this.level.player.stop();
};

ctor(Game);