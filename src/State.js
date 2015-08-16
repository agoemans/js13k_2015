function State()
{
    this.renderList = [];
};

State.prototype = Object.create(Object.prototype);

State.prototype.enter = function(){
};

State.prototype.leave = function(){
};

State.prototype.add = function(obj) {
    this.renderList.push(obj);
};

State.prototype.remove = function(obj) {
    var i = this.renderList.indexOf(obj);
    if(i != -1)
        this.renderList.splice(i,1);
};

State.prototype.clear = function()
{
    this.renderList = [];
}

State.prototype.update = function(deltaSeconds){
    this.renderList.forEach(function(obj){
        obj.update(deltaSeconds);
    });
};

State.prototype.render = function(context){

    this.renderList.forEach(function(obj){
        obj.render(context);
    });
};


State.prototype.mouseUp = function(x,y)
{
    this.renderList.forEach(function(obj){
        obj.render(context);
    });
};

State.prototype.mouseDown = function(x,y)
{
    this.renderList.forEach(function(obj){
        obj.render(context);
    });
};

State.prototype.mouseMove = function(x,y)
{
    this.renderList.forEach(function(obj){
        obj.render(context);
    });
};

ctor(State);




