/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  CuboidCollider,
  CylinderCollider,
  Physics,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { Perf } from "r3f-perf";
import { useRef, useState } from "react";
import { Euler, Quaternion } from "three";

export default function Experience() {
  const cube = useRef<RapierRigidBody>(null);
  const twister = useRef<RapierRigidBody>(null);
  const [audio, setAudio] = useState(new Audio("./hit.mp3"));
  const hambuger = useGLTF("./hamburger.glb");

  const cubeJump = () => {
    const cubeMass = cube.current?.mass();

    cubeMass && cube.current?.applyImpulse({ x: 0, y: 5 * cubeMass, z: 0 }, false);
    cube.current?.applyTorqueImpulse(
      { x: Math.random() - 0.5, y: Math.random() - 0.5, z: Math.random() - 0.5 },
      false
    );
  };

  const onCollisitionEnter = () => {
    // audio.currentTime = 0;
    // audio.volume = Math.random();
    // audio.play();
  };

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const eulerRotation = new Euler(0, time * 3, 0);
    const quaternionRotation = new Quaternion();
    quaternionRotation.setFromEuler(eulerRotation);
    twister.current?.setNextKinematicRotation(quaternionRotation);

    const angle = time * 0.5;
    const x = Math.cos(angle) * 2;
    const z = Math.sin(angle) * 2;

    twister.current?.setNextKinematicTranslation({ x, y: -0.8, z });
  });

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={1.5} />

      <Physics debug gravity={[0, -9.81, 0]}>
        <RigidBody colliders="ball" position={[-1.5, 2, 0]}>
          <mesh castShadow position={[0, 3, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>

        <RigidBody
          position={[1.5, 2, 0]}
          ref={cube}
          gravityScale={1}
          restitution={0}
          friction={0.7}
          colliders={false}
          onCollisionEnter={onCollisitionEnter}
          // onCollisionExit={() => {console.log('exit')}}
          // onSleep={() => {console.log('sleep')}}
          // onWake={() => {console.log('awake')}}
        >
          <mesh castShadow onClick={cubeJump}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
          <CuboidCollider mass={2} args={[0.5, 0.5, 0.5]} />
        </RigidBody>

        <RigidBody type="fixed" friction={0}>
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>

        <RigidBody ref={twister} position={[0, -0.8, 0]} friction={0} type="kinematicPosition">
          <mesh castShadow scale={[0.4, 0.4, 3]}>
            <boxGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>

        <RigidBody colliders={false} position={[0, 4, 0]}>
          <primitive object={hambuger.scene} scale={0.25} />
          <CylinderCollider args={[0.5, 1.25]} />
        </RigidBody>
      </Physics>
    </>
  );
}

// PHYSICS
// Only objects inside the Physics tag will be impacted by the physics

// RIGID BODY
// Affects mesh with the same affect as gravity
// By default each object is a cuboid, which mean it assumes a form
// of a cube even though the geometry is a sphere. To change that
// we can set the "colliders" property within <RigidBody />

// CUSTOM COLLIDERS
// In the CuboidCollider example we set the args to [1, 1, 1]
// These values are of the half extent, this basically means that
// from the center we extend 1 to x, y and z but for each direction
// creating a cube that has a [2, 2, 2] dimension, so the [1, 1, 1]
// represent the half-width, the half-height and half-depth

// NOTE
// We can add multiple Meshs and multiple Colliders inside the
// same RigidBody to create complex shapes

// --- PHYSICS ---
// addForce - used to apply force that lasts for quite long time
// (like the wind)

// applyImpulse - used to apply a short force for a very short period
// of time (like a projectile)

// applyTorqueImpulse - used to apply a rotation to an object.

// --- OBJECT SETTINGS ---
// We can control friction, the restitution, the mass, the gravity,
// where the objects are, where they're supposed to go, and much more.

// GRAVITY
// The gravity is set to simulate Earth's gravity (-9.81).
// We can also specify the gravityScale of each object.

// RESTITUTION
// We can control the bounciness with the restitution attribute.
// The default value is 0.

// FRICTION
// Lets us decide how much the surfaces are supposed to rub off on
// each other. The default value is 0.7, 0 meaning the floor would
// be slippery, since there would be no friction.
// In order for this to work we must apply the friction to the
// object and the floor.

// MASS
// The mass of the RigidBody is automatically calculated as the sum
// of the masses of the Colliders that make up the rigid body.
// The mass of the colliders is automatically calculated according
// to their shape and volume.
// In other words, the bigger the object the bigger the mass.
// If there's no air friction the gravity will affect both objects
// the same, but the mass and forces involved will influence the
// outcome of a collision (bigger object will push the smaller one).
// We can edit the mass settings, because a cardboard box won't
// behave the same as a metal box.

// KINEMATIC
// We shouldn't update the RigidBody position at run time!!!
// If we need to move an object in time, we must use the kinematic
// types.
// Kinematic is also used to control a player.
// kinematicPosition - we provide the next position and it'll update
// the object velocity accordingly.
// kinematicVelocity - we provide the velocity.

// EVENTS
// We can listen to events by adding attributes directly on the
// RigidBody.
// onCollisionEnter - when RigidBody hit something,
// onCollisionExit - when RigidBody seperates from object it just hit,
// onSleep - when RigidBody starts sleeping,
// onWake - when RigidBody stops sleeping,

// --- FROM A MODEL ---
//
