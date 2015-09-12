function Level(number)
{
    this.tileSize = 64;
    this.xOffset = 1;
    this.yOffset = 1;
    this.respawnTime = 1;
    this.active = false;
    this.frames = 0;
    this.goal = null;

    this.player = null;
    this.enemies = [];

    this.width = 0;
    this.height = 0;


    // Sample level
    this.tiles = [];

    this.tileObects = [];

    this.bgLayer = [];
    this.renderList = [];
    this.loadLevel(number);

    this.particles = new ParticleEmitter(0, 0, this.respawnTime);

    game.audio.add('win',1,[[0,,0.52,0.39,0.27,0.35,,0.12,,0.14,0.56,0.2085,0.673,,,,,,1,,,,,0.3]]);

    Level.instance = this;
};

inherit(Level, Object);

Level.prototype.levelLoaded = function (data)
{
    this.tiles = data;
    this.processLevel();
}

Level.prototype.processFileData = function (data)
{
    var templist = [];
    var mainlist = [];
    var i;
    templist = data.split("\n");
    for (i = 0; i < templist.length; i++)
    {
        mainlist.push(templist[i].trim().split(""));
    }
    this.levelLoaded(mainlist);
}


Level.prototype.loadLevel = function (number)
{
    if(number > game.levels.length)
        number = 1;

    var level = game.levels[number-1];
    this.processFileData(level);
};

Level.prototype.processLevel = function ()
{
    this.tilesX = this.tiles[0].length + 2;
    this.tilesY = this.tiles.length + 2;

    for (var y = 0; y < this.tilesY; y++)
    {
        this.tileObects[y] = [];
        for (var x = 0; x < this.tilesX; x++)
        {
            if (x === 0 || x === this.tilesX - 1 || y === 0 || y === this.tilesY - 1)
                this.addTile('Y', x, y);
        }
    }

    for (var y = 0; y < this.tiles.length; y++)
    {
        var row = this.tiles[y];
        for (var x = 0; x < row.length; x++)
        {
            var newX = x + this.xOffset;
            var newY = y + this.yOffset;
            var tile = row[x];
            this.addTile(tile, newX, newY);
        }
    }

    for(var i=0;i<100;i++)
        this.bgLayer.push({x: Math.random()*(this.tilesX*this.tileSize-20)+10,y: Math.random()*(this.tilesY*this.tileSize-20)+10,size: Math.random()*10});

    this.width = this.tilesX * this.tileSize;
    this.height = this.tilesY * this.tileSize;
};

Level.prototype.addTile = function (char, x, y)
{
    var object = null;
    var pX = x * this.tileSize;
    var pY = y * this.tileSize;
    switch (char)
    {
        case 'Y':
            object = new Sprite(pX, pY, "assets/wall.png");
            object.tint = "#644637";
            break;
        case 'W':
            object = new Sprite(pX, pY, "assets/wall2.png");
            object.tint = "#2277aa";
            break;
        case 'D':
            object = new Door(20 + pX, pY, "assets/door.png");
            break;
        case 'K':
            object = new Key(17 + pX, 24 + pY, "assets/key.png");
            break;
        case 'X':
            object = new Goal(pX + 17, pY + 17, "assets/win.png");
            object.onGoalReached = this.levelComplete;
            this.goal = object;
            break;
        case '^':
            object = new Spike(pX, pY, "assets/spike.png");
            object.flipY = true;
            object.onCollide = this.levelFailed;
            break;
        case '+':
            object = new Spike(pX, pY + 44, "assets/spike.png");
            object.onCollide = this.levelFailed;
            break;
        case 'S':
            this.player = new Player(pX+4, pY-4);
            break;
        case 'E':
            var enemy = new Enemy(pX, pY + 40);
            enemy.onCollide = this.levelFailed;
            this.enemies.push(enemy);
            break;
        case 'F':
            var enemy = new Enemy(pX, pY);
            enemy.flipY = true;
            enemy.gravity = -enemy.gravity;
            enemy.onCollide = this.levelFailed;
            this.enemies.push(enemy);
            break;
        default:
            break;
    }

    if (object)
    {

        this.renderList.push(object);
        this.tileObects[y][x] = object;
        return object;
    }

    return null;
};

Level.prototype.levelFailed = function ()
{
    var player = Level.instance.player;
    Level.instance.particles.emit(player.x + player.width/2, player.y + player.height/2, '#AAAAAA');
    Level.instance.player.die();
    var levelStr = localStorage[game.keyName] || 1;
    var topLevel = parseInt(levelStr);


    // TODO:
    // Show lose popup
    //
    setTimeout(function ()
    {
        game.goto("game", {level: topLevel});
    }.bind(this), Level.instance.respawnTime * 1000);
};

Level.prototype.levelComplete = function (x,y)
{
    game.audio.play('win');
    Level.instance.particles.emit(x, y, '#AAFFAA');
    var levelStr = localStorage[game.keyName] || 1;

    var topLevel = parseInt(levelStr);
    topLevel++;

    if(topLevel > game.levels.length)
    {
        game.popup({title: "Congrats!", lines: ['You finished the game!','Reload the page to play again!'], permanent: true});
        topLevel = 1;
    }
    else
    {
        setTimeout(function ()
        {
            game.goto("game", {level: topLevel});
        }, Level.instance.respawnTime * 1000);
    }

    localStorage[game.keyName] = topLevel;
};

Level.prototype.tileAt = function (x, y)
{
    var tileX = Math.floor(x / this.tileSize);
    var tileY = Math.floor(y / this.tileSize);
    if (tileY >= this.tileObects.length || tileX > this.tileObects[tileY].length)
        return null;

    return this.tileObects[tileY][tileX];
};

Level.prototype.removeAt = function (x, y)
{
    var tileX = Math.floor(x / this.tileSize);
    var tileY = Math.floor(y / this.tileSize);
    if (tileY >= this.tileObects.length || tileX > this.tileObects[tileY].length)
        return null;

    var object = this.tileObects[tileY][tileX];
    this.tileObects[tileY][tileX] = null;

    this.renderList.remove(object);

    return object;
};


Level.prototype.update = function (deltaSeconds)
{
    if (this.player)
        this.player.update(deltaSeconds);

    this.enemies.forEach(function(obj){
        obj.update(deltaSeconds);
    });

    if (this.key)
        this.key.update(deltaSeconds);

    if(this.goal)
        this.goal.update(deltaSeconds);

    this.particles && this.particles.update(deltaSeconds);

    if(!this.active && this.player)
    {
        this.frames++;
        if(this.frames>3)
        {
            this.active = true;
            this.enemies.forEach(function(obj){
                obj.activate();
            });
            this.player.activate();
        }
    }
};

Level.prototype.render = function (context)
{
    context.fillStyle = "#222";
    context.fillRect(0,0,this.tilesX*this.tileSize,this.tilesY*this.tileSize);
    context.fillStyle = "#2A2A2A";
    this.bgLayer.forEach(function (obj)
    {
        context.fillRect(obj.x, obj.y, obj.size, obj.size);
    });

    this.renderList.forEach(function(obj)
    {
        obj.render(context);
    });

    this.enemies.forEach(function(obj)
    {
        obj.render(context);
    });

    if (this.player)
        this.player.render(context);

    this.particles && this.particles.render(context);
};

ctor(Level);
