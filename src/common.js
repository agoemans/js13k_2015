// Override for requestAnimationFrame so it works on all browsers

(function()
{
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame || function(callback){ window.setTimeout(callback, 1000 / 60); };;
    window.requestAnimationFrame = requestAnimationFrame;
})();



function rgb(r,g,b)
{
    return "#" + Math.floor(r).toString(16) + Math.floor(g).toString(16) + Math.floor(b).toString(16);
};


function sign(x) { return x ? x < 0 ? -1 : 1 : 0; }


function getMousePos(canvas, evt)
{
    var rect = canvas.getBoundingClientRect();

    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
};



function fastRound(value)
{
    return ~~ (value + (value > 0 ? .5 : -.5));
}


function Color(r, g, b)
{

    this.r = r;
    this.g = g;
    this.b = b;

    this._tempLerpColor = null;

    this.toHex = function()
    {
        return rgb(this.r,this.g,this.b);
    }



    this.lerp = function(to, percentage)
    {

        if( this._tempLerpColor == null )
            this._tempLerpColor = new Color(0,0,0);

        this._tempLerpColor.r = Math.floor(this.r + (to.r - this.r)*percentage);
        this._tempLerpColor.g = Math.floor(this.g + (to.g - this.g)*percentage);
        this._tempLerpColor.b = Math.floor(this.b + (to.b - this.b)*percentage);

        return this._tempLerpColor;
    }

};



var White = new Color(255,255,255);

Array.prototype.clone = function() {
    return this.slice(0);
};

Math.clamp = function(value, min, max) { return Math.min(Math.max(value,min), max); };

Array.prototype.remove = function(object)
{
    this.splice(this.indexOf(object), 1);
};

function distance(x1, y1, x2, y2)
{
    return Math.sqrt((x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2));
}

function lerp(percent, min, max)
{
    return min + percent * (max - min);
}


Math.lerp = function(percent, min, max)
{
    return min + percent * (max - min);
}

function isFunction(possibleFunction)
{
    return (typeof(possibleFunction) == typeof(Function));
};

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function ctor(func)
{
    func.prototype.constructor = func;
}

function inherit(child, parent)
{
    child.prototype = Object.create(parent.prototype);
}


function proto(cls)
{
    return cls.prototype;
}
