function renderAllSvg(svg, objects)
{
    objects.forEach(function (o) {
        renderDispatch(svg, o);
    });
}

var ball1 = document.getElementById("g4441");

function renderDispatch(context, object)
{
    if (object instanceof Pole)
        render_Pole(context, object);
    if (object instanceof PoolBall)
        render_Ball(context, object);
}

function render_Ball(context, object)
{
    if (!object.svgBuffer)
    {
        object.svgBuffer = document.getElementById("ball_" + object.number);
        let rect = object.svgBuffer.getBBox();
        object.svgBuffer.baseScale = object.radius * 2 / rect.width;
        object.svgBuffer.baseTranslate = new Vector(rect.x + rect.width / 2, rect.y + rect.height / 2);
        object.svgBuffer.baseTranslate.mul(-object.svgBuffer.baseScale);
        context.appendChild(object.svgBuffer);
    }
    let trans_x = object.svgBuffer.baseTranslate.x + object.position.x;
    let trans_y = object.svgBuffer.baseTranslate.y + object.position.y;
    let scale = object.svgBuffer.baseScale;
    object.svgBuffer.setAttribute("transform", "translate(" + trans_x + "," + trans_y + ") scale(" + scale + ")");
}

function render_Pole(context, object)
{
    if (!object.svgBuffer)
    {
        object.svgBuffer = document.createElementNS("http://www.w3.org/2000/svg", "line");
        object.svgBuffer.setAttribute("style", "stroke:rgb(255,255,0);stroke-width:5");
        context.appendChild(object.svgBuffer);
    }
    object.svgBuffer.setAttribute("x1", object.a.x+0);
    object.svgBuffer.setAttribute("y1", object.a.y+0);
    object.svgBuffer.setAttribute("x2", object.b.x+0);
    object.svgBuffer.setAttribute("y2", object.b.y+0);
}