import React, { forwardRef } from "react";
import DrunkEffect from "./drunk-effect";
import { BlendFunction } from "postprocessing";

interface Props {
  frequency: number;
  amplitude: number;
  blendFunction?: BlendFunction;
}

export default forwardRef(function Drunk(props: Props, ref) {
  const effect = new DrunkEffect(props);

  return <primitive ref={ref} object={effect} />;
});
