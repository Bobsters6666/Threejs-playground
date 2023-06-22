import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

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

const loader = new GLTFLoader();

loader.load(
  "./assets/scene.gltf ",
  function (gltf) {
    scene.add(gltf.scene);
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
const size = 10;
const divisions = 10;

const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper)

const cameraHelper = new THREE.CameraHelper(camera);
scene.add(cameraHelper)

const sphereSize = 0.8;
const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
scene.add(pointLightHelper)

camera.position.set(0, 6, 15)

// Orbitcontrols
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
controls.autoRotate = true;

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();
