<script lang="ts">
  import Counter from './lib/Counter.svelte'
  import "./app.css"
  import Barchart from './lib/Barchart.svelte';

  import * as THREE from 'three';
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  
  const renderer = new THREE.WebGLRenderer();
  const controls = new OrbitControls( camera, renderer.domElement );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setAnimationLoop( animate );
  document.body.appendChild( renderer.domElement );

  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
  const cube = new THREE.Mesh( geometry, material );
  scene.add( cube );

  camera.position.z = 5;

  const update_mesh_rotation = (mesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap>, off: THREE.Vector3) => {
    mesh.rotation.x += off.x;
    mesh.rotation.y += off.y;
    mesh.rotation.z += off.z;
  }

  const update_mesh_scale = (mesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap>, off: THREE.Vector3, cap : THREE.Vector3 = new THREE.Vector3(1.5, 1.5, 1.5)) => {
    mesh.scale.x = (mesh.scale.x  + off.x) % cap.x;
    mesh.scale.y = (mesh.scale.y  + off.y) % cap.y;
    mesh.scale.z = (mesh.scale.z  + off.z) % cap.z;
  }

  const off = new THREE.Vector3(0.01, 0.01, 0);
  const off_scale = new THREE.Vector3(0.001, 0.001, 0.001);

  function animate() {
    update_mesh_rotation(cube, off);
    update_mesh_scale(cube, off_scale);

    controls.update();
    renderer.render( scene, camera );
  }
</script>

<main class="min-h-screen min-w-full flex flex-col justify-evenly items-center">
  <h1 class="text-6xl font-bold text-theme font-serif">DoTLMViz</h1>
  <p class="text-sm font-light font-sans uppercase tracking-widest border border-theme p-2 px-4 rounded-md hover:bg-theme hover:text-theme-w transition-all duration-300 cursor-pointer">This is tailwind test for style</p>
  <Counter />
  <Barchart />
  <span>Scoll to bottom to see three.js in action</span>
</main>
