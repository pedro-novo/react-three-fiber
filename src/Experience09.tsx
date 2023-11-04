/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrbitControls } from "@react-three/drei";
import { EffectComposer } from "@react-three/postprocessing";
import { Perf } from "r3f-perf";
import { useRef } from "react";
import { Mesh } from "three";
import Drunk from "./components/drunk";
import { useControls } from "leva";

export default function Experience() {
  const cube = useRef<Mesh>(null!);
  const drunkRef = useRef();

  const drunkProps = useControls("Drunk Effect", {
    frequency: { value: 2, min: 1, max: 20 },
    amplitude: { value: 0.1, min: 0, max: 1 },
  });

  return (
    <>
      <color args={["#ffffff"]} attach="background" />

      <EffectComposer>
        {/* <Vignette offset={0.3} darkness={0.9} blendFunction={BlendFunction.NORMAL} /> */}
        {/* <Glitch
          delay={new Vector2(0.5, 1)}
          duration={new Vector2(0.1, 0.3)}
          strength={new Vector2(0.2, 0.4)}
          mode={GlitchMode.CONSTANT_MILD}
        /> */}

        {/* <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} /> */}
        {/* <Bloom mipmapBlur intensity={0.1} luminanceThreshold={0} /> */}
        {/* <DepthOfField focusDistance={0.025} focalLength={0.025} bokehScale={6} /> */}
        <Drunk ref={drunkRef} {...drunkProps} />
      </EffectComposer>

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
