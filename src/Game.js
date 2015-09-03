function Game()
{
    State.call(this);
    this.level = null;
    this.cameraOffset = 0;
};

Game.prototype = Object.create(State.prototype);

Game.prototype.enter = function(config)
{
    State.prototype.enter.call(this, context);

    this.cameraOffset = 0;
    //var levelName = 'assets/level' + config.level + '.txt';
    var levelName = 'assets/level5.txt';
    this.level = new Level(levelName);
};

Game.prototype.leave = function()
{
    State.prototype.leave.call(this, context);
};

Game.prototype.update = function(deltaSeconds){
    this.level.update(deltaSeconds);
    State.prototype.update.call(this, deltaSeconds);
};

Game.prototype.render = function(context)
{
    if(this.level.player)
    {
        this.cameraOffset = Math.floor(Math.clamp(-this.level.player.x + gameWidth/2, -Level.instance.width + gameWidth, 0));
        context.setTransform(1,0,0,1,this.cameraOffset,0);
    }

    this.level.render(context);
    State.prototype.render.call(this, context);

    context.setTransform(1,0,0,1,0,0);
};

Game.prototype.mouseMove = function(x,y){
};

Game.prototype.keyDown = function(key)
{
    if(!this.level.player)
        return;

    if(key === "A")
        this.level.player.move(-1);
    if( key === 'D')
            this.level.player.move(1);
    if( key === ' ')
        this.level.player.jump();
    if( key === 'Q')
            this.level.player.flip();
};

Game.prototype.keyUp = function(key) {
    if(key === "A" || key === "D")
        this.level.player.stop();
};


ctor(Game);
