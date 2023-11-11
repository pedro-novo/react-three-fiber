import { Euler, Quaternion, Vector3 } from "three";
import {
  BlockProps,
  boxGeometry,
  obstacleBlockMaterial,
  trapBlockMaterial,
} from "../../constants/constants";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

const SpinnerBlock = ({ position = new Vector3(0, 0, 0) }: BlockProps) => {
  const [speed] = useState(() => (Math.random() + 0.5) * (Math.random() < 0.5 ? -1 : 1));
  const obstacle = useRef<RapierRigidBody>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const rotation = new Quaternion();
    rotation.setFromEuler(new Euler(0, time * speed, 0));
    obstacle.current.setNextKinematicRotation(rotation);
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

export default SpinnerBlock;
