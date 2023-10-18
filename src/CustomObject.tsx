import React, { useEffect, useMemo, useRef } from "react";
import { DoubleSide, BufferGeometry } from "three";

const CustomObject = () => {
  const bufferGeometryRef = useRef<BufferGeometry>(null!);

  // Each triangle has 3 vertices
  const verticesCount = 10 * 3;

  const positions = useMemo(() => {
    // And each vertice must have 3 coordinates (x, y, z)
    const positions = new Float32Array(verticesCount * 3);

    for (let i = 0; i < verticesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 3;
    }

    return positions;
  }, []);

  useEffect(() => {
    bufferGeometryRef.current.computeVertexNormals();
  }, []);

  return (
    <mesh>
      <bufferGeometry ref={bufferGeometryRef}>
        <bufferAttribute attach="attributes-position" count={verticesCount} itemSize={3} array={positions} />
      </bufferGeometry>
      <meshBasicMaterial color="red" side={DoubleSide} />
    </mesh>
  );
};

export default CustomObject;

// Normals are 3D coordinates associated with each vertex telling it where is the outside.
