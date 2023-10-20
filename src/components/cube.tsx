import React from "react";

interface Props {
  positionX: number;
  scale: number;
}

const Cube: React.FC<Props> = ({ positionX = 1, scale = 1 }) => {
  return (
    <mesh position-x={positionX} scale={scale}>
      <boxGeometry />
      <meshStandardMaterial color="mediumpurple" />
    </mesh>
  );
};

export default Cube;
