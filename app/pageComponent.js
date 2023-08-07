'use client'
// @refresh reset

import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense, useMemo } from "react";
import { Experience } from '@/app/components/Experience'
import { KeyboardControls } from "@react-three/drei";
import { Menu } from "./components/Menu";

export const Controls = {
  forward: 'forward',
  back: 'back',
  left: 'left',
  right: 'right',
  jump: 'jump',

}

export default function PageComponent() {

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

  return (
    <>
      <KeyboardControls map={map}>
        <Canvas className={`row-start-2 col-start-1 col-span-8`} shadows camera={{ position: [0, 10, 14], fov: 42 }}>
          <color attach="background" args={["black"]} />
          {/* NEAR AND FAR */}
          <fog attach='fog' args={['black', 37, 40]} />
          <ambientLight intensity={1} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={0.8}
            color={'#9e69da'}
          />

          <Suspense>
            <Physics>
              <Experience />
            </Physics>
          </Suspense>
        </Canvas>
        <Menu />
      </KeyboardControls>

    </>
  )
}