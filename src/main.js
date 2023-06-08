// ----------------------------
// Inicialización de Variables:
// ----------------------------
var scene = null,
  camera = null,
  renderer = null,
  controls = null,
  Sphere = null,
  Sphere2 = null,
  clock = null;

var sound1 = null,
  countPoints = null,
  modelLoad = null,
  light = null,
  figuresGeo = [];

var MovingCube = null,
  collidableMeshList = [],
  lives = 0,
  numberToCreate = 5;

var color = new THREE.Color();

var scale = 1;
var rotSpd = 0.05;
var spd = 0.05;
var input = { left: 0, right: 0, up: 0, down: 0 };

var posX = 3;
var posY = 0.5;
var posZ = 1;

var position1 = [-1,0,6],
    position2 = [11,0,6],a
    position3 = [-1,0,-6],
    position4 = [11,0,-6];


// ----------------------------
// Funciones de creación init:
// ----------------------------
function start() {
  window.onresize = onWindowResize;
  initScene();
  animate();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function initScene() {
  initBasicElements(); // Scene, Camera and Render
  initSound();         // To generate 3D Audio
  createLight();       // Create light
  initWorld();
  createGeometries();
  _LoadModels();
  createPlayerMove();
  createFrontera();
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  sound1.update(camera);
  movePlayer();
  collisionAnimate();

  
}

function initBasicElements() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#app") });
  clock = new THREE.Clock();

  // controls = new THREE.OrbitControls(camera, renderer.domElement);
  // controls.update();

  scene.background = new THREE.Color(0x0099ff);
  scene.fog = new THREE.Fog(0xffffff, 0, 750);

  var light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
  light.position.set(0.5, 1, 0.75);
  scene.add(light);

  renderer.setSize(window.innerWidth, window.innerHeight - 4);
  document.body.appendChild(renderer.domElement);

  camera.position.x = 3;
  camera.position.y = 0.5;
  camera.position.z = 1;
}

function initSound() {
  sound1 = new Sound(["./songs/GustyGardenGalaxy.mp3"], 500, scene, {   // radio(10)
    debug: true,
    position: { x: camera.position.x, y: camera.position.y + 10, z: camera.position.z }
  });
}


function createGltfFunction(generalPath, pathGltf, position,indice, scale) {
  // Instantiate a loader
  const loader = new THREE.GLTFLoader();

  console.log("This is my Duck "+indice);
  // Optional: Provide a DRACOLoader instance to decode compressed mesh data
  const dracoLoader = new THREE.DRACOLoader();
  dracoLoader.setDecoderPath(generalPath);//'/examples/js/libs/draco/'
  loader.setDRACOLoader(dracoLoader);

  // Load a glTF resource
  loader.load(
    // resource URL
    pathGltf,//'models/gltf/duck/duck.gltf',
    // called when the resource is loaded
    function (gltf,) {
//loader.load(pathGltf,'modelos/island/)
      Ducks[indice] = gltf.scene;
      scene.add(gltf.scene);

      gltf.animations; // Array<THREE.AnimationClip>
      gltf.scene; // THREE.Group
      gltf.scenes; // Array<THREE.Group>
      gltf.cameras; // Array<THREE.Camera>
      gltf.asset; // Object

      gltf.scene.scale.set(scale,scale,scale);
      gltf.scene.position.set(position[0],position[1],position[2]);

    },
    // called while loading is progressing
    function (xhr) {

      console.log((xhr.loaded / xhr.total * 100) + '% loaded');

    },
    // called when loading has errors
    function (error) {

      console.log('An error happened');

    }
  );
}

function createLight() {
  var light2 = new THREE.AmbientLight(0xffffff);
  light2.position.set(10, 10, 10);
  scene.add(light2);
  light = new THREE.DirectionalLight(0xffffff, 0, 1000);
  scene.add(light);
}

