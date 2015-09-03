/**
 * Created by David on 15-Aug-15.
 */

var states = {};
var activeState = null;
var gameWidth = 0;
var gameHeight = 0;

function initGame(w,h)
{
    gameWidth = w;
    gameHeight = h;
    states.menu = new Menu();
    states.game = new Game();
    goto("menu");
}

function updateGame(deltaSeconds)
{
    activeState.update(deltaSeconds);
}

function renderGame(context)
{
    activeState.render(context);
}

function goto(state, config)
{
    if(activeState)activeState.leave();
    activeState = states[state];
    activeState.enter(config);
}

function mouseUp(x,y)
{
    activeState.mouseUp(x,y);
}

function mouseDown(x,y)
{
    activeState.mouseDown(x,y);
}

function mouseMove(x,y)
{
    activeState.mouseMove(x,y);
}

function keyDown(key)
{
    activeState.keyDown(key);
}

function keyUp(key)
{
    activeState.keyUp(key);
}