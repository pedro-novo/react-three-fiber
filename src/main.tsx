import React from "react";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import "./index.css";
import Experience from "./Experience";
import { ACESFilmicToneMapping, SRGBColorSpace } from "three";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Canvas
    dpr={[1, 2]}
    gl={{ antialias: true, toneMapping: ACESFilmicToneMapping, outputColorSpace: SRGBColorSpace }}
    camera={{
      fov: 60,
      near: 0.1,
      far: 200,
      position: [3, 2, 6],
    }}
  >
    <Experience />
  </Canvas>
);

// By default we're using the perspective camera, which means that if something is furhest from
// camera is small, if close is bigger
// The ortographic camera, makes all objects appear at the same scale.

// ANTIALIAS
// Is used to prevent the "stairs" effect on the sides of the geometries,
// its ON by default and we can deactivate it using the gl within Canvas

// TONE MAPPING
// It's like when we have a picture where we have data for the various pixels and they are in
// high dynamic range, meaning it doesn't go from 0-1 or 0-256.
// It's like light values that can go up to very high values (like watching the sun)
// It's like intensity values that go beyond the classic ranges.
// Then we take that same picture, we clamp those values and compress them the right way
// to get something that goes from 0 to 1, something that we can see.
// This is the job of the Tone Mapping
// By default is set to ACESFilmicToneMapping, we can remove it by setting flat property in Canvas
// We can also set a different one within gl, by changing the toneMapping property

// OUTPUT ENCODING
// Color encoding is a way of encoding and decoding colors so that we store color information
// in a more optimised way since we are limited by the amount of possible values per channel
// By default is set to sRGBEncoding, we can change it by updating the outputColorSpace
// property withing gl object.

// ALPHA
// The background of the render is transparent, which mean that we can change it by updating the
// CSS background-color property

//PIXEL RATIO
// R3F handles the pixel ratio automatically
// It's good practice to clamp it in order to avoid performance issues
// on devices with a very high pixel ratio. Some devices might have
// an 1:1 ratio, but others, like iphones or Macs might have a 1:4 pixel ratio.
// To clamp it, we need to set the dpr property within Canvas.
// we can pass it a single value, or an array ([1, 2]) , meaning that the biggest
// value of the array is the ceiling, in this case, the 2.
// By default is set to [1, 2].

// PERFORMANCES
// Everything presented in the Three JS Journey still applies
// (minimise draw calls, simplify models, avoid big textures, etc.)
// R3F and React also made impossible interesting features to
// improve performance - https://docs.pmnd.rs/react-three-fiber/advanced/scaling-performance#instancing
