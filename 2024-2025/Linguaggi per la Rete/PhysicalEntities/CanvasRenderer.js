function renderAllCanvas(canvas, objects){
	let context = canvas.getContext("2d");
	context.fillStyle="#44bbff";
	context.fillRect(0,0,canvas.width,canvas.height);
	objects.forEach(function(o){renderCanvas(context,o);});
}

function renderCanvas(context, object){
	switch(object.constructor){
		case Ball:
			context.fillStyle=object.color;
			context.beginPath();
			context.arc(object.position.x,object.position.y,object.radius,0,2*Math.PI);
			context.fill();
			context.stroke(); 
			break;
		case Segment:
			context.beginPath();
			context.moveTo(object.a.x,object.a.y);
			context.lineTo(object.b.x,object.b.y);
			context.stroke();
			break;
		default: throw "Unable to render a "+object.constructor.name
	}
}