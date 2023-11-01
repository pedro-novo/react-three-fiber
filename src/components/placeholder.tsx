import { MeshProps } from "@react-three/fiber";
import React from "react";

interface Props extends MeshProps {}

const Placeholder: React.FC<Props> = (props) => {
  return (
    <mesh {...props}>
      <boxGeometry args={[1, 1, 1, 2, 2, 2]} />
      <meshStandardMaterial wireframe color="red" />
    </mesh>
  );
};

export default Placeholder;
