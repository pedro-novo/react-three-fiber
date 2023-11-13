import React, { useMemo } from "react";
import { Vector3 } from "three";
import StartBlock from "../blocks/start-block";
import SpinnerBlock from "../blocks/spinner-block";
import LimboBlock from "../blocks/limbo-block";
import AxeBlock from "../blocks/axe-block";
import EndBlock from "../blocks/end-block";
import { BlockProps } from "../../constants/constants";
import Bounds from "../bounds/bounds";

type BlockTypeArray = (({ position }: BlockProps) => React.ReactNode)[];

interface LevelProps {
  count?: number;
  blockTypes?: BlockTypeArray;
  seed?: number;
}

const Level = ({
  count = 5,
  blockTypes = [SpinnerBlock, LimboBlock, AxeBlock],
  seed = 0,
}: LevelProps) => {
  const blocks = useMemo(() => {
    const blocks: BlockTypeArray = [];

    for (let i = 0; i < count; i++) {
      const blockType = blockTypes[Math.floor(Math.random() * blockTypes.length)];
      blocks.push(blockType);
    }

    return blocks;
  }, [count, blockTypes, seed]);

  return (
    <>
      <StartBlock position={new Vector3(0, 0, 0)} />
      {blocks.map((Block, index) => (
        <Block key={index} position={new Vector3(0, 0, -(index + 1) * 4)} />
      ))}
      <EndBlock position={new Vector3(0, 0, -(count + 1) * 4)} />

      <Bounds length={count + 2} />
    </>
  );
};

export default Level;
