import { Vector3 } from "three";
import {
  BlockProps,
  boxGeometry,
  obstacleBlockMaterial,
  trapBlockMaterial,
} from "../../constants/constants";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

const LimboBlock = ({ position = new Vector3(0, 0, 0) }: BlockProps) => {
  const [timeOffset] = useState(Math.random() * Math.PI * 2);
  const obstacle = useRef<RapierRigidBody>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const y = Math.sin(time + timeOffset) + 1.15;
    obstacle.current.setNextKinematicTranslation({
      x: position.x,
      y: position.y + y,
      z: position.z,
    });
  });

  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={trapBlockMaterial}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleBlockMaterial}
          scale={[3.5, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
};

export default LimboBlock;
