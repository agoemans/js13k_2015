function Menu()
{
    State.call(this);
};

Menu.prototype = Object.create(State.prototype);

Menu.prototype.enter = function()
{
    State.prototype.enter.call(this);
    var text = new Text(canvasWidth/2 - 250, 100, 120, "Roboto Thin", "Reversed");
    this.add(text);

    this.playButton = new Text(canvasWidth/2 - 50, canvasHeight/2 - 60, 60, "Roboto Thin", "Play");
    this.add(this.playButton);
    this.playButton.onClick = function(){
        goto("game", { level: 'assets/level1.txt' });
    };

    text = new Text(canvasWidth/2 - 130, canvasHeight - 40, 20, "Roboto Thin", "by David & Amy Goemans");
    this.add(text);
};

Menu.prototype.update = function(deltaSeconds){
    State.prototype.update.call(this, deltaSeconds);
};

ctor(Menu);
