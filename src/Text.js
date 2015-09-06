function Text(x, y, size, font, text)
{
    GameObject.call(this, x, y);

    this.text = text;
    this.font = font;
    this.height = size;
    this.style = this.height + "px " + font;
    this.color = "#333";
};

Text.prototype = Object.create(GameObject.prototype);

Text.prototype.update = function (deltaSeconds)
{

};

Text.prototype.render = function (context)
{
    context.font = this.style;

    if (!this.width)
        this.width = context.measureText(this.text).width;

    context.fillStyle = this.color;
    context.fillText(this.text, this.x, this.y + this.height);
};

ctor(Text);
