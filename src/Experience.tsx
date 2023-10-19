import { ReactThreeFiber, extend, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Group, Mesh } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import CustomObject from "./CustomObject";

extend({ OrbitControls });

declare module "@react-three/fiber" {
  interface ThreeElements {
    orbitControls: ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>;
  }
}

export default function Experience() {
  const cube = useRef<Mesh>(null!);
  const carrousel = useRef<Group>(null!);
  const { camera, gl } = useThree();

  // we must take into consideration the different frame rates, for that we use delta,
  // that help us understand how much time has passed since the last frame
  useFrame((state, delta) => {
    cube.current.rotation.y += delta;
    // carrousel.current.rotation.y += delta;

    // const angle = state.clock.elapsedTime;
    // state.camera.position.x = Math.sin(angle) * 8;
    // state.camera.position.z = Math.cos(angle) * 8;
    // state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <group ref={carrousel}>
        <mesh ref={cube} rotation-y={Math.PI * 0.25} position-x={2}>
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
      </group>
      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
      <CustomObject />
    </>
  );
}

// To increase the size of a sphere dynamically, don't tweak the args, because this will destroy the geometry and reconstruct it, instead use the increase the scale property on the mesh

// LIGHT:
// We can change the light color, intensity, etc.
// ambientLight will lighten the darker shadows

// MESH:
// meshStandardMaterial reacts to light
// meshBasicMaterial is just a color and has no interaction with lights

// ANIMATIONS:
// To make the camera rotate around our objects, we need to update
// the camera position both on the x and z axis use the state from useFrame,
// to get access to elapsedTime and use sine and cosine to achive the desired result
// remember to update the camera, directing it to the center of the scene throught the lookAt method
