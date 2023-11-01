import { useMatcapTexture } from "@react-three/drei";
import React, { useEffect } from "react";
import { MeshMatcapMaterial, SRGBColorSpace, TorusGeometry } from "three";

const torusGeometry = new TorusGeometry();
const material = new MeshMatcapMaterial();

const Donut: React.FC = () => {
  const [matcapTexture] = useMatcapTexture("7B5254_E9DCC7_B19986_C8AC91", 256);

  useEffect(() => {
    matcapTexture.colorSpace = SRGBColorSpace;
    matcapTexture.needsUpdate = true;

    material.matcap = matcapTexture;
    material.needsUpdate = true;
  }, []);

  return (
    <mesh
      geometry={torusGeometry}
      material={material}
      position={[(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10]}
      scale={0.2 + Math.random() * 0.2}
      rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
    />
  );
};

export default Donut;
