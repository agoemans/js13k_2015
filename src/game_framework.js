// Required functions to implementation
// function initGame(canvasWidth, canvasHeight)
// function updateGame(deltaSeconds)
// function renderGame(context)
// function mouseMove(x,y)

var mobile = (/android|webos|iphone|ipad|ipod|blackberry/i.test(navigator.userAgent.toLowerCase()));

var then = Date.now();
var context = null;
var drawFps = true;

var canvasWidth = 800;
var canvasHeight = 480;

var localCanvas = null;
var localContext = null;

var backgroundCanvas = null;
var backgroundContext = null;

var drawStaticBackground = null;

window.onload = function()
{
    var canvas = document.getElementById("game");

    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;

    context = canvas.getContext("2d");

    context.canvas.width  = window.innerWidth;
    context.canvas.height = window.innerHeight;

    localCanvas = document.createElement('canvas');
    localCanvas.width = canvasWidth;
    localCanvas.height = canvasHeight;
    localContext = localCanvas.getContext('2d');

    backgroundCanvas = document.createElement('canvas');
    backgroundCanvas.width = canvasWidth;
    backgroundCanvas.height = canvasHeight;
    backgroundContext = backgroundCanvas.getContext('2d');

    game.initGame(canvasWidth, canvasHeight);

    if( drawStaticBackground != null )
        drawStaticBackground(backgroundContext);

    requestAnimationFrame(update);

    document.addEventListener("keydown",function(){
        game.keyDown(String.fromCharCode(event.keyCode))
    }, false);

    document.addEventListener("keyup",function(){
        game.keyUp(String.fromCharCode(event.keyCode))
    }, false);

    canvas.addEventListener('mousemove', function(evt)
    {
        var mousePos = getMousePos(canvas, evt);
        game.mouseMove(mousePos.x, mousePos.y)
    }, false);

    canvas.addEventListener('mousedown', function(evt)
    {
        var mousePos = getMousePos(canvas, evt);
        game.mouseDown(mousePos.x, mousePos.y)
    }, false);

    canvas.addEventListener('mouseup', function(evt)
    {
        var mousePos = getMousePos(canvas, evt);
        game.mouseUp(mousePos.x, mousePos.y)
    }, false);

}

function update()
{
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    localContext.save();

    localContext.clearRect(0, 0, canvasWidth, canvasHeight);

    var now = Date.now();
    var delta = Math.min(1000, now - then); // Worst case = 1fps
    var deltaSeconds = delta/1000;

    game.updateGame(deltaSeconds);
    game.renderGame(localContext);

    if( drawFps )
    {
        localContext.fillStyle= "#000";
        localContext.fillRect(0,0,60,15);
        localContext.fillStyle = "#fff";
        var fps = Math.floor(1 / deltaSeconds);

        localContext.font = "10px Roboto";
        localContext.fillText("FPS: " + fps,10,10);
    }

    localContext.restore();

    context.drawImage(backgroundCanvas, 0, 0, canvasWidth, canvasHeight);
    context.drawImage(localCanvas, 0, 0, canvasWidth, canvasHeight);
    requestAnimationFrame(update);

    then = now;
}