/**
 * Created by David on 15-Aug-15.
 */

var renderList = [];

var gameFont = "30px Roboto Thin";

function initGame()
{
    var spr = new Sprite(50, 100, "assets/foot.png");
    var text = new Text(350, 200, gameFont, "Hihi");
    renderList.push(spr);
    renderList.push(text);
}

function updateGame(deltaSeconds)
{
    renderList.forEach(function(obj){
        obj.update(deltaSeconds);
    });
}

function renderGame(context)
{
    renderList.forEach(function(obj){
        obj.render(context);
    });
}