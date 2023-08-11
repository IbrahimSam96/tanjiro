'use client'

import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense, useMemo } from "react";
import { Experience } from '@/app/components/Experience'
import { Cloud, KeyboardControls, Loader, useFont, useProgress } from "@react-three/drei";
import Menu from "./components/Menu";
import { Leva } from "leva";
import { RegisterSchema } from "./components/RegisterNewSchema";


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


  return (
    <>
      <KeyboardControls map={map}>
        <Leva hidden />

        <Canvas className={`row-start-2 col-start-1 col-span-8`} shadows camera={{ position: [0, 20, 19], fov: 42 }}>
          <color attach="background" args={["black"]} />

          {/* NEAR AND FAR */}
          <Suspense>
            <Physics>
              <Experience />
            </Physics>
          </Suspense>
        </Canvas>
        <Loader />

        {/* Menu + Attestation + Mint */}
        {progress == 100 &&
          <>
            <Menu />
            {/* <RegisterSchema /> */}
          </>
        }
      </KeyboardControls>

    </>
  )
}