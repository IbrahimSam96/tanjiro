'use client'
import { Cylinder, MeshReflectorMaterial, OrbitControls, Stars, Text3D } from "@react-three/drei";
import { CuboidCollider, CylinderCollider, RigidBody } from "@react-three/rapier";
import { Torii } from "./Torii";
import { Ethereum } from "./Ethereum";
import { kanas } from "@/constants";
import { useGameStore } from "@/app/store";
import { Suspense, useEffect } from "react";
import { KanaSpots } from "./KanaSpots";
import { CharacterController } from "./CharacterController";
import { Kicker } from "./Kicker";

export const Experience = () => {

    return (
        <>
            {/* <OrbitControls /> */}
            {/* Lights */}
            <ambientLight intensity={1} />
            <directionalLight
                position={[5, 5, 5]}
                intensity={0.8}
                color={'#9e69da'}
            />

            {/* Background */}
            <Stars radius={100} depth={500} count={5000} factor={4} saturation={0} fade speed={2} />
            <RigidBody colliders={false} type='fixed' name='void'>
                <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[50, 50]} />
                    <MeshReflectorMaterial
                        blur={[400, 400]}
                        resolution={1024}
                        mixBlur={1}
                        mixStrength={15}
                        depthScale={1}
                        minDepthThreshold={0.85}
                        color={'#dbecfb'}
                        metalness={0.6}
                        roughness={1}
                    />
                </mesh>
                <CuboidCollider position={[0, -3.5, 0]} args={[50, 0.1, 50]} sensor />
            </RigidBody>
            <group position-z={-3}>

                <Ethereum scale={[0.15, 0.15, 0.15]} position={[-1.5, 4.8, -13.8]} />
                <Ethereum scale={[0.15, 0.15, 0.15]} position={[1.5, 4.8, -13.8]} />

                <Torii scale={[0.008, 0.008, 0.008]} position={[-10, -1.5, -14]} rotation-y={-1.25 * Math.PI} />

                <Torii scale={[0.015, 0.015, 0.015]} position={[0, -1.5, -8]} rotation-y={1.5 * Math.PI} />

                <Torii scale={[0.008, 0.008, 0.008]} position={[5, -1.5, -10]} rotation-y={1.25 * Math.PI} />
            </group>

            {/* Arena */}
            <group position-y={-1}>
                <Kicker />
                <RigidBody colliders={false} type="fixed" position-y={-0.5} friction={2} >
                    <CylinderCollider args={[1 / 2, 5]} />
                    <Cylinder scale={[5, 1, 5]} receiveShadow >
                        <meshStandardMaterial color={'white'} />
                    </Cylinder>
                </RigidBody>

                {/* Character */}
                <Suspense>
                    <CharacterController />
                </Suspense>

                {/* Kana */}
                <KanaSpots />
            </group>
            {/*  */}
        </>
    )
}
