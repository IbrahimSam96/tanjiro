'use client'
import { Cloud, ContactShadows, CubeCamera, Cylinder, Detailed, Environment, MeshReflectorMaterial, OrbitControls, Stars, Stats, Text, Text3D } from "@react-three/drei";
import { CuboidCollider, CylinderCollider, RigidBody } from "@react-three/rapier";
import { Torii } from "./Torii";
import { Ethereum } from "./Ethereum";
import { kanas } from "@/constants";
import { gameStates, useGameStore } from "@/app/store";
import { Suspense, useEffect, useState } from "react";
import KanaSpots from "./KanaSpots";
import CharacterController from "./CharacterController";
import { Kicker } from "./Kicker";
import { Cherry } from "./Cherry";
import { useControls } from "leva";
import Hisoka from "./Hisoka";
// import { Tanjiro } from "./Tanjiro";
// import { Moon } from "./Moon";


export const Experience = () => {

    const { currentKana, lastWrongKana, gameState } = useGameStore((state) => ({
        currentKana: state.currentKana,
        lastWrongKana: state.lastWrongKana,
        gameState: state.gameState
    }));

    // // When gameState changes Calls changeScene
    // useEffect(
    //     () => useGameStore.subscribe((state) => state.gameState, changeScene),
    //     []
    // );


    return (
        <>

            {/* <Stats />
            <OrbitControls />
            <Moon position={[11, 7, -20]} rotation-y={0.45} rotation-x={0} />
            <Tanjiro position={[-16, 0, -12]} rotation-y={0.45} rotation-x={0} /> */}

            {gameState == gameStates.SHOW ?
                <>
                    {/* Lights */}
                    <ambientLight intensity={0.8} />
                    <OrbitControls />

                </>
                :
                <>
                    {/* Lights */}
                    <ambientLight intensity={0.8} />

                    {/* Text Helper */}
                    <Text
                        position={[0, 0.2, 0]}
                        fontSize={1.84}
                        rotation-x={-Math.PI / 2}
                        font="./fonts/Poppins-ExtraBold.ttf"
                    >
                        {currentKana ? currentKana.name.toUpperCase() : "Kana Game"}
                        <meshStandardMaterial color={"#aa9acd"} opacity={0.6} transparent />
                    </Text>

                    {lastWrongKana && (
                        <Text
                            position={[0, 0.2, 1.2]}
                            fontSize={1}
                            rotation-x={-Math.PI / 2}
                            font="./fonts/Poppins-ExtraBold.ttf"
                        >
                            {lastWrongKana.name.toUpperCase()}
                            <meshStandardMaterial color={"red"} opacity={0.6} transparent />
                        </Text>
                    )}

                    {/* Scene background Objects Cherry & Tori gate */}
                    <group position-z={-3}>
                        <Ethereum scale={[0.15, 0.15, 0.15]} position={[-1.5, 4.8, -13.8]} />
                        <Ethereum scale={[0.15, 0.15, 0.15]} position={[1.5, 4.8, -13.8]} />

                        <Torii scale={[0.008, 0.008, 0.008]} position={[-10, -1.5, -14]} rotation-y={-1.25 * Math.PI} />

                        <Torii scale={[0.015, 0.015, 0.015]} position={[0, -1.5, -8]} rotation-y={1.5 * Math.PI} />

                        <Torii scale={[0.008, 0.008, 0.008]} position={[5, -1.5, -10]} rotation-y={1.25 * Math.PI} />

                        <Cherry scale={[0.08, 0.08, 0.08]} position={[12, 0, 6]} rotation-y={1.5} rotation-x={0} />

                        <Cherry scale={[0.08, 0.08, 0.08]} position={[-12, 0, 6]} rotation-y={1.5} rotation-x={0} />
                    </group>
                    {/* Scene */}
                    <group position-y={-1}>
                        <Stars radius={100} depth={500} count={5000} factor={4} saturation={0} fade speed={2} />

                        <RigidBody colliders={false} type='fixed' name='void'>
                            <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                                <planeGeometry args={[50, 50]} />
                                <MeshReflectorMaterial blur={[300, 100]}
                                    resolution={348}
                                    mixBlur={1}
                                    mixStrength={50}
                                    roughness={1}
                                    depthScale={1.2}
                                    minDepthThreshold={0.4}
                                    maxDepthThreshold={1.4}
                                    color="#5c3069"
                                    metalness={0.5}
                                />
                            </mesh>
                            <CuboidCollider position={[0, -3.5, 0]} args={[100, 0.1, 100]} sensor />
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

                        {/* Arena */}
                        <group position-y={1} >

                            <group position-y={0.5}>
                                <Kicker />
                            </group>

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

                    </group>

                </>
            }
        </>
    )
}

