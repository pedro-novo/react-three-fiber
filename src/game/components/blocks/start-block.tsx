import React from "react";
import { Vector3 } from "three";
import { BlockProps, boxGeometry, startEndBlockMaterial } from "../../constants/constants";

const StartBlock = ({ position = new Vector3(0, 0, 0) }: BlockProps) => {
  return (
    <>
      <group position={position}>
        <mesh
          geometry={boxGeometry}
          material={startEndBlockMaterial}
          position={[0, -0.1, 0]}
          scale={[4, 0.2, 4]}
          receiveShadow
        />
      </group>
    </>
  );
};

export default StartBlock;
