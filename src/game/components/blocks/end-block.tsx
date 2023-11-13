import React from "react";
import { Vector3 } from "three";
import { BlockProps, boxGeometry, startEndBlockMaterial } from "../../constants/constants";
import { Text, useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

const EndBlock = ({ position = new Vector3(0, 0, 0) }: BlockProps) => {
  const hamburger = useGLTF("./hamburger.glb");

  hamburger.scene.children.forEach((mesh) => (mesh.castShadow = true));

  return (
    <>
      <group position={position}>
        <Text
          scale={1}
          maxWidth={0.25}
          lineHeight={0.75}
          textAlign="right"
          position={[0, 2.25, 2]}
          rotation-y={-0.25}
          font="./bangers-v20-latin-regular.woff"
        >
          Finish
          <meshBasicMaterial toneMapped={false} />
        </Text>
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
