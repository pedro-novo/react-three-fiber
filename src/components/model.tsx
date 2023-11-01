import React from "react";
import { Clone, useGLTF } from "@react-three/drei";

const Model = () => {
  const model = useGLTF("./hamburger.glb");

  return (
    <>
      <Clone object={model.scene} scale={0.35} position-x={-4} />;
      <Clone object={model.scene} scale={0.35} position-x={0} />;
      <Clone object={model.scene} scale={0.35} position-x={4} />;
    </>
  );
};

export default Model;

useGLTF.preload("./hamburger.glb");

// Instead of using useLoader and handle lazy loading manually
// we can use useGLTF hook that will handle it for us.
// const model = useLoader(GLTFLoader as LoaderProto<unknown>, "./hamburger.glb",
// (loader) => {
//   const dracoLoader = new DRACOLoader();
//   dracoLoader.setDecoderPath("./draco/");
//   loader.setDRACOLoader(dracoLoader);
// });

// PRELOAD
// We can preload a model when some other component is instantiated, that
// way user will be able to see the model right way even b4 interacting with it

// CLONE
// Allow us to instantiate multiple models that share the same model
// by only loading one file.
