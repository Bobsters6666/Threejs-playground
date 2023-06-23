import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { DragControls } from 'three/addons/controls/DragControls.js';
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { GUI } from 'dat.gui'

import whitePieces from "./data/WhitePieces";
import blackPieces from "./data/BlackPieces";

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

for (const pieceKey in whitePieces) {
  const piece = whitePieces[pieceKey]

  loader.load(`/assets/chess/${piece.name}.glb`,
  function (glb) {
    const model = glb.scene;

    model.position.set(...piece.position)
    model.scale.set(...piece.scale)
    if(piece.rotation) model.rotation.set(...piece.rotate)
    scene.add(model)

    if (piece.draggable) {
      const dragControls = new DragControls([model], camera, renderer.domElement)
    }
  })
}

for (const pieceKey in blackPieces) {
  const piece = blackPieces[pieceKey]

  loader.load(`/assets/chess/${piece.name}.glb`,
  function (glb) {
    const model = glb.scene;

    model.position.set(...piece.position)
    model.scale.set(...piece.scale)
    if(piece.rotation) model.rotation.set(...piece.rotate)
    
    const material = new THREE.MeshPhongMaterial({color: 0x5C5C5C});
    model.traverse((node) => {
      node.material = material
    })

    scene.add(model)

    if (piece.draggable) {
      const dragControls = new DragControls([model], camera, renderer.domElement)
    }
  })
}

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


// Lights
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xFFFFFF, 1, 100);
pointLight.position.set(0, 20, 0);
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
cameraFolder.add(camera.rotation, 'x', 0, Math.PI * 2, 0.01).name('Rotation X'); 
cameraFolder.add(camera.rotation, 'y', 0, Math.PI * 2, 0.01).name('Rotation Y'); 
cameraFolder.add(camera.rotation, 'z', 0, Math.PI * 2, 0.01).name('Rotation Z');
cameraFolder.add(camera.position, 'x', -50, 50 * 2, 0.01).name('Position X'); 
cameraFolder.add(camera.position, 'y', -50, 50 * 2, 0.01).name('Position Y'); 
cameraFolder.add(camera.position, 'z', -50, 50 * 2, 0.01).name('Position Z');
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

