import React from "react";
import { Vector3 } from "three";
import { BlockProps, boxGeometry, startEndBlockMaterial } from "../../constants/constants";
import { Float, Text } from "@react-three/drei";

const StartBlock = ({ position = new Vector3(0, 0, 0) }: BlockProps) => {
  return (
    <>
      <group position={position}>
        <Float floatIntensity={0.25} rotationIntensity={0.25}>
          <Text
            scale={0.4}
            maxWidth={0.25}
            lineHeight={0.75}
            textAlign="right"
            position={[0.75, 0.65, 0]}
            rotation-y={-0.25}
            font="./bangers-v20-latin-regular.woff"
          >
            Ball Race
            <meshBasicMaterial toneMapped={false} />
          </Text>
        </Float>
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
