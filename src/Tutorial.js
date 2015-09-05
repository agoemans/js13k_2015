function Tutorial()
{
    State.call(this);
    this.width = 400;
    this.height = 200;
};

Tutorial.prototype = Object.create(State.prototype);

Tutorial.prototype.enter = function (config)
{
    State.prototype.enter.call(this);

    this.height = 200;
    this.clear();

    var text = new Text(this.width / 2 - 60, 40, 32, "Trebuchet MS", "Tutorial");
    this.add(text);

    var height = 120;
    var lineHeight = 40;
    config.lines.forEach(function(line){
        text = new Text(this.width / 2 - 160, height, 24, "Trebuchet MS ", line);
        this.add(text);
        height += lineHeight;
        this.height += lineHeight;
    }.bind(this));

};

Tutorial.prototype.render = function (context)
{
    context.setTransform(1,0,0,1,(game.width - this.width)/2,(game.height - this.height)/2);
    context.strokeStyle = "#333333";
    context.strokeRect(0, 0, this.width, this.height);
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, this.width, this.height);
    State.prototype.render.call(this, context);
    context.setTransform(1,0,0,1,0,0);
};

ctor(Tutorial);