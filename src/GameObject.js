function GameObject(x,y)
{
    this.x = x;
    this.y = y;
    console.log("adding game object at: " + x + ", " + y );
};

GameObject.prototype = Object.create(Object.prototype);

GameObject.prototype.update = function(deltaSeconds){

};

GameObject.prototype.render = function(context){

};

ctor(GameObject);
