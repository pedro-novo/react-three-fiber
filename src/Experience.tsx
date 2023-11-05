/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useRef } from "react";
import { Mesh } from "three";

export default function Experience() {
  const cube = useRef<Mesh>(null!);

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh ref={cube} rotation-y={Math.PI * 0.25} scale={1.5} position-x={2}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
