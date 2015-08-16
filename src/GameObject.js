function GameObject(x,y)
{
    this.x = x;
    this.y = y;
    this.width = 0;
    this.height = 0;
    console.log("adding game object at: " + x + ", " + y );
};

GameObject.prototype = Object.create(Object.prototype);

GameObject.prototype.update = function(deltaSeconds){

};

GameObject.prototype.render = function(context){

};

GameObject.prototype.contains = function(x,y){
    if(x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height)
    {
        return true;
    }
    return false;
};


ctor(GameObject);
