function renderAllSvg(svg, objects){
    objects.forEach(function(o) {renderSvg(svg, o);});
}

function renderSvg(context, object){
	switch(object.constructor){
		case Ball:
			if(!object.svgBuffer){
				object.svgBuffer = document.createElementNS("http://www.w3.org/2000/svg", "circle");
				object.svgBuffer.setAttribute("stroke", "black");
				object.svgBuffer.setAttribute("r", object.radius);
				object.svgBuffer.setAttribute("fill", object.color);
				context.appendChild(object.svgBuffer);
			}
			object.svgBuffer.setAttribute("cx", object.position.x);
			object.svgBuffer.setAttribute("cy", object.position.y);
			break;
		case Segment:
			if (!object.svgBuffer){
				object.svgBuffer = document.createElementNS("http://www.w3.org/2000/svg", "line");
				object.svgBuffer.setAttributeNS(null, "stroke", "black");
				context.appendChild(object.svgBuffer);
			}
			object.svgBuffer.setAttribute("x1", object.a.x);
			object.svgBuffer.setAttribute("y1", object.a.y);
			object.svgBuffer.setAttribute("x2", object.b.x);
			object.svgBuffer.setAttribute("y2", object.b.y);
			break;
		default: throw "Unable to render a "+object.constructor.name
	}
}