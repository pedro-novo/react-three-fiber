import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { DirectionalLight } from "three";

const Lights = () => {
  const light = useRef<DirectionalLight>(null!);

  useFrame((state) => {
    light.current.position.z = state.camera.position.z + 1 - 8;
    light.current.target.position.z = state.camera.position.z - 8;
    light.current.target.updateMatrixWorld();
  });

  return (
    <>
      <directionalLight
        ref={light}
        castShadow
        position={[4, 4, 1]}
        intensity={1.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      />
      <ambientLight intensity={0.5} />
    </>
  );
};

export default Lights;

// SHADOWS
// Even when we changed the light postion and target position the
// shadows were not fixed.
// WHY?
// Because the target matrix isn't being updated.
// Three.js updates objects matrices when their transformation coordinates
// change (position, rotation, scale) but they need to be in the scene.
// The light is in the scene, but not the target.
// To fix it we can either add the target to the scene or update the
// matrix of the target ourselves.
