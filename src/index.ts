import * as THREE from "three"
window.addEventListener('DOMContentLoaded', () => {

  // カメラに関するパラメータ
  const CAMERA_PARAM = {
    fovy: 60,
    aspect: window.innerWidth / window.innerHeight,
    near: 0.1,
    far: 10.0,
    x: 0.0,
    y: 2.0,
    z: 5,
    lookAt: new THREE.Vector3(0.0, 0.0, 0.0),
  };

  // レンダラに関するパラメータ  0xは16進数を示すリテラル
  const RENDERER_PARAM = {
    clearColor: 0xd2d1ff,       // 背景をクリアする色
    width: window.innerWidth,   // レンダリングする領域の幅
    height: window.innerHeight, // レンダリングする領域の高さ
  };
  // マテリアルに関するパラメータ
  const MATERIAL_PARAM = {
    color: 0xe803cc,            // マテリアルの持つ色
  };

  // . シーンの初期化 ...................................................
  const scene = new THREE.Scene();

  // . レンダラの初期化 .................................................
  const renderer = new THREE.WebGLRenderer();
  //new THREE.Color three.jsのカラーを定義するためのヘルパー
  renderer.setClearColor(new THREE.Color(RENDERER_PARAM.clearColor));
  //作成するCanvasのサイズを指定している。
  renderer.setSize(RENDERER_PARAM.width, RENDERER_PARAM.height);
  //ただのJSのDOM挿入
  document.body.appendChild(renderer.domElement);

  // . カメラの初期化 ...................................................
  const camera = new THREE.PerspectiveCamera(
    CAMERA_PARAM.fovy,
    CAMERA_PARAM.aspect,
    CAMERA_PARAM.near,
    CAMERA_PARAM.far
  );
  camera.position.set(CAMERA_PARAM.x, CAMERA_PARAM.y, CAMERA_PARAM.z);
  camera.lookAt(CAMERA_PARAM.lookAt);

  // . ジオメトリとマテリアルの初期化 ...................................
  class MyBoxGeometry extends THREE.BoxGeometry {
    constructor() {
      super(1, 1, 1)
    }
  }
  const geometry = new MyBoxGeometry();
  const material = new THREE.MeshBasicMaterial(MATERIAL_PARAM);

  // . メッシュの初期化 .................................................
  const box = new THREE.Mesh(geometry, material);
  scene.add(box);

  renderer.render(scene, camera);

  const tick = () => {
    requestAnimationFrame(tick)
    box.rotation.x += 0.05;
    box.rotation.y += 0.05;
    renderer.render(scene, camera);
  }

  tick();

}, false);
