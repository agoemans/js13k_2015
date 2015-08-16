function Menu()
{
    State.call(this);
};

Menu.prototype = Object.create(State.prototype);

Menu.prototype.enter = function()
{
    State.prototype.enter.call(this);
    var spr = new Sprite(50, 100, "assets/foot.png");
    var text = new Text(350, 200, 30, "Roboto Thin", "Hihi");
    this.add(spr);
    this.add(text);
};

Menu.prototype.leave = function()
{
    State.prototype.leave.call(this);
};

Menu.prototype.update = function(deltaSeconds){
    State.prototype.update.call(this, deltaSeconds);
};

Menu.prototype.render = function(context){
    State.prototype.render.call(this, context);
};

ctor(Menu);
