'use client'
// @refresh reset

import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";
import { Experience } from '@/app/components/Experience'

export default function PageComponent() {

  return (
    <>
      <Canvas shadows camera={{ position: [0, 10, 14], fov: 42 }}>
        <color attach="background" args={["#e3daf7"]} />
        {/* NEAR AND FAR */}
        <fog attach='fog' args={['#e3daf7', 37, 40]} />
        <Suspense>
          <Physics>
            <Experience />
          </Physics>
        </Suspense>
      </Canvas>
    </>
  )
}