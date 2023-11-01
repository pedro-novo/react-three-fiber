/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Center, OrbitControls, Sparkles, shaderMaterial, useGLTF, useTexture } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Color, Mesh, Scene, ShaderMaterial } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
// @ts-ignore
import portalVertexShader from "./shaders/portal/vertex.glsl";
// @ts-ignore
import portalFragmentShader from "./shaders/portal/fragment.glsl";
import { ReactThreeFiber, extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";

type GLTFResult = GLTF & {
  nodes: {
    Scene: Scene;
    baked: Mesh;
    poleLightA: Mesh;
    poleLightB: Mesh;
    portalLight: Mesh;
  };
};

const shaderAttributes = { uTime: 0, uColorStart: new Color("#ffffff"), uColorEnd: new Color("#000000") };

const PortalMaterial = shaderMaterial(shaderAttributes, portalVertexShader, portalFragmentShader);

extend({ PortalMaterial });

type ShaderCustomMaterial = ShaderMaterial & typeof shaderAttributes;
declare module "@react-three/fiber" {
  interface ThreeElements {
    portalMaterial: ReactThreeFiber.Object3DNode<ShaderCustomMaterial, typeof PortalMaterial>;
  }
}

export default function Experience() {
  const { nodes } = useGLTF("./model/portal.glb") as GLTFResult;
  const bakedTexture = useTexture("./model/baked.jpg");
  bakedTexture.flipY = false;

  const portalMaterial = useRef<ShaderCustomMaterial>(null!);
  useFrame((state, delta) => {
    if (portalMaterial.current) {
      portalMaterial.current.uTime += delta * 2;
    }
  });

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <color args={["#030202"]} attach="background" />

      <Center>
        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>

        <mesh geometry={nodes.poleLightA.geometry} position={nodes.poleLightA.position}>
          <meshBasicMaterial color="#ffffe5" />
        </mesh>

        <mesh geometry={nodes.poleLightB.geometry} position={nodes.poleLightB.position}>
          <meshBasicMaterial color="#ffffe5" />
        </mesh>

        <mesh
          geometry={nodes.portalLight.geometry}
          position={nodes.portalLight.position}
          rotation={nodes.portalLight.rotation}
        >
          <portalMaterial ref={portalMaterial} />
        </mesh>

        <Sparkles size={6} scale={[4, 2, 4]} position-y={1} speed={0.2} count={100} />
      </Center>
    </>
  );
}
