function Level(file)
{
    this.tileSize = 64;
    this.xOffset = 1;
    this.yOffset = 1;

    // Sample level
    this.tiles = [
        ['_','_','_','_','_','_','_','_','_','_','W','W'],
        ['_','_','_','_','_','_','_','_','_','_','W','W'],
        ['_','_','_','_','_','_','_','_','_','_','_','_'],
        ['_','_','_','_','_','_','_','_','_','_','_','_'],
        ['_','_','_','_','_','_','_','_','_','_','_','_'],
        ['_','_','_','_','_','_','W','W','_','_','_','_'],
        ['_','_','_','_','_','_','W','W','_','_','_','X'],
        ['S','_','_','_','_','_','W','W','_','_','_','_']
    ];

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

    for(var x=0; x<this.tilesX; x++)
        for(var y=0; y<this.tilesY; y++)
            if(x === 0 || x === this.tilesX-1 || y === 0 || y === this.tilesY-1)
                this.addTile('W', x,y);

    for(var y=0; y<this.tiles.length;y++)
    {
        var row = this.tiles[y];
        for(var x=0; x<row.length;x++)
        {
            var tile = row[x];
            this.addTile(tile, x+this.xOffset, y+this.yOffset);
        }
    }
};

Level.prototype.addTile = function(char, x, y)
{
    var imageName = "";
    switch(char)
    {
        case 'W':
            imageName = Math.random() < 0.5 ? "assets/wall.png" : "assets/wall2.png";
            break;
        case 'X':
            imageName = "assets/win.png";
            this.addTile('BG', x,y);
            break;
        case 'BG':
            imageName = "assets/bg.png";
            break;
        default:
            this.addTile('BG', x,y);
            return;
    }

    var sprite = new Sprite(x*this.tileSize, y*this.tileSize,imageName);
    this.renderList.push(sprite);
};

Level.prototype.update = function(deltaSeconds){
};

Level.prototype.render = function(context) {
    this.renderList.forEach(function(obj){
        obj.render(context);
    });
};

ctor(Text);
