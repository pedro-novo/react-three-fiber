import { ContactShadows, Environment, OrbitControls, Stage, useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import { useRef } from "react";
import { DirectionalLight, DirectionalLightHelper, Mesh } from "three";

export default function Experience() {
  const cube = useRef<Mesh>(null!);
  const directionalLight = useRef<DirectionalLight>(null!);

  useHelper(directionalLight, DirectionalLightHelper, 1);

  useFrame((state, delta) => {
    // const time = state.clock.elapsedTime;
    // cube.current.position.x = 2 + Math.sin(time);
    cube.current.rotation.y += delta * 0.2;
  });

  const { color, opacity, blur } = useControls("contact shadows", {
    color: "#4b2709",
    opacity: { value: 0.4, min: 0, max: 1 },
    blur: { value: 2.8, min: 0, max: 10 },
  });

  const { sunPosition } = useControls("sky", {
    sunPosition: { value: [1, 2, 3] },
  });

  const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } = useControls("environment map", {
    envMapIntensity: { value: 7, min: 0, max: 12 },
    envMapHeight: { value: 7, min: 0, max: 100 },
    envMapRadius: { value: 28, min: 10, max: 1000 },
    envMapScale: { value: 100, min: 10, max: 1000 },
  });

  return (
    <>
      {/* <BakeShadows /> */}
      {/* <SoftShadows size={25} samples={10} focus={0} /> */}

      {/* <Environment
        // background
        // files={[
        //   "./environmentMaps/2/px.jpg",
        //   "./environmentMaps/2/nx.jpg",
        //   "./environmentMaps/2/py.jpg",
        //   "./environmentMaps/2/ny.jpg",
        //   "./environmentMaps/2/pz.jpg",
        //   "./environmentMaps/2/nz.jpg",
        // ]}
        // files="./environmentMaps/the_sky_is_on_fire_2k.hdr"
        preset="sunset"
        ground={{
          height: envMapHeight,
          radius: envMapRadius,
          scale: envMapScale,
        }}
      > */}
      {/* <color args={["#000000"]} attach="background" />
        <Lightformer position-z={-5} scale={10} color="red" intensity={10} form="ring" /> */}
      {/* <mesh position-z={-5} scale={10}>
          <planeGeometry />
          <meshBasicMaterial color={[100, 0, 0]} />
        </mesh> */}
      {/* </Environment> */}

      {/* <color args={["ivory"]} attach="background" /> */}

      <Perf position="top-left" />

      <OrbitControls makeDefault />

      {/* <AccumulativeShadows
        position={[0, -0.99, 0]}
        color="#316d39"
        opacity={0.8}
        frames={Infinity}
        blend={100}
        temporal
      >
        <RandomizedLight position={[1, 2, 3]} amount={8} radius={1} ambient={0.5} intensity={1} bias={0.001} />
      </AccumulativeShadows> */}

      {/* <ContactShadows
        position={[0, 0, 0]}
        scale={10}
        resolution={512}
        far={5} // how far does an object should cast a shadow
        color={color}
        blur={blur}
        opacity={opacity}
        frames={1} // to bake the shadow
      /> */}

      {/* <directionalLight
        ref={directionalLight}
        position={sunPosition}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
      />
      <ambientLight intensity={0.5} />

      <Sky sunPosition={sunPosition} /> */}

      {/* <mesh castShadow position-x={-2} position-y={1}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" envMapIntensity={envMapIntensity} />
      </mesh>

      <mesh ref={cube} castShadow rotation-y={Math.PI * 0.25} scale={1.5} position-x={2} position-y={1}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" envMapIntensity={envMapIntensity} />
      </mesh> */}
      {/* 
      <mesh position-y={0} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" envMapIntensity={envMapIntensity} />
      </mesh> */}

      <Stage
        shadows={{
          type: "contact",
          opacity: 0.2,
          blur: 3,
        }}
        environment="sunset"
        preset="portrait"
        intensity={2}
      >
        <mesh castShadow position-x={-2} position-y={1}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" envMapIntensity={envMapIntensity} />
        </mesh>

        <mesh ref={cube} castShadow rotation-y={Math.PI * 0.25} scale={1.5} position-x={2} position-y={1}>
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" envMapIntensity={envMapIntensity} />
        </mesh>
      </Stage>
    </>
  );
}

// ENVIRONMENT & STAGING

