function checkType(param, type){
	if(typeof type === "string"){
		if(typeof param !== type)
			return false;
	}else{
		if(! (param instanceof type))
			return false;
	}
	return true;
}

function assertType(param, type){
	if(! checkType(param, type))
		throw("Parameter not of type "+type.name);	
	return param;
}

function getType(param){
	if(typeof param === "object")
		return param.constructor;
	else
		return typeof param;
}

function checkConfig(obj,config){

		for(let field in config){			
			if(! obj.hasOwnProperty(field))
				throw("Parameter "+field+" is not ammitted for Ball");	
			if(! checkType(config[field], getType(obj[field])))
				throw("Parameter "+field+" is of wrong type");
			obj[field] = config[field];
		}
		
		for(let checked in obj.checkers)
			if(! obj.checkers[checked](obj[checked]))
				throw ("Parameter "+checked+" not acceptable");
			
}


class Vector{
	
	x = 0;
	y = 0;
	
	constructor(x,y){
		if(typeof x === "number")
			this.x = x;
		if(typeof y === "number")
			this.y = y;
		if(x instanceof Vector){
			this.x = x.x;
			this.y = x.y;
		}
	}
	
	add(displacement){
		assertType(displacement, Vector);
		this.x += displacement.x;
		this.y += displacement.y;
		return this;
	}
	
	sub(displacement){
		assertType(displacement, Vector);
		this.x -= displacement.x;
		this.y -= displacement.y;
		return this;
	}
	
	set(point){
		assertType(point, Vector);
		this.x = point.x;
		this.y = point.y;
		return this;
	}
	
	mul(scale){
		assertType(scale, "number");
		if(isNaN(scale))
			throw("Cannot scale a Vector by NaN");
		this.x *= scale;
		this.y *= scale;
		return this;
	}
	
	dot(v){
		assertType(v, Vector);
		return this.x*v.x+this.y*v.y;
	}
	
	len(){
		return Math.hypot(this.x,this.y);
	}
	
	distance(v){
		assertType(v, Vector);
		return Math.hypot(this.x-v.x,this.y-v.y);
	}
	
	normalize(){
		let scale = 1.0/this.len();
		this.mul(scale);
		return this;
	}
	
	toString(){
		return "Vector: [x:"+this.x+",y:"+this.y+"]";
	}
	
}

class Ball{
	
	position = new Vector();
	speed = new Vector();
	radius = 10.0;
	mass = 1.0;
	color = "#ff0000";
	
	checkers = {
		radius: (r)=>r>=0,
		color: (v)=>{return v.length === 7;}
	}
	
	constructor(config){
		checkConfig(this,config);			
	}
	
	place(newposition){
		this.position.set(newposition);
		return this;
	}
	
	move(displacement){
		this.position.add(displacement);
		return this;
	}
	
	update(timestep){
		this.move((new Vector(this.speed)).mul(timestep));
		return this;
	}

	toString(){
		return "position: "+this.position+" radius: "+this.radius+" speed: "+this.speed;
	}
	
	touchesBall(otherBall){
		checkType(otherBall,Ball);
		return this.position.distance(otherBall.position) <= this.radius+otherBall.radius;
	}
	
	bounceWithBall(ball){
	   checkType(ball,Ball);
       let delta  = (new Vector(this.position)).sub(ball.position).normalize();
       let impulse = 2 * (new Vector(this.speed)).sub(ball.speed).dot(delta) / ( (1/this.mass) + (1/ball.mass) );
       if(impulse < 0){
          this.speed.sub( (new Vector(delta)).mul( impulse / this.mass ) );
          ball.speed.add( (new Vector(delta)).mul( impulse / ball.mass ) );
       }               
    }
	
	touchesSegment(segment){
	   checkType(segment,Segment);
       return segment.distanceFromPoint(this.position)<=this.radius &&
              segment.orthogonalVectorFromPoint(this.position).dot(this.speed)>0.0;
    }
	
	bounceWithSegment(l){
	   checkType(l,Segment);
       let n = l.direction();
       this.speed = new Vector(this.speed.dot(new Vector(n.x*n.x-n.y*n.y,2*n.x*n.y)),
                               this.speed.dot(new Vector(2*n.x*n.y,n.y*n.y-n.x*n.x)));
    }
	
}

class Segment{
		
	constructor(a,b){
		this.a = assertType(a, Vector);
		this.b = assertType(b, Vector);
	}
	
	len(){
		return this.a.distance(this.b);
	}

	direction(){
       //let l = this.a.distance(this.b);
       //return new Vector((this.b.x-this.a.x)/l,(this.b.y-this.a.y)/l);
	   return (new Vector(this.b)).sub(this.a).normalize();
    }  
		
	distanceFromPoint(p){
	   checkType(p,Vector);
       let l2 = this.a.distance(this.b);
       let t = ((p.x - this.a.x) * (this.b.x - this.a.x) + (p.y - this.a.y) * (this.b.y - this.a.y)) / (l2*l2);
       if (t < 0) return p.distance(this.a);
       if (t > 1) return p.distance(this.b);;
       return p.distance(new Vector( this.a.x + t * (this.b.x - this.a.x), this.a.y + t * (this.b.y - this.a.y) ));
    }
	
	orthogonalVectorFromPoint(p){
	   checkType(p,Vector);
       let direction = this.direction();
       let projection = (new Vector(p)).sub(this.a).dot(direction);
       let orthogonal = (new Vector(this.a)).add(direction.mul(projection)).sub(p);
       return orthogonal;
    }
}