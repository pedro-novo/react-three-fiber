import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Suspense } from "react";
import Placeholder from "./components/placeholder";
import Hamburger from "./components/hambuger";
import Fox from "./components/fox";

export default function Experience() {
  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} shadow-normalBias={0.04} />
      <ambientLight intensity={0.5} />

      <mesh receiveShadow position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
      <Suspense fallback={<Placeholder position-y={0.5} scale={[2, 3, 2]} />}>
        <Hamburger scale={0.5} />
      </Suspense>

      <Fox />
    </>
  );
}

// FORMAT
// GLTF loading since it's the standard and the most frequently used format

// DRACO
// To use draco we must instantiate DRACOLoader class
// Dracos compressed models are much smaller.

// LAZY LOADING
// The scene will be displayed only when everything is loaded
// This means that if we're using biggers models, it will wait for them to laod
// before displaying anything to the user
