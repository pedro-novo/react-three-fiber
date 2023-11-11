import { CuboidCollider, RigidBody } from "@react-three/rapier";
import React from "react";
import { boxGeometry, wallBlockMaterial } from "../../constants/constants";

interface BoundsProps {
  length?: number;
}

const Bounds = ({ length = 1 }: BoundsProps) => {
  return (
    <>
      <RigidBody type="fixed" restitution={0.2} friction={0}>
        <mesh
          geometry={boxGeometry}
          material={wallBlockMaterial}
          position={[2.15, 0.75, -(length * 2) + 2]}
          scale={[0.3, 1.5, 4 * length]}
          castShadow
        />
        <mesh
          geometry={boxGeometry}
          material={wallBlockMaterial}
          position={[-2.15, 0.75, -(length * 2) + 2]}
          scale={[0.3, 1.5, 4 * length]}
          receiveShadow
        />
        <mesh
          geometry={boxGeometry}
          material={wallBlockMaterial}
          position={[0, 0.75, -(length * 4) + 2]}
          scale={[4, 1.5, 0.3]}
          receiveShadow
        />

        <CuboidCollider
          args={[2, 0.1, 2 * length]}
          position={[0, -0.1, -(length * 2) + 2]}
          restitution={0.2}
          friction={1}
        />
      </RigidBody>
    </>
  );
};

export default Bounds;
