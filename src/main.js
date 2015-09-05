/**
 * Created by David on 15-Aug-15.
 */
var game = (function(){
    
    var module = {};
    
    module.states = {};
    module.activeState = null;
    module.overlay = null;
    module.width = 0;
    module.height = 0;

    module.initGame = function(w,h)
    {
        module.width = w;
        module.height = h;
        module.audio = new AudioPlayer();
        module.states["menu"] = new Menu();
        module.states["game"] = new Game();
        module.states["tutorial"] = new Tutorial();
        module.goto("menu");
    };

    module.updateGame = function(deltaSeconds)
    {
        module.activeState.update(deltaSeconds);

        if(module.overlay)
            module.overlay.update(deltaSeconds);
    };

    module.renderGame = function(context)
    {
        module.activeState.render(context);

        if(module.overlay)
            module.overlay.render(context);
    };

    module.goto = function(state, config)
    {
        if(module.activeState)module.activeState.leave();
        module.activeState = module.states[state];
        module.activeState.enter(config);
    };

    module.popup = function(state, config)
    {
        module.overlay = module.states[state];
        module.overlay.enter(config);
    };

    module.mouseUp = function(x,y)
    {
        if(module.overlay)
        {
            module.overlay.leave();
            module.overlay = null;
        }
        else
            module.activeState.mouseUp(x,y);
    };

    module.mouseDown = function(x,y)
    {
        if(!module.overlay)
            module.activeState.mouseDown(x,y);
    };

    module.mouseMove = function(x,y)
    {
        if(!module.overlay)
            module.activeState.mouseMove(x,y);
    };

    module.keyDown = function(key)
    {
        if(!module.overlay)
            module.activeState.keyDown(key);
    };

    module.keyUp = function(key)
    {
        if(module.overlay)
        {
            module.overlay.leave();
            module.overlay = null;
        }
        else
            module.activeState.keyUp(key);
    };

    return module;
}());
