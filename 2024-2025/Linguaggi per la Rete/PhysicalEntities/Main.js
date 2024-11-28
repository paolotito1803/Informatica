window.onload = function(){
	
    let colors = [
        "#ffffff", "#ff0000", "#00ff00", "#0000ff", "#ffff00", "#00ffff", "#ff00ff",
        "#888888", "#880000", "#008800", "#000088", "#888800", "#008888", "#880088"
    ];

	let width = 640;
    let height = 480;
	
	let balls = [];
	for (let b = 0; b < 30; b++)
    {
        balls.push(new Ball({
            position: new Vector(Math.random() * width, Math.random() * height),
            radius  : Math.random() * 20 + 5,
            speed   : new Vector((Math.random() - 0.5), (Math.random() - 0.5)).mul(0.5),
            color   : colors[Math.floor(Math.random() * colors.length)]  
        }));
    }
	
	let lines = [];
    lines.push(new Segment(new Vector(10, 10), new Vector(width - 10, 10)));
    lines.push(new Segment(new Vector(10, height - 10), new Vector(width - 10, height - 10)));
    lines.push(new Segment(new Vector(10, 10), new Vector(10, height - 10)));
    lines.push(new Segment(new Vector(width - 10, 10), new Vector(width - 10, height - 10)));
    lines.push(new Segment(new Vector(width * 0.3, height * 0.4), new Vector(width * 0.3, height * 0.6)));

	
	let svgOutput = document.getElementById("mySvg");
	let canvasOutput = document.getElementById("myCanvas");
	
	let currentTime = Date.now();
    let lastTime = Date.now();
	
	setInterval(function(){
		
	   currentTime = Date.now();
       let elapsed = currentTime - lastTime;
       lastTime = currentTime;
		
	   let microSteps = 10;
       let timeStep = elapsed / microSteps;
		
	   while(microSteps-->0){
		
		   for (let b1 = 0; b1 < balls.length; b1++)
			  for (let b2 = b1 + 1; b2 < balls.length; b2++)
				  if (balls[b1].touchesBall(balls[b2]))
					   balls[b1].bounceWithBall(balls[b2]);
			
		   for (let b = 0; b < balls.length; b++)
				for (let l = 0; l < lines.length; l++)
					if (balls[b].touchesSegment(lines[l]))
						balls[b].bounceWithSegment(lines[l]);	
			
		   for (let b1 = 0; b1 < balls.length; b1++)
			   balls[b1].update(timeStep);
	   }
	   
	   renderAllSvg(svgOutput, [...balls,...lines]);
	   renderAllCanvas(canvasOutput, [...balls,...lines]);
	   renderAllWebGl([...balls,...lines]);
	   
	},20);
}