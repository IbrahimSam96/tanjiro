'use client'
import { ContactShadows, Cylinder, Environment, MeshReflectorMaterial, OrbitControls, Stars, Text, Text3D } from "@react-three/drei";
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

    const { currentKana, lastWrongKana } = useGameStore((state) => ({
        currentKana: state.currentKana,
        lastWrongKana: state.lastWrongKana,
    }));


    return (
        <>
            {/* Lights */}
            {/* <Environment preset={'night'} /> */}
            <directionalLight
                position={[5, 5, 5]}
                intensity={0.3}
                color={'#9e69da'}
            />

            <Text
                position={[0, -0.92, 0]}
                fontSize={1.84}
                rotation-x={-Math.PI / 2}
                font="./fonts/Poppins-ExtraBold.ttf"
            >
                {currentKana ? currentKana.name.toUpperCase() : "Kana Game"}
                <meshStandardMaterial color={"white"} opacity={0.6} transparent />
            </Text>

            {lastWrongKana && (
                <Text
                    position={[0, -0.92, 1.2]}
                    fontSize={1}
                    rotation-x={-Math.PI / 2}
                    font="./fonts/Poppins-ExtraBold.ttf"
                >
                    {lastWrongKana.name.toUpperCase()}
                    <meshStandardMaterial color={"red"} opacity={0.6} transparent />
                </Text>
            )}
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

                {/* Background */}
                <Stars radius={100} depth={500} count={5000} factor={4} saturation={0} fade speed={2} />
                <RigidBody colliders={false} type='fixed' name='void'>
                    <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                        <planeGeometry args={[50, 50]} />
                        <meshBasicMaterial color={'#e3daf7'} toneMapped={false} />

                    </mesh>
                    <CuboidCollider position={[0, -3.5, 0]} args={[50, 0.1, 50]} sensor />
                </RigidBody>
                <ContactShadows
                    frames={1}
                    position={[0, -0.88, 0]}
                    scale={80}
                    opacity={0.42}
                    far={50}
                    blur={0.8}
                    color={"#aa9acd"}
                />
                {/* Stage */}
                <RigidBody colliders={false} type="fixed" position-y={-0.5} friction={2} >
                    <CylinderCollider args={[1 / 2, 5]} />
                    <Cylinder scale={[5, 1, 5]} receiveShadow >
                        <meshStandardMaterial color={'white'} />
                    </Cylinder>
                </RigidBody>

                {/* Character */}
                <CharacterController />

                {/* Kana */}
                <KanaSpots />
            </group>
            {/*  */}
        </>
    )
}
