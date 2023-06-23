import * as THREE from "three";

const whitePieces = {
  king: {
    name: 'king',
    position: new THREE.Vector3(8.5, 0, 15),
    scale: new THREE.Vector3(0.04, 0.04, 0.04),
    draggable: true,
  },

  queen: {
    name: 'queen',
    position: new THREE.Vector3(1.5, 0, 15),
    scale: new THREE.Vector3(0.04, 0.04, 0.04),
    draggable: true,
  },

  bishop1: {
    name: 'bishop',
    position: new THREE.Vector3(-5, 0, 15),
    scale: new THREE.Vector3(0.04, 0.04, 0.04),
    draggable: true,
  },

  bishop2: {
    name: 'bishop',
    position: new THREE.Vector3(7, 0, 15),
    scale: new THREE.Vector3(0.04, 0.04, 0.04),
    draggable: true,
  },

  knight1: {
    name: 'knight',
    position: new THREE.Vector3(-10.1, 0, 16.6),
    scale: new THREE.Vector3(0.04, 0.04, 0.04),
    draggable: true,
    rotation: true,
    rotate: new THREE.Vector3(0,  Math.PI/2, 0),
  },

  knight2: {
    name: 'knight',
    position: new THREE.Vector3(10.2, 0, 16.7),
    scale: new THREE.Vector3(0.04, 0.04, 0.04),
    draggable: true,
    rotation: true,
    rotate: new THREE.Vector3(0,  Math.PI/2, 0),
  },

  rook1: {
    name: 'rook',
    position: new THREE.Vector3(-18.5, 0, 15),
    scale: new THREE.Vector3(0.04, 0.04, 0.04),
    draggable: true,
  },

  rook2: {
    name: 'rook',
    position: new THREE.Vector3(10, 0, 15),
    scale: new THREE.Vector3(0.04, 0.04, 0.04),
    draggable: true,
  },

  pawn1: {
    name: 'pawn',
    position: new THREE.Vector3(-21, 0, 11),
    scale: new THREE.Vector3(0.04, 0.04, 0.04),
    draggable: true,
  },

  pawn2: {
    name: 'pawn',
    position: new THREE.Vector3(-16.9, 0, 11),
    scale: new THREE.Vector3(0.04, 0.04, 0.04),
    draggable: true,
  },

  pawn3: {
    name: 'pawn',
    position: new THREE.Vector3(-12.8, 0, 11),
    scale: new THREE.Vector3(0.04, 0.04, 0.04),
    draggable: true,
  },

  pawn4: {
    name: 'pawn',
    position: new THREE.Vector3(-8.7, 0, 11),
    scale: new THREE.Vector3(0.04, 0.04, 0.04),
    draggable: true,
  },

  pawn5: {
    name: 'pawn',
    position: new THREE.Vector3(-4.6, 0, 11),
    scale: new THREE.Vector3(0.04, 0.04, 0.04),
    draggable: true,
  },

  pawn6: {
    name: 'pawn',
    position: new THREE.Vector3(-0.5, 0, 11),
    scale: new THREE.Vector3(0.04, 0.04, 0.04),
    draggable: true,
  },

  pawn7: {
    name: 'pawn',
    position: new THREE.Vector3(3.6, 0, 11),
    scale: new THREE.Vector3(0.04, 0.04, 0.04),
    draggable: true,
  },

  pawn8: {
    name: 'pawn',
    position: new THREE.Vector3(7.7, 0, 11),
    scale: new THREE.Vector3(0.04, 0.04, 0.04),
    draggable: true,
  },
}

export default whitePieces