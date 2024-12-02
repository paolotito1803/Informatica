window.onload = function() {
    startGame(document.getElementById("mySvg"));
};

let currentThread = undefined;


class PoolBall extends Ball{
    
    static defaultRadius = 22;

    constructor(position, speed, number){
        super({
            position: position,
            radius  : PoolBall.defaultRadius,
            speed   : speed
        });
        this.number = number;    
    }
    
    update(timeStep){
        this.move((new Vector(this.speed)).mul(timeStep));
        while(timeStep-->0)
            this.speed.mul(0.9996);
    }
}


class Pole extends Segment{
    
    constructor(a, b){
        super(a,b);    
        this.isPole = "yes";
    }
    
    reset(){
        this.a = new Vector(0,0);
        this.b = new Vector(0,0);
    }
}


function startGame(svg){
    
    let width = svg.getBoundingClientRect().width;
    let height = svg.getBoundingClientRect().height;
    let fps = document.getElementById("fps");

    let balls = [];
    let lines = [];
    let drawables = [];

    let currentPole = new Pole(new Vector(0,0),new Vector(0,0));
    drawables.push(currentPole);

    let ballNumber = 1;
    for (let line = 0; line <= 4; line++)
    {
        let radius = PoolBall.defaultRadius * 2;
        let startY = (height - line * radius) / 2;
        let startX = (width / 2)*0.8 - line * radius;
        for (let column = 0; column <= line; column++)
        {
            let center = new Vector(startX, startY+column*radius);
            let speed = new Vector(0, 0);
            let ball = new PoolBall(center, speed, ballNumber++);
            balls.push(ball);
            drawables.push(ball);
        }
    }
    let white = new PoolBall(new Vector(width*0.7,height/ 2), new Vector(0,0), 0);
    balls.push(white);
    drawables.push(white);


    function addLine(line)
    {
        drawables.push(line);
        lines.push(line);
        return line;
    }
    addLine(new Segment(new Vector(67, 110), new Vector(67, 458)));
    addLine(new Segment(new Vector(107, 67), new Vector(461, 67)));
    addLine(new Segment(new Vector(535, 67), new Vector(890, 67)));
    addLine(new Segment(new Vector(107, 500), new Vector(461, 500)));
    addLine(new Segment(new Vector(535, 500), new Vector(890, 500)));
    addLine(new Segment(new Vector(930, 110), new Vector(930, 458)));
    
    addLine(new Segment(new Vector(30, 30), new Vector(30, 540))).hole = true;
    addLine(new Segment(new Vector(30, 30), new Vector(970, 30))).hole = true;
    addLine(new Segment(new Vector(30, 540), new Vector(970, 540))).hole = true;
    addLine(new Segment(new Vector(970, 30), new Vector(970, 540))).hole = true;


    window.addEventListener("mousedown",
        function(event)
        {
            currentPole.a = new Vector(event.x - svg.clientLeft, event.y - svg.clientTop);
            currentPole.b = new Vector(currentPole.a);
        });

    window.addEventListener("mousemove",
        function(event)
        {
            if(currentPole.a.len()>0.0)
                currentPole.b = new Vector(event.x - svg.clientLeft, event.y - svg.clientTop);
        });

    window.addEventListener("mouseup",
        function(event)
        {
            if(currentPole.a.len()>0.0)
            {
                if(currentPole.len()>0)
                    white.speed = (new Vector(currentPole.a)).sub(currentPole.b).mul(0.005);
                currentPole.reset();
            }
        });


    if (currentThread !== undefined)
        clearInterval(currentThread);

    let currentTime = Date.now();
    let lastTime = Date.now();
    let count = 0;
    let numSamples = 50;
    let totalFps = 0;

    currentThread = setInterval(
            function()
            {
                currentTime = Date.now();
                let elapsed = currentTime - lastTime;
                lastTime = currentTime;

                totalFps += 1000 / elapsed;
                if (count++ % numSamples === 0)
                {
                    fps.innerHTML = "fps: " + totalFps / numSamples;
                    totalFps = 0;
                }

                let steps = 10;
                let ministep = elapsed / steps;

                while (steps-- > 0)
                {

                    for (let b1 = 0; b1 < balls.length; b1++)
                        for (let b2 = b1 + 1; b2 < balls.length; b2++)
                            if (balls[b1].touchesBall(balls[b2]))
                                balls[b1].bounceWithBall(balls[b2]);

                    for (let b = 0; b < balls.length; b++)
                        for (let l = 0; l < lines.length; l++)
                            if (balls[b].touchesSegment(lines[l]))
                                if(lines[l].hole)
                                    balls[b].place(new Vector(-100,-100));
                                else    
                                    balls[b].bounceWithSegment(lines[l]);

                    for (let b1 = 0; b1 < balls.length; b1++)
                        balls[b1].update(ministep);

                }

                renderAllSvg(svg, drawables);
            },
            20
            );

}
