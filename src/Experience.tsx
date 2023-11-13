import Level from "./game/components/level/level";
import { Physics } from "@react-three/rapier";
import Lights from "./game/components/lights/lights";
import Player from "./game/components/player/player";
import { useGame } from "./store/use-game";

export default function Experience() {
  const blocksCount = useGame((state) => state.blocksCount);
  const blocksSeed = useGame((state) => state.blocksSeed);

  return (
    <>
      <color args={["#bdedfc"]} attach="background" />
      <Physics debug={false}>
        <Lights />
        <Level count={blocksCount} seed={blocksSeed} />
        <Player />
      </Physics>
    </>
  );
}
