import * as THREE from 'three';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Adding a Cube to the Scene
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Creating Point Light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Create Ambient Light
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// Set Initial Camera Position
camera.position.z = 5;

var loader = new THREE.TextureLoader();
loader.load('/image.jpg', function (texture) {
    var sphereGeometry = new THREE.SphereGeometry(500, 60, 40);
    var sphereMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide
    });
    sphereGeometry.scale(-1, 1, 1);
    var mesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(mesh);
    mesh.position.set(0, 0, 0);
}, undefined, function (error) {
    console.error('An error occurred loading the texture', error); // Log any error
});

// Handle keyboard input
var keyboard = {};

function keyDown(event) {
    keyboard[event.code] = true;
}

function keyUp(event) {
    keyboard[event.code] = false;
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// Update the camera position based on keyboard input
function updateCameraPosition() {
  if (keyboard['KeyW']) {
    // move forward
    camera.position.z = new THREE.Vector3(0, 0, -0.1).applyMatrix4(camera.matrixWorld).z;
  }
  if (keyboard['KeyS']) {
    // move backward
    camera.position.z = new THREE.Vector3(0, 0, 0.1).applyMatrix4(camera.matrixWorld).z;
  }
  if (keyboard['KeyA']) {
    // move left relative to where we're looking
    var vector = new THREE.Vector3(-0.1, 0, 0).applyMatrix4(camera.matrixWorld);
    vector.sub(camera.position);
    camera.position.add(vector);
  }
  if (keyboard['KeyD']) {
    // move right relative to where we're looking
    var vector = new THREE.Vector3(0.1, 0, 0).applyMatrix4(camera.matrixWorld);
    vector.sub(camera.position);
    camera.position.add(vector);

  }
  if (keyboard['KeyQ']) {
    camera.position.y += 0.1;
  }
  if (keyboard['KeyE']) {
    camera.position.y -= 0.1;
  }
  if (keyboard['ArrowLeft']) {
    camera.rotation.y += 0.01;
  }
  if (keyboard['ArrowRight']) {
    camera.rotation.y -= 0.01;
  }
}

// Render loop
function animate() {
    requestAnimationFrame(animate);
    updateCameraPosition();
    renderer.render(scene, camera);
}

animate();
