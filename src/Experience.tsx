import Level from "./game/components/level/level";
import { Physics } from "@react-three/rapier";
import Lights from "./game/components/lights/lights";
import Player from "./game/components/player/player";

export default function Experience() {
  return (
    <>
      <Physics debug={false}>
        <Lights />
        <Level />
        <Player />
      </Physics>
    </>
  );
}
