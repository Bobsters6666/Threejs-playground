import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { DragControls } from 'three/addons/controls/DragControls.js';
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { GUI } from 'dat.gui'

import whitePieces from "./data/WhitePieces";
import blackPieces from "./data/BlackPieces";

const canvas = document.getElementById('canvas')
const customLoader = document.querySelector('.loader')
const loadingPercentage = document.querySelector('.percentage')

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const draggablePieces = []

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
canvas.appendChild(renderer.domElement);

const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xFF69B4 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(0, 3, -40)
cube.scale.set(4, 4, 4)
scene.add(cube);

// Loader
const loadingManager = new THREE.LoadingManager();

loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
  const progress = Math.round((itemsLoaded / itemsTotal) * 100);
  loadingPercentage.textContent = progress;
}

loadingManager.onLoad = function() {
  setTimeout(() => {
    canvas.style.display = 'block'
    customLoader.style.display = 'none'
    gui.open()
  }, 1000)
}

// Chessboard
const square = new THREE.BoxGeometry(4.2, 0.3, 4.2)
const lightSquare = new THREE.MeshStandardMaterial({ color: 0xFFFFFF })
const darkSquare = new THREE.MeshStandardMaterial({ color: 0x000000 })

const board = new THREE.Group();

for (let x = 0; x < 8; x++) {
  for (let z = 0; z < 8; z++) {
    let cube;
    if (z % 2 == 0 ) {
      cube = new THREE.Mesh(square, x % 2 == 0 ? lightSquare : darkSquare)
    } else {
      cube = new THREE.Mesh(square, x % 2 == 0 ? darkSquare : lightSquare)
    }

    cube.position.set(x * 4.2 - 14.7, 0, z * 4.2 - 15)
    cube.userData.ground = true;
    draggablePieces.push(cube)
    board.add(cube)
  }
}

scene.add(board)

// load GLTFs
const loader = new GLTFLoader(loadingManager);

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

    model.traverse((node) => {
      node.userData = {drag: true, name: `white${pieceKey}`}
    })
    draggablePieces.push(model)
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
      node.userData = {drag: true, name: `black${pieceKey}`}
    })

    scene.add(model)
    draggablePieces.push(model)
  })
}

// Lights
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xFFFFFF, 1, 100);
pointLight.position.set(0, 20, 0);
scene.add(pointLight);

// Raycasting
const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
const moveMouse = new THREE.Vector2();
let draggable;

window.addEventListener('click', event => {
  if (draggable) {
    console.log('dropping draggable')
    draggable = null
    return;
  }

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const found = raycaster.intersectObjects(draggablePieces);
  console.log(found[0].object.userData)
  if (found.length > 0 && found[0].object.userData.drag) {
    draggable = found[0].object;
  }
});

window.addEventListener('mousemove', event => {
  moveMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  moveMouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
})

function dragObject() {
  if (draggable != null) {
    raycaster.setFromCamera(moveMouse, camera)
    const found = raycaster.intersectObjects(draggablePieces)
    if (found.length > 0) {
      for (let o of found) {
        if (!o.object.userData.ground)
          continue
        draggable.position.x = found[0].point.x
        draggable.position.z = found[0].point.z
      }
    }
  }
}

camera.position.set(0, 17, 25)
camera.rotation.set(5.61, 0, 0)

// Orbitcontrols
const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.maxPolarAngle = Math.PI / 2
controls.enableDamping = true;

// GUI
const gui = new GUI()
const cubeFolder = gui.addFolder('Cube')
cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2)
cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2)
cubeFolder.add(cube.rotation, 'z', 0, Math.PI * 2)
cubeFolder.open()
const pointLightFolder = gui.addFolder('Lighting')
pointLightFolder.add(pointLight, 'intensity', 0, 1)
pointLightFolder.add(pointLight.position, 'y', 0, 50).name('position')
pointLightFolder.add(pointLight.position, 'z', -50, 50).name('offset')
pointLightFolder.open()
gui.close()

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  controls.update();

  dragObject()
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

