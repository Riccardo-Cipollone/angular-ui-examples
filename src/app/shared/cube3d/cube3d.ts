import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  input,
  viewChild,
} from "@angular/core";
import * as THREE from "three";

@Component({
  selector: "app-cube3d",
  imports: [],
  template: ` <div #rendererContainer></div> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cube3d {
  color = input<string>("#ff0000");
  rendererContainer =
    viewChild.required<ElementRef<HTMLDivElement>>("rendererContainer");
  cube!: THREE.Mesh;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;

  constructor() {
    afterNextRender(() => {
      this.initThree();
      this.animate();
    });

    effect(() => {
      console.log(this.color());
      if (this.color() && this.cube) {
        this.cube.material = new THREE.MeshBasicMaterial({
          color: this.color(),
          wireframe: true,
        });
      }
    });
  }

  initThree() {
    console.log("Render threeJS");
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(30, 1, 0.1, 1000);

    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(400, 400);

    this.rendererContainer().nativeElement.appendChild(
      this.renderer.domElement,
    );

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({
      color: this.color(),
      wireframe: true,
    });

    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  }
}
