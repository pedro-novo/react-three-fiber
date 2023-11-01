import React, { useEffect } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useControls } from "leva";

const Fox = () => {
  const model = useGLTF("./Fox/glTF/Fox.gltf");
  const animations = useAnimations(model.animations, model.scene);

  const { animationName } = useControls({
    animationName: { options: animations.names },
  });

  useEffect(() => {
    const action = animations.actions[animationName];

    action?.reset().fadeIn(0.5)?.play();

    return () => {
      action?.fadeOut(0.5);
    };
  }, [animationName]);

  return <primitive object={model.scene} scale={0.02} position={[-2.5, 0, 2.5]} />;
};

export default Fox;
