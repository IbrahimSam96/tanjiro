'use client'

import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense, useEffect, useMemo } from "react";
import { Experience, Experience2 } from '@/app/components/Experience'
import { Cloud, KeyboardControls, Loader, useFont, useProgress } from "@react-three/drei";
import Menu from "./components/Menu";
import { Leva } from "leva";
import { gameStates, useGameStore } from "./store";


export const Controls = {
  forward: 'forward',
  back: 'back',
  left: 'left',
  right: 'right',
  jump: 'jump',

}

export default function PageComponent() {

  useFont.preload("./fonts/Noto Sans JP ExtraBold_Regular.json");

  const map = useMemo(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.jump, keys: ["Space"] },
    ],
    []
  );

  const { progress } = useProgress();

  const { gameState, goToMenu } = useGameStore((state) => ({
    gameState: state.gameState,
    goToMenu: state.goToMenu
  }));


  // When gameState changes Calls changeScene
  // useEffect(
  //   () => useGameStore.subscribe((state) => state.gameState),
  //   []
  // );

  return (
    <>
      <KeyboardControls map={map}>
        <Leva hidden />
        <Canvas className={`row-start-2 col-start-1 col-span-8`} shadows camera={gameState == gameStates.SHOW ? { position: [0, 0, 10], fov: 30 } : { position: [0, 20, 19], fov: 42 }}>
          <color attach="background" args={["black"]} />
          {gameState == gameStates.SHOW ?
            <Suspense>
              <Experience2 />
            </Suspense>
            :
            <Suspense>
              <Physics>
                <Experience />
              </Physics>
            </Suspense>
          }
        </Canvas>
        <Loader />
        {/* Menu + Attestation + Mint */}
        {progress == 100 &&
          <>
            <Menu />
          </>
        }
      </KeyboardControls>

    </>
  )
}