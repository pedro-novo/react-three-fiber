import React from "react";
import { Vector3 } from "three";
import { BlockProps, boxGeometry, startEndBlockMaterial } from "../../constants/constants";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

const EndBlock = ({ position = new Vector3(0, 0, 0) }: BlockProps) => {
  const hamburger = useGLTF("./hamburger.glb");

  hamburger.scene.children.forEach((mesh) => (mesh.castShadow = true));

  return (
    <>
      <group position={position}>
        <mesh
          geometry={boxGeometry}
          material={startEndBlockMaterial}
          position={[0, 0, 0]}
          scale={[4, 0.2, 4]}
          receiveShadow
        />
        <RigidBody
          type="fixed"
          colliders="hull"
          position={[0, 0.25, 0]}
          restitution={0.2}
          friction={0}
        >
          <primitive object={hamburger.scene} scale={0.2} />
        </RigidBody>
      </group>
    </>
  );
};

export default EndBlock;
