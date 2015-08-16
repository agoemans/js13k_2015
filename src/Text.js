function Text(x, y, size, font, text)
{
    this.text = text;
    this.font = font;
    this.height = size;
    this.style = this.height + "px " + font;

    GameObject.call(this, x, y);
};

Text.prototype = Object.create(GameObject.prototype);

Text.prototype.update = function(deltaSeconds){

};

Text.prototype.render = function(context) {
    context.font = this.style;

    if(!this.width)
        this.width = context.measureText(this.text);

    context.fillText(this.text, this.x, this.y);
};

ctor(Text);
