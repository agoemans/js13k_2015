function Level(file)
{
    this.tileSize = 64;
    this.xOffset = 1;
    this.yOffset = 1;

    this.player = null;
    this.enemies = [];

    // Sample level
    this.tiles = [
        ['S','_','_','_','_','_','_','_','_','_','W','W'],
        ['_','_','_','_','_','_','_','_','_','_','W','W'],
        ['_','_','_','_','_','_','_','_','_','_','_','_'],
        ['_','_','_','_','_','_','_','_','_','_','_','_'],
        ['_','_','_','_','_','_','_','_','_','_','_','_'],
        ['_','_','_','_','_','_','W','W','_','_','_','_'],
        ['_','_','_','_','_','_','W','W','_','_','_','X'],
        ['_','_','_','_','_','_','W','W','_','_','_','_']
    ];

    this.tileObects = [];

    this.bgLayer = [];
    this.renderList = [];
    this.file = file;
    this.loadLevel(file);
    this.processLevel();
};

Level.prototype = Object.create(Object.prototype);

Level.prototype.loadLevel = function(file)
{
    //TODO: ajax call, open file, read into tiles
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
    var imageName = null;
    switch(char)
    {
        case 'W':
            imageName = Math.random() < 0.5 ? "assets/wall.png" : "assets/wall2.png";
            break;
        case 'X':
            imageName = "assets/win.png";
            break;
        case 'S':
            this.player = new Player(x*this.tileSize, y*this.tileSize);
        default:
            break;
    }

    if(imageName)
    {
        var sprite = new Sprite(x*this.tileSize, y*this.tileSize,imageName);
        this.renderList.push(sprite);
        this.tileObects[y][x] = sprite;
        return sprite;
    }

    return null;
};

Level.prototype.tileAt = function(x,y)
{
    var tileX = Math.floor(x/this.tileSize);
    var tileY = Math.floor(y/this.tileSize);
    if(tileY >= this.tileObects.length || tileX > this.tileObects[tileY].length)
        return null;

    return this.tileObects[tileY][tileX];
};


Level.prototype.update = function(deltaSeconds){
    this.player.update(deltaSeconds);
};

Level.prototype.render = function(context) {

    this.bgLayer.forEach(function(obj){
        obj.render(context);
    });

    this.renderList.forEach(function(obj){
        obj.render(context);
    });

    this.player.render(context);
};

ctor(Text);
