function Text(x, y, font, text)
{
    this.text = text;
    this.font = font;

    GameObject.call(this, x, y);
};

Text.prototype = Object.create(GameObject.prototype);

Text.prototype.update = function(deltaSeconds){

};

Text.prototype.render = function(context){
    context.font = this.font;
    context.fillText(this.text, this.x, this.y);
};

ctor(Text);
