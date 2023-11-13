/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef } from "react";
import { useKeyboardControls } from "@react-three/drei";
import { useGame } from "../../../store/use-game";
import { addEffect } from "@react-three/fiber";

const GameInterface = () => {
  const phase = useGame((state) => state.phase);
  const restart = useGame((state) => state.restart);

  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const jump = useKeyboardControls((state) => state.jump);

  const time = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribeAddEffect = addEffect(() => {
      const { phase, startTime, endTime } = useGame.getState();

      let elapsedTime: number | string = 0;

      if (phase === "playing") {
        elapsedTime = Date.now() - startTime;
      } else if (phase === "ended") {
        elapsedTime = endTime - startTime;
      }

      elapsedTime /= 1000;
      elapsedTime = elapsedTime.toFixed(2);

      if (time.current) {
        time.current.textContent = elapsedTime;
      }
    });

    return () => {
      unsubscribeAddEffect();
    };
  }, []);

  return (
    <div className="interface">
      <div ref={time} className="time">
        0.00
      </div>
      {phase === "ended" ? (
        <div className="restart" onClick={restart}>
          Restart
        </div>
      ) : null}

      <div className="controls">
        <div className="raw">
          <div className={`key ${forward && "active"}`}></div>
        </div>
        <div className="raw">
          <div className={`key ${leftward && "active"}`}></div>
          <div className={`key ${backward && "active"}`}></div>
          <div className={`key ${rightward && "active"}`}></div>
        </div>
        <div className="raw">
          <div className={`key large ${jump && "active"}`}></div>
        </div>
      </div>
    </div>
  );
};

export default GameInterface;
