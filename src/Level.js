function Level(file)
{
    this.tileSize = 64;
    this.xOffset = 1;
    this.yOffset = 1;
    this.respawnTime = 1;

    this.player = null;
    this.enemies = [];

    this.width = 0;
    this.height = 0;


    // Sample level
    this.tiles = [];

    this.tileObects = [];

    this.bgLayer = [];
    this.renderList = [];
    this.file = file;
    this.loadLevel(file);

    this.particles = new ParticleEmitter(0,0,this.respawnTime);

    Level.instance = this;
};

Level.prototype = Object.create(Object.prototype);

Level.prototype.levelLoaded = function(data)
{
    this.tiles = data;
    this.processLevel();
}

Level.prototype.processFileData = function(data)
{
    var templist = [];
    var mainlist = [];
    var i;
    templist = data.split("\n");
    for (i=0; i < templist.length; i++){
        mainlist.push(templist[i].trim().split(""));
    }
    this.levelLoaded(mainlist);

}


Level.prototype.loadLevel = function(file)
{
   loadFile(this.processFileData, this, file);
};

Level.prototype.processLevel = function()
{
    this.tilesX = this.tiles[0].length + 2;
    this.tilesY = this.tiles.length + 2;

    for(var y=0; y<this.tilesY; y++)
    {
        this.tileObects[y] = [];
        for(var x=0; x<this.tilesX; x++)
        {
            if(x === 0 || x === this.tilesX-1 || y === 0 || y === this.tilesY-1)
                this.addTile('W', x,y);
        }
    }

    for(var y=0; y<this.tiles.length;y++)
    {
        var row = this.tiles[y];
        for(var x=0; x<row.length;x++)
        {
            var newX = x+this.xOffset;
            var newY = y+this.yOffset;
            var sprite = new Sprite(newX*this.tileSize, newY*this.tileSize, "assets/bg.png");
            this.bgLayer.push(sprite);

            var tile = row[x];
            this.addTile(tile,newX, newY);
        }
    }

    this.width = this.tilesX * this.tileSize;
    this.height = this.tilesY * this.tileSize;
};

Level.prototype.addTile = function(char, x, y)
{
    var object = null;
    var pX = x*this.tileSize;
    var pY = y*this.tileSize;
    switch(char)
    {
        case 'W':
            object = new Sprite(pX, pY,Math.random() < 0.5 ? "assets/wall.png" : "assets/wall2.png");
            break;
        case 'X':
            object = new Goal(pX, pY, "assets/win.png");
            object.onGoalReached = this.levelComplete;
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
            setTimeout(function(){
                this.player = new Player(pX, pY - 10);
            }.bind(this), 500);
            break;
        default:
            break;
    }

    if(object)
    {

        this.renderList.push(object);
        this.tileObects[y][x] = object;
        return object;
    }

    return null;
};

Level.prototype.levelFailed = function()
{
    Level.instance.particles.emit(Level.instance.player.x + 20,Level.instance.player.y + 32);
    Level.instance.player.die();
    var levelStr = localStorage['js13_currentLevel'] || 1;
    var topLevel = parseInt(levelStr);


    // TODO:
    // Show lose popup
    //
    setTimeout(function(){
        goto("game", { level: topLevel });
    }.bind(this), Level.instance.respawnTime*1000);
};

Level.prototype.levelComplete = function()
{
    var levelStr = localStorage['js13_currentLevel'] || 1;

    var topLevel = parseInt(levelStr);
    topLevel++;
    localStorage['js13_currentLevel'] = topLevel;

    // TODO:
    // Show win popup
    //
    goto("game", { level: topLevel });
};

Level.prototype.tileAt = function(x,y)
{
    var tileX = Math.floor(x/this.tileSize);
    var tileY = Math.floor(y/this.tileSize);
    if(tileY >= this.tileObects.length || tileX > this.tileObects[tileY].length)
        return null;

    return this.tileObects[tileY][tileX];
};

Level.prototype.removeAt = function(x,y)
{
    var tileX = Math.floor(x/this.tileSize);
    var tileY = Math.floor(y/this.tileSize);
    if(tileY >= this.tileObects.length || tileX > this.tileObects[tileY].length)
        return null;

    var object = this.tileObects[tileY][tileX];
    this.tileObects[tileY][tileX] = null;

    this.renderList.remove(object);

    return object;
};


Level.prototype.update = function(deltaSeconds){
    if(this.player)
        this.player.update(deltaSeconds);

    this.particles && this.particles.update(deltaSeconds);
};

Level.prototype.render = function(context) {

    this.bgLayer.forEach(function(obj){
        obj.render(context);
    });

    this.renderList.forEach(function(obj){
        obj.render(context);
    });

    if(this.player)
        this.player.render(context);

    this.particles && this.particles.render(context);
};

ctor(Text);
