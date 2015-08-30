function Level(file)
{
    this.tileSize = 64;
    this.xOffset = 1;
    this.yOffset = 1;

    this.player = null;
    this.enemies = [];

    // Sample level
    this.tiles = [];

    this.tileObects = [];

    this.bgLayer = [];
    this.renderList = [];
    this.file = file;
    this.loadLevel(file);
    
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
            object = new Spike(pX, pY, "assets/spike_top.png");
            object.onCollide = this.levelFailed;
            break;
        case '+':
            object = new Spike(pX, pY, "assets/spike_bottom.png");
            object.onCollide = this.levelFailed;
            break;
        case 'S':
            this.player = new Player(x*this.tileSize, y*this.tileSize);
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
    var levelStr = localStorage['js13_currentLevel'] || 1;
    var topLevel = parseInt(levelStr);


    // TODO:
    // Show lose popup
    //
    setTimeout(function(){
        goto("game", { level: topLevel });
    }.bind(this), 500);
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
};

ctor(Text);
