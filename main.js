import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { DragControls } from 'three/addons/controls/DragControls.js';
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { GUI } from 'dat.gui'

const canvas = document.getElementById('canvas')

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
canvas.appendChild(renderer.domElement);

const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xFF69B4 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(0, 3, -40)
cube.scale.set(4, 4, 4)
scene.add(cube);

//create a blue LineBasic material
// const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
// const points = [];
// points.push(new THREE.Vector3(-10, 0, 0));
// points.push(new THREE.Vector3(0, 10, 0));
// points.push(new THREE.Vector3(10, 0, 0));

// const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

// const line = new THREE.Line(lineGeometry, lineMaterial);
// scene.add(line);


// load GLTFs
const loader = new GLTFLoader();

loader.load(
  "/assets/scene.gltf ",
  function (gltf) {
    const model = gltf.scene
    model.position.set(-20, 2, 0);
    model.scale.set(2, 2, 2)
    scene.add(model);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded')
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

loader.load(
  "/assets/chess/king.glb",
  function (gltf) {
    const model = gltf.scene;

    // Set the desired position of the model
    model.position.set(8.5, 0, 15);
    model.scale.set(0.04, 0.04, 0.04)

    scene.add(model);

    new DragControls([model], camera, renderer.domElement);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

loader.load(
  "/assets/chess/queen.glb",
  function (gltf) {
    const model = gltf.scene;

    // Set the desired position of the model
    model.position.set(1.5, 0, 15);
    model.scale.set(0.04, 0.04, 0.04)

    scene.add(model);

    // Drag control
    new DragControls([model], camera, renderer.domElement);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

loader.load(
  "/assets/chess/chessboard.glb",
  function (gltf) {
    const model = gltf.scene;

    model.scale.set(3.5, 3.5, 3.5)

    scene.add(model);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

loader.load("/assets/chess/bishop.glb", function(gltf) {
  const model = gltf.scene;
  model.scale.set(0.04, 0.04, 0.04)
  model.position.set(-5, 0, 15);
  new DragControls([model], camera, renderer.domElement);
  scene.add(model)
})

loader.load("/assets/chess/bishop.glb", function(gltf) {
  const model = gltf.scene;
  model.scale.set(0.04, 0.04, 0.04)
  model.position.set(7, 0, 15);
  new DragControls([model], camera, renderer.domElement);
  scene.add(model)
})

loader.load("/assets/chess/knight.glb", function(gltf) {
  const model = gltf.scene;
  model.scale.set(0.04, 0.04, 0.04)
  model.position.set(-10.3, 0, 16.5);
  model.rotation.set(0, Math.PI/2, 0)
  new DragControls([model], camera, renderer.domElement);
  scene.add(model)
})

loader.load("/assets/chess/knight.glb", function(gltf) {
  const model = gltf.scene;
  model.scale.set(0.04, 0.04, 0.04)
  model.position.set(9.5, 1.5, 17.5);
  model.rotation.set(0, Math.PI/2, 0)
  new DragControls([model], camera, renderer.domElement);
  scene.add(model)
})

loader.load("/assets/chess/rook.glb", function(gltf) {
  const model = gltf.scene;
  model.scale.set(0.04, 0.04, 0.04)
  model.position.set(-18.5, 0, 15);
  new DragControls([model], camera, renderer.domElement);
  scene.add(model)
})

loader.load("/assets/chess/rook.glb", function(gltf) {
  const model = gltf.scene;
  model.scale.set(0.04, 0.04, 0.04)
  model.position.set(10, 0, 15);
  new DragControls([model], camera, renderer.domElement);
  scene.add(model)
})

for (let i = 0; i < 8; i ++) {
  loader.load("/assets/chess/pawn.glb", function(gltf) {
    const model = gltf.scene;
    model.scale.set(0.04, 0.04, 0.04)
    model.position.set((-21 + i*4.1), 0, 11)
    new DragControls([model], camera, renderer.domElement);
    scene.add(model)
  })
}

// Lights
const ambientLight = new THREE.AmbientLight(0x202020);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xFFFFFF, 1, 100);
pointLight.position.set(0, 10, 0);
scene.add(pointLight);

// helpers 
// const cameraHelper = new THREE.CameraHelper(camera);
// scene.add(cameraHelper)

// const sphereSize = 0.8;
// const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
// scene.add(pointLightHelper)

camera.position.set(0, 17, 25)
camera.rotation.set(5.61, 0, 0)

// Orbitcontrols
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.update();
// controls.enablePan = false;
// controls.enableRotate = false;

// GUI
const gui = new GUI()
const cubeFolder = gui.addFolder('cube')
cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2)
cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2)
cubeFolder.add(cube.rotation, 'z', 0, Math.PI * 2)
cubeFolder.open()
const cameraFolder = gui.addFolder('camera')
cameraFolder.add(camera.position, 'z', 0, 50).name('Zoom');
cameraFolder.add(camera.rotation, 'x', 0, Math.PI * 2, 0.01).name('Rotation X'); 
cameraFolder.add(camera.rotation, 'y', 0, Math.PI * 2, 0.01).name('Rotation Y'); 
cameraFolder.add(camera.rotation, 'z', 0, Math.PI * 2, 0.01).name('Rotation Z');
cameraFolder.open()
const pointLightFolder = gui.addFolder('pointlight')
pointLightFolder.add(pointLight, 'intensity', 0, 1)


// customising background
// scene.background.color = 0x000fff

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // controls.update();

  renderer.render(scene, camera);
}

animate();

// making canvas responsive 
window.addEventListener('resize', () => {
  // update camera aspect
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  // update renderer
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.render(scene, camera)
})