function initWorld() {
  // Create Island
  var mtlLoader = new THREE.MTLLoader();
  mtlLoader.setTexturePath('./modelos/final/');
  mtlLoader.setPath('./modelos/final/');
  mtlLoader.load('final.mtl', function (materials) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('./modelos/final/');
    objLoader.load('final.obj', function (object) {

      modelLoad = object;
      figuresGeo.push(modelLoad);
      scene.add(object);
      collidableMeshList.push(object);

      object.scale.set(2,2,2);

      object.position.y = 3;
      object.position.x = 5;
      


    });
  })
       var positionFather = [position1,position2,position3,position4];

       for (var i = 0; i < 4; i++) {
         createGltfFunction("./modelos/rat/", "./modelos/rat/rat.mtl",positionFather[i],i,0.3);
     }
}
function createGeometries() {

  var loader = new THREE.TextureLoader();
   gold = loader.load('./img/GoldenEgg.jpeg');
  const geometry = new THREE.SphereGeometry( 0.25 );
  const material = new THREE.MeshBasicMaterial( { map: gold} );
  //const material = new THREE.MeshPhongMaterial( { color:0xf6d604 } );
  Sphere = new THREE.Mesh( geometry, material );
  scene.add( Sphere );
  collidableMeshList.push(Sphere);

  
  Sphere.position.z = -5.0;
  Sphere.position.y = 0.2;
  Sphere.position.x = 5.4;

  
 
  //const material = new THREE.MeshPhongMaterial( { color:0xf6d604 } );
  Sphere2 = new THREE.Mesh( geometry, material );
  scene.add( Sphere2 );
  collidableMeshList.push(Sphere2);
  
  Sphere2.position.z = 5;
  Sphere2.position.y = 0.2;
  Sphere2.position.x = 7;
  
  Sphere3 = new THREE.Mesh( geometry, material );
  scene.add( Sphere3 );
  collidableMeshList.push(Sphere3);
  
  Sphere3.position.z = 5.2;
  Sphere3.position.y = 0.2;
  Sphere3.position.x = 7.5;

  Sphere4 = new THREE.Mesh( geometry, material );
  scene.add( Sphere4 );
  collidableMeshList.push(Sphere4);
  
  Sphere4.position.z = 5;
  Sphere4.position.y = 0.2;
  Sphere4.position.x = 8;

  Sphere5 = new THREE.Mesh( geometry, material );
  scene.add( Sphere5 );
  collidableMeshList.push(Sphere5);
  
  
  Sphere5.position.z = 4.5;
  Sphere5.position.y = 0.1;
  Sphere5.position.x = 4.5;

  

}

// ----------------------------------
// Función Para mover al jugador:
// ----------------------------------
function _LoadModels(){
  
  var mtlLoader = new THREE.MTLLoader();
  mtlLoader.setTexturePath('./modelos/rat/');
  mtlLoader.setPath('./modelos/rat/');
  mtlLoader.load('rat.mtl', function (materials2) {
s
    materials2.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials2);
    objLoader.setPath('./modelos/rat/');
    objLoader.load('rat.obj', function (object2) {

      modelLoad = object2;
      figuresGeo.push(modelLoad);
      scene.add(object2);
      
      object.scale.set(2,2,2);

      object2.position.y = 1;
      object2.position.x = 1;
      object2.position.z = 1;
    });
  })
}

function movePlayer() {
  if (input.right == 1) {
    camera.rotation.y -= rotSpd;
    MovingCube.rotation.y -= rotSpd;
  }
  if (input.left == 1) {
    camera.rotation.y += rotSpd;
    MovingCube.rotation.y += rotSpd;
  }

  if (input.up == 1) {
    camera.position.z -= Math.cos(camera.rotation.y) * spd;
    camera.position.x -= Math.sin(camera.rotation.y) * spd;

    MovingCube.position.z -= Math.cos(camera.rotation.y) * spd;
    MovingCube.position.x -= Math.sin(camera.rotation.y) * spd;
  }
  if (input.down == 1) {
    camera.position.z += Math.cos(camera.rotation.y) * spd;
    camera.position.x += Math.sin(camera.rotation.y) * spd;

    MovingCube.position.z += Math.cos(camera.rotation.y) * spd;
    MovingCube.position.x += Math.sin(camera.rotation.y) * spd;
  }
  class BasicCharacterControllerInput {
    constructor() {
      this._Init();    
    }
  
    _Init() {
      this._keys = {
        forward: false,
        backward: false,
        left: false,
        right: false,
        space: false,
        shift: false,
      };
      document.addEventListener('keydown', (e) => this._onKeyDown(e), false);
      document.addEventListener('keyup', (e) => this._onKeyUp(e), false);
    }
  
    _onKeyDown(event) {
      switch (event.keyCode) {
        case 87: // w
          this._keys.forward = true;
          break;
        case 65: // a
          this._keys.left = true;
          break;
        case 83: // s
          this._keys.backward = true;
          break;
        case 68: // d
          this._keys.right = true;
          break;
        case 32: // SPACE
          this._keys.space = true;
          break;
        case 16: // SHIFT
          this._keys.shift = true;
          break;
      }
    }
  
    _onKeyUp(event) {
      switch(event.keyCode) {
        case 87: // w
          this._keys.forward = false;
          break;
        case 65: // a
          this._keys.left = false;
          break;
        case 83: // s
          this._keys.backward = false;
          break;
        case 68: // d
          this._keys.right = false;
          break;
        case 32: // SPACE
          this._keys.space = false;
          break;
        case 16: // SHIFT
          this._keys.shift = false;
          break;
      }
    }
  };
}

