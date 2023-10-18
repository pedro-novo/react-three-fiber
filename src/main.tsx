import React from "react";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import "./index.css";
import Experience from "./Experience";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Canvas>
    <Experience />
  </Canvas>
);
