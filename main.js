import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { DragControls } from 'three/addons/controls/DragControls.js';
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { GUI } from 'dat.gui'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 3, 0)
scene.add(cube);

//create a blue LineBasic material
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
const points = [];
points.push(new THREE.Vector3(-10, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));

const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

const line = new THREE.Line(lineGeometry, lineMaterial);
scene.add(line);


// load GLTFs
const loader = new GLTFLoader();

loader.load(
  "assets/scene.gltf ",
  function (gltf) {
    gltf.scene.position.set(0, 0.4, 0);
    scene.add(gltf.scene);
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
  "assets/chess/king.glb",
  function (gltf) {
    const model = gltf.scene;

    // Set the desired position of the model
    model.position.set(0, 0, 0);
    model.scale.set(0.03, 0.03, 0.03)

    scene.add(model);

    // Drag control
    const dragControls = new DragControls([model], camera, renderer.domElement);

    dragControls.addEventListener('dragstart', function(event) {
      console.log(1);
    });
  },
  undefined,
  function (error) {
    console.error(error);
  }
);


// Lights
const ambientLight = new THREE.AmbientLight(0x202020);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xFFFFFF, 1, 100);
pointLight.position.set(0, 10, 0);
scene.add(pointLight);

// helpers 
const size = 30;
const divisions = 50;

const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper)

const cameraHelper = new THREE.CameraHelper(camera);
scene.add(cameraHelper)

const sphereSize = 0.8;
const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
scene.add(pointLightHelper)

camera.position.set(0, 6, 15)

// Orbitcontrols
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.update();
// controls.enablePan = false;

// GUI
const gui = new GUI()
const cubeFolder = gui.addFolder('cube')
cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2)
cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2)
cubeFolder.add(cube.rotation, 'z', 0, Math.PI * 2)
cubeFolder.open()
const cameraFolder = gui.addFolder('camera')
cameraFolder.add(camera.position, 'z', 0, 50).name('Zoom');
cameraFolder.add(camera.rotation, 'x', 0, 6.28, 0.01).name('Rotation X'); 
cameraFolder.add(camera.rotation, 'y', 0, 6.28, 0.01).name('Rotation Y'); 
cameraFolder.add(camera.rotation, 'z', 0, 6.28, 0.01).name('Rotation Z');
cameraFolder.open()
const pointLightFolder = gui.addFolder('pointlight')
pointLightFolder.add(pointLight, 'intensity', 0, 1)


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