// COLOR
// To set the scene background we just need to use:
// <color args={["ivory"]} attach="background" />

// LIGHTS
// ambientLight, hemisphereLight, directionalLight, pointLight,
// rectAreaLight, spotlight

// LIGHT HELPERS
// We must have a ref of the light and we can then use the useHelper hook:
// const directionalLight = useRef<DirectionalLight>(null!);
// useHelper(directionalLight, DirectionalLightHelper, 1);

// SHADOWS
// To activate the shadows we first need to set its property within canvas
// Then we need to define which objects are casting and receiving shadows
// e.g: floor will only receive, it won't cast shadows
// <Canvas shadows />
// <directionalLight castShadow />
// <mesh castShadow > <sphereGeometry /> </mesh>
// <mesh castShadow > <boxGeometry /> </mesh>
// <mesh receiveShadow > <planeGeometry /> </mesh>

// BAKING
// If we have a static scene, the shadows don't need to be recasted
// on each render, we just need to cast it once when rendering the app.
// This is what "baking the shadow" means. This will improve performance.
// We can achieve that by simply using the <BakeShadows /> helper

// CONFIGURE SHADOWS
// We must use the shadow-mapSize property
// shadow-mapSize={[1024, 1024]} - shadow resolution
// shadow-camera-near={1} - min range of affected object that will cast shadow
// shadow-camera-far={10} - max range of affected object that will cast shadow
// shadow-camera-top={5} - top area affected object that will cast shadow
// shadow-camera-right={5} - right area affected object that will cast shadow
// shadow-camera-bottom={-5} - bottom area affected object that will cast shadow
// shadow-camera-left={-5} - left area affected object that will cast shadow
// these areas should be as small as possible, without cutting the shadows

// SOFT SHADOWS
// Default shadows are too sharp. There are multiple ways of softening them
// and there's one technique called Percent Closer Soft Shadows(PCSS)
// PCSS will make the shadow look blurry by picking the shadow map texture at
// an offset position according to the distance between the surface casting the
// shadow and the surface receiving it.
// <SoftShadows size={ 25 } samples={ 10 } focus={ 0 }/>
// size: radius of softness
// samples: quality (more samples = less visual noise but worse performance)
// focus: distance where the shadow is the sharpest

// ACCUMULATIVE SHADOWS
// It will accumulate multiple shadow renders, which will be a result of
// moving the light randomly before each render. The shadow will be composed
// of multiple render, from various angles, making it look soft and realistic.
// It can only render on a plane.
// For it to work we must remove the receiveShadow property from the plane.
// <AccumulativeShadows> <RandomizedLight /> </AccumulativeShadows>
// We can improve the shadow quality by increasing the number of frames
// within the AccumulativeShadows. This will cause some performance overhead,
// since it will rerender x(frames) number of times before displaying the scene.
// We can make it progressive by setting the "temporal" property, but this means
// that the shadow will be drawn during the UX. (It will bug if we're using
// useHelper)
// If we want the shadow to always follow an animated object, we must set
// frames to Infinity. BUT when using Infinity frames, the AccumulativeShadows
// is only blending the last 20 shadows renders, so we must set the "blend"
// property to 100
{
  /* <AccumulativeShadows
position={[0, -0.99, 0]}
color="#316d39"
opacity={0.8}
frames={Infinity}
blend={100}
temporal
>
<RandomizedLight position={[1, 2, 3]} amount={8} radius={1} ambient={0.5} intensity={1} bias={0.001} />
</AccumulativeShadows> */
}

// CONTACT SHADOWS
// Doesn't rely on the default shadow system of Three.js so we can remove
// shadows within canvas. It works without a light and only on a plane.

// SKY
// This class is physics-based and tries to reproduce a realistic sky according to various parameters like
// mieCoefficient, mieDirectionalG, rayleigh and turbidity.
// To position the sun on the screen we should ALWAYS use spherical coordinates
// because we must keep the sun far away from the scene.

// ENVIRONMENT MAP
// Instead of using 6 pictures to represent our environment, we can use
// just one. Its a 360º photo in High Dynamic Range in order to make the
// illumination data more accurate.

// CUSTOM ENVIRONMENT
// Instead of using a mesh to illuminate the scene, we should use a
// <Lightformer />

// GROUND
// By adding the ground attribute, the projection of the environment
// will make it look as if the floor underneath the objects is near

// STAGE
// Used for a default good looking setting wih minimal configuration
//
