import { useEffect, useRef } from "react";
import { Center, OrbitControls, Text3D, useMatcapTexture } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Mesh, MeshMatcapMaterial, SRGBColorSpace, TorusGeometry } from "three";
import { useFrame } from "@react-three/fiber";

const torusGeometry = new TorusGeometry();
const material = new MeshMatcapMaterial();

export default function Experience() {
  // const [torusGeometry, setTorusGeometry] = useState<TorusGeometry | null>(null);
  // const [material, setMaterial] = useState<MeshMatcapMaterial | null>(null);
  // const donutsGroup = useRef<Group>(null!);

  const [matcapTexture] = useMatcapTexture("7B5254_E9DCC7_B19986_C8AC91", 256);

  const donuts = useRef<Mesh[]>([]);

  useEffect(() => {
    matcapTexture.colorSpace = SRGBColorSpace;
    matcapTexture.needsUpdate = true;

    material.matcap = matcapTexture;
    material.needsUpdate = true;
  }, []);

  useFrame((state, delta) => {
    for (const donut of donuts.current) {
      donut.rotation.y += delta * 0.2;
    }
  });

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} shadow-normalBias={0.04} />
      <ambientLight intensity={0.5} />

      <Center>
        <Text3D
          font="./fonts/helvetiker_regular.typeface.json"
          material={material}
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          Pedro Novo
        </Text3D>
      </Center>

      {Array.from(new Array(100)).map((_, idx) => (
        <mesh
          key={idx}
          ref={(element) => {
            if (element) {
              donuts.current[idx] = element;
            }
          }}
          geometry={torusGeometry}
          material={material}
          position={[(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10]}
          scale={0.2 + Math.random() * 0.2}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
        />
      ))}
    </>
  );
}

// TEXT STYLE ATTRIBUTES
// Check ThreeJS Text Geometry to check what attributes can be used

// ANIMATING GROUP VS PUSH
// The first example, that wraps the meshs in a group and animates
// its children, by looping through the group ref seems to be more
// natural than pushing every element to donuts ref
