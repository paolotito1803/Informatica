let scene = new THREE.Scene();
let renderer = new THREE.WebGLRenderer();
renderer.setClearColor( 0x44bbFF, 1);
renderer.setSize(640,480);
document.body.appendChild( renderer.domElement );
let tcamera = new THREE.PerspectiveCamera( 35, 640/480, 0.1, 2000 );
tcamera.position.z = 780;	
let light = new THREE.PointLight( 0xffffff, 3, 100000 );
light.position.set( 0, 0, 50 );
scene.add( light );
let controls = new THREE.OrbitControls( tcamera, renderer.domElement );
controls.minDistance = 2;
controls.maxDistance = 2000;
//scene.add( new THREE.AxesHelper( 20 ) );
(function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene,tcamera);
})();

function renderAllWebGl(objects)
{
    objects.forEach(function(o) {renderWebGl(o);});
}

function renderWebGl(object)
{
	switch(object.constructor){
		case Ball:
			if (!object.glBuffer)
			{
				let geometry = new THREE.CylinderGeometry( object.radius, object.radius, 10, 32 );
				let material = new THREE.MeshLambertMaterial( {color: object.color} );
				object.glBuffer = new THREE.Mesh( geometry, material );
				object.glBuffer.rotation.x = Math.PI / 2;
				scene.add( object.glBuffer );
			}
			object.glBuffer.position.x = object.position.x-320;
			object.glBuffer.position.y = 240-object.position.y;
			break;
		case Segment:
			if (!object.glBuffer)
			{
			   let geometry = new THREE.Geometry();
			   geometry.vertices.push(
				  new THREE.Vector3( object.a.x-320, 240-object.a.y, 0 ),
				  new THREE.Vector3( object.a.x-320, 240-object.a.y, 20 ),
				  new THREE.Vector3( object.b.x-320, 240-object.b.y, 0 ),
				  new THREE.Vector3( object.b.x-320, 240-object.b.y, 20 )
			   );
			   geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
			   geometry.faces.push( new THREE.Face3( 3, 2, 1 ) );
			   let material = new THREE.MeshLambertMaterial( { color: 0xffffff, opacity: 0.5, transparent: true, side: THREE.DoubleSide } );
			   object.glBuffer = new THREE.Mesh(geometry,material);
			   scene.add( object.glBuffer );
			}
			break;
    }
}
