function Game()
{
    State.call(this);
    this.level = null;
    this.cameraOffset = 0;
};

inherit(Game,State);

Game.prototype.enter = function (config)
{
    game.canvas.style.backgroundColor = "#111";
    State.prototype.enter.call(this, context);

    this.cameraOffset = 0;

    var level = getUrlParameter('level') || config.level;
    var levelInt = parseInt(level);

    this.level = new Level(levelInt);
    if(levelInt == 1)
        game.popup({ title: "Tutorial", lines: ['Use LEFT and RIGHT to move', 'Use UP to jump'] });
    else if(levelInt == 2)
        game.popup({ title: "Tutorial", lines: ['Use SPACE to flip gravity'] });
    else if(levelInt == 3)
        game.popup({ title: "Tutorial", lines: ['Watch out for those spikes!','Collect keys to unlock doors'] });
    else if(levelInt == 4)
        game.popup({ title: "Tutorial", lines: ['Moving spikes are even worse!!'] });
    else if(levelInt == 7)
        game.popup({ title: "Tutorial", lines: ['Sometimes it helps to flip', 'gravity while falling/jumping'] });
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
        var xOffset = (game.width - (this.level.tilesX*this.level.tileSize))/2;
        var yOffset = (game.height - (this.level.tilesY*this.level.tileSize))/2;

        this.cameraOffset = Math.floor(Math.clamp(-this.level.player.x + game.width / 2, -Level.instance.width + game.width, 0));
        context.setTransform(1, 0, 0, 1, this.cameraOffset + Math.max(xOffset,0), yOffset);
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

    if (key == 37)
        this.level.player.move(-1);
    if (key == 39)
        this.level.player.move(1);
    if (key == 38)
        this.level.player.jump();
    if (key == 32)
        this.level.player.flip();
};

Game.prototype.keyUp = function (key)
{
    if (!this.level.player)
        return;

    if (key == 37 || key == 39)
        this.level.player.stop();
};

ctor(Game);