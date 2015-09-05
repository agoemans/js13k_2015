/**
 * Created by David on 15-Aug-15.
 */
var game = (function(){
    
    var module = {};
    
    module.states = {};
    module.activeState = null;
    module.width = 0;
    module.height = 0;

    module.initGame = function(w,h)
    {
        module.width = w;
        module.height = h;
        module.states.menu = new Menu();
        module.states.game = new Game();
        module.goto("menu");
    };

    module.updateGame = function(deltaSeconds)
    {
        module.activeState.update(deltaSeconds);
    };

    module.renderGame = function(context)
    {
        module.activeState.render(context);
    };

    module.goto = function(state, config)
    {
        if(module.activeState)module.activeState.leave();
        module.activeState = module.states[state];
        module.activeState.enter(config);
    };

    module.mouseUp = function(x,y)
    {
        module.activeState.mouseUp(x,y);
    };

    module.mouseDown = function(x,y)
    {
        module.activeState.mouseDown(x,y);
    };

    module.mouseMove = function(x,y)
    {
        module.activeState.mouseMove(x,y);
    };

    module.keyDown = function(key)
    {
        module.activeState.keyDown(key);
    };

    module.keyUp = function(key)
    {
        module.activeState.keyUp(key);
    };

    return module;
}());
