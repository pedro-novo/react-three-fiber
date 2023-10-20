import {
  Float,
  Html,
  MeshReflectorMaterial,
  OrbitControls,
  PivotControls,
  Text,
  TransformControls,
} from "@react-three/drei";
import { useRef } from "react";
import { Mesh } from "three";

export default function Experience() {
  const cube = useRef<Mesh>(null!);
  const sphere = useRef<Mesh>(null!);

  return (
    <>
      <OrbitControls makeDefault />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh ref={cube} position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      <TransformControls object={cube} mode="translate" />

      <PivotControls anchor={[0, 0, 0]} depthTest={false} scale={100} lineWidth={1} fixed>
        <mesh position-x={-2} ref={sphere}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
          <Html position={[1, 1, 0]} wrapperClass="label" center distanceFactor={8} occlude={[sphere, cube]}>
            That's a Sphere
          </Html>
        </mesh>
      </PivotControls>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        {/* <meshStandardMaterial color="greenyellow" /> */}
        <MeshReflectorMaterial resolution={512} blur={[1000, 1000]} mixBlur={1} mirror={0.75} color="greenyellow" />
      </mesh>

      <Float speed={3} floatIntensity={2}>
        512
        <Text
          font="./bangers-v20-latin-regular.woff"
          fontSize={1}
          color="salmon"
          position-y={2}
          maxWidth={2}
          textAlign="center"
        >
          I Love R3F
          {/* <meshNormalMaterial /> */}
        </Text>
      </Float>
    </>
  );
}

// enableDamping -> camera dragging animation

// TRANSFORM CONTROLS
// Adds a gizmo that allows the user to transform (position, rotation or scale)
// an object
// we can also set "mode" to scale or  rotation to play with it

// PIVOT CONTROLS
// Are an alternative solution to the Transform Controls with different
// features and that looks better. It doesn't work as a group like for the
// Transform Controls, If we want it to be at the center of the sphere
// we have to change its positions using the anchor attribute

// HTML
// "positition" related to the object
// "wrapperClass" to set a class that can be target for styling
// "center" to make the rotation based on the center of the text
// "distanceFactor" to make it smaller as we get further
// "occlude" to set the objects(refs) that will overlap/hide the text

// TEXT
// Generating a 3D text geometry has its limits:
// we can notice the polygons, takes a lot of CPU resources, some fonts
// won't look very good and it doesn't support line breaks
// A good solution/alternative is using SDF(Signed Distance Field) fonts
// It supports woff, ttf and otf formats, woff usually being the lighter
// We can pass it a meshMaterial (e.g. meshNormalMaterial)

// FLOAT
// It makes the object float like a balloon in the air or hoverboard
// from Back to the Future

// MESHREFLECTOR MATERIAL
// Material do add reflections