window.addEventListener('keydown', function (e) {
  switch (e.keyCode) {
    case 68:
      input.right = 1;
      break;
    case 65:
      input.left = 1;
      break;
    case 87:
      input.up = 1;
      break;
    case 83:
      input.down = 1;
      break;
    case 27:
      document.getElementById("blocker").style.display = 'block';
      break;
  }
});


window.addEventListener('keyup', function (e) {
  switch (e.keyCode) {
    case 68:
      input.right = 0;
      break;
    case 65:
      input.left = 0;
      break;
    case 87:
      input.up = 0;
      break;
    case 83:
      input.down = 0;
      break;
  }
});
// ----------------------------------
// Funciones llamadas desde el index:
// ----------------------------------


function go2Play() {
  document.getElementById('blocker').style.display = 'none';
  document.getElementById('cointainerOthers').style.display = 'block';
  playAudio(x);
  initialiseTimer();
}

function initialiseTimer() {
  var sec = 0;
  function pad(val) { return val > 9 ? val : "0" + val; }

  setInterval(function () {
    document.getElementById("seconds").innerHTML = String(pad(++sec % 60));
    document.getElementById("minutes").innerHTML = String(pad(parseInt(sec / 60, 10)));
  }, 1000);
}

// ----------------------------------
// Funciones llamadas desde el index:
// ----------------------------------
function createPlayerMove() {
  var cubeGeometry = new THREE.CubeGeometry(1, 1, 1, 1, 1, 1);
  var wireMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.0 });
  MovingCube = new THREE.Mesh(cubeGeometry, wireMaterial);
  MovingCube.position.set(camera.position.x, camera.position.y, camera.position.z);
  collidableMeshList.push(MovingCube);
  scene.add(MovingCube);
}

function createFrontera() {
  var cubeGeometry = new THREE.CubeGeometry(120, 500, 120, 1, 1, 1);
  var wireMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true, transparent: true, opacity: 0.0 });
  worldWalls = new THREE.Mesh(cubeGeometry, wireMaterial);
  worldWalls.position.set(5, 0, 0);
  scene.add(worldWalls);
  collidableMeshList.push(worldWalls);
}


function collisionAnimate() {

  var originPoint = MovingCube.position.clone();

  for (var vertexIndex = 0; vertexIndex < MovingCube.geometry.vertices.length; vertexIndex++) {
    var localVertex = MovingCube.geometry.vertices[vertexIndex].clone();
    var globalVertex = localVertex.applyMatrix4(MovingCube.matrix);
    var directionVector = globalVertex.sub(MovingCube.position);

    var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
    var collisionResults = ray.intersectObjects(collidableMeshList);
    if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
      document.getElementById("lives").innerHTML = lives;//'toco, '+ JSON.stringify(collisionResults[0].object.name);//points;
      
      // Aqui disminuir las vidas
      lives = lives+1
      if (lives == 1){
        Sphere.position.set(100,100,100)
      }
      if (lives==2){
        Sphere2.position.set(100,100,100)
        Sphere3.position.set(100,100,100)
        Sphere4.position.set(100,100,100)
        lives = lives + 2
      }
      
      if (lives == 5) {
        Sphere5.position.set(100,100,100)
        document.getElementById("lost").style.display = "block";
        document.getElementById("cointainerOthers").style.display = "none";
        pauseAudio(x);
        playAudio(y);
      }
    } else {
      document.getElementById("lives").innerHTML = lives; // 'no toco';  
    }
  }
}