/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrbitControls, meshBounds, useGLTF } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh, MeshStandardMaterial } from "three";

export default function Experience() {
  const cube = useRef<Mesh>(null!);
  const hambuger = useGLTF("./hamburger.glb");

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  const eventHandler = () => {
    const cubeMaterial = cube.current.material as MeshStandardMaterial;
    cubeMaterial.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`);
  };

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh
        ref={cube}
        raycast={meshBounds}
        rotation-y={Math.PI * 0.25}
        scale={1.5}
        position-x={2}
        onClick={eventHandler}
        onPointerEnter={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          document.body.style.cursor = "default";
        }}
        // onPointerMissed={eventHandler}
        // onPointerMove={eventHandler}
        // onPointerOut={eventHandler}
        // onPointerOver={eventHandler}
        // onPointerDown={eventHandler}
        // onPointerUp={eventHandler}
        // onDoubleClick={eventHandler}
        // onContextMenu={eventHandler}
      >
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh position-x={-2} onClick={(event) => event.stopPropagation()}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>

      <primitive
        object={hambuger.scene}
        scale={0.25}
        position-y={0.5}
        onClick={(event: any) => event.stopPropagation()}
      />
    </>
  );
}

// ---EVENTS---
// ON CLICK
// A click is only considered if we start clicking inside the object
// and also finish the event inside of it (if we move the mouse outside
// of the object before releasing the click, the event won't take effect)

// ON CONTEXT MENU - Right Click
// To trigger an effect by right clicking, use the onContextMenu event
// In mobile this is represented by a long press.

// ON DOUBLE CLICK
// To trigger an effect by double clicking, use the onDoubleClick event
// The delay between the first and second click/tap is defined by the OS.

// ON POINTER UP
// To trigger an effect by releasing the mouse after clicking,
// use the onPointerUp event

// ON POINTER DOWN
// To trigger an effect right after clicking the mouse (without needing
// to release it), use the onPointerDown event

// ON POINTER OVER & ON POINTER ENTER
// In R3F both work the same way, but in native JS onPointerOver the event
// is triggered every time we "enter/over" any object inside a certain box
// where this effect is set. And the onPointerEnter is triggered exactly
// once, which is when we enter the parent element.

// ON POINTER OUT & ON POINTER LEAVE
// This are the exact opposite of the onPointerOver and onPointerEnter

// ON POINTER MOVE
// Triggered in each frame when moving cursor inside the object

// ON POINTER MISSED
// Triggered when clicking outside of the object

// ---OCCLUDING---
// When the cube is hidden behind the sphere, the onClick event will still
// be triggered. A way to avoid that is to also set an onClick event in
// the sphere.
// By default the events of all the objects that are aligned will be
// triggered. By setting an event to the sphere we are able to avoid this
// behaviour.
// WHY/HOW?
// This works because the objects are ordered by proximity to the camera,
// and when we trigger the event on the sphere we're able to stop the
// propagation to the next object.

// ---CURSOR---
// use the onPointerEnter and onPointerLeave to set the cursor to
// 'pointer' by setting document.body.style.cursor = 'pointer'

// ---EVENTS ON COMPLEX OBJECTS---

// ---PERFORMANCE---
// Listening to pointer events is quite a taxing task for the CPU
// So we should always keep an eye on performance, especially on
// low-end devices.
// AVOID:
// Avoid events that need to be tested on each frame:
// - onPointerOver
// - onPointerEnter
// - onPointerOut
// - onPointerLeave
// - onPointerMove
//
// Minimise the number of objects that listen to events and avoid testing
// complex geometries.
// If you notice a freeze, even a slight one, it's a clear indication
// that we have some more optimizations to do.
//
// There's a drei helper called meshBounds that will help with some
// optimization.
// This helper will create a theoretical sphere around the mesh (called
// bounding sphere) and the pointer events will be tested on that sphere
// instead of testing the geometry of the mesh. This is useful if you
// don’t need a very precise detection on a complex geometry.
//
// If you have very complex geometries and still need the pointer events
// to be accurate an performant, you can also use the BVH (Bounding Volume
// Hierarchy). It’s a much more complex approach, but made easy with
// the Bvh helper from drei.
