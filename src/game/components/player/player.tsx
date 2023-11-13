import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody, useRapier } from "@react-three/rapier";
import { useKeyboardControls } from "@react-three/drei";
import { Vector3 } from "three";
import { useGame } from "../../../store/use-game";

const Player = () => {
  const ball = useRef<RapierRigidBody>(null!);
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const { rapier, world } = useRapier();
  const start = useGame((state) => state.start);
  const end = useGame((state) => state.end);
  const restart = useGame((state) => state.restart);
  const blocksCount = useGame((state) => state.blocksCount);

  const [smoothedCameraPosition] = useState(() => new Vector3(10, 10, 10));
  const [smoothedCameraTarget] = useState(() => new Vector3());

  const jump = () => {
    const origin = ball.current.translation();
    origin.y -= 0.31;
    const direction = { x: 0, y: -1, z: 0 };
    const ray = new rapier.Ray(origin, direction);
    const hit = world.castRay(ray, 10, true);

    if (hit && hit.toi > 0.15) {
      return;
    }

    ball.current.applyImpulse({ x: 0, y: 0.5, z: 0 }, false);
  };

  const reset = () => {
    ball.current.setTranslation({ x: 0, y: 1, z: 0 }, false);
    ball.current.setLinvel({ x: 0, y: 0, z: 0 }, false);
    ball.current.setAngvel({ x: 0, y: 0, z: 0 }, false);
  };

  useEffect(() => {
    const unsubscribeReset = useGame.subscribe(
      (state) => state.phase,
      (value) => {
        if (value === "ready") reset();
      }
    );

    const unsubscribeJump = subscribeKeys(
      (state) => state.jump,
      (value) => {
        if (value) jump();
      }
    );

    const unsubscribeAny = subscribeKeys(() => {
      start();
    });

    return () => {
      unsubscribeReset();
      unsubscribeJump();
      unsubscribeAny();
    };
  }, []);

  useFrame(({ camera }, delta) => {
    // === CONTROLS ===
    const { forward, backward, leftward, rightward } = getKeys();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 0.6 * delta;
    const torqueStrength = 0.2 * delta;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }

    if (rightward) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }

    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }

    if (leftward) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }

    ball.current.applyImpulse(impulse, false);
    ball.current.applyTorqueImpulse(torque, false);

    // === CAMERA ===
    const ballPosition = ball.current.translation();
    const cameraPosition = new Vector3(ballPosition.x, ballPosition.y, ballPosition.z);
    cameraPosition.z += 2.25;
    cameraPosition.y += 0.65;

    const cameraTarget = new Vector3(ballPosition.x, ballPosition.y, ballPosition.z);
    cameraTarget.y += 0.25;

    smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
    smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

    camera.position.copy(smoothedCameraPosition);
    camera.lookAt(smoothedCameraTarget);

    // === PHASES ===
    if (ballPosition.z < -(blocksCount * 4 + 2)) {
      end();
    }

    if (ballPosition.y < -4) {
      restart();
    }
  });

  return (
    <>
      <RigidBody
        ref={ball}
        canSleep={false}
        colliders="ball"
        restitution={0.2}
        friction={1}
        linearDamping={0.5}
        angularDamping={0.5}
        position={[0, 1, 0]}
      >
        <mesh castShadow>
          <icosahedronGeometry args={[0.3, 1]} />
          <meshStandardMaterial flatShading color="mediumpurple" />
        </mesh>
      </RigidBody>
    </>
  );
};

export default Player;

// AVOID DOUBLE JUMP
// To avoid double jump we will test how far the ball is from the floor
// So, we'll be casting a ray downward from the ball, and it will test
// where is the collision. If the distance is too high, we can't jump.
// Remember to move the center of the origin (which by default is the
// center of the ball) downward to the limit/face of the ball.
// Also we must test it against the whole world, otherwise we would
// be able to jump on obstacles.

// CAMERA
// The camera position defines the position of the camera.
// The camera target defines where the camera is pointing to, which
// in this case will be the upper part of the ball.

// SHADOWS
// In order to fix the shadows (they're not being rendered everywhere)
// we will make the light also follow the ball position.

// HANDLING PHASES
// When resetting the game we not only need to reset the ball
// position (setTranslation) but also need to remove any translation
// force (setLinvel) and remove any angular force (setAngvel)
