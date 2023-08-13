'use client'
import { ContactShadows, CubeCamera, Cylinder, Detailed, Environment, MeshPortalMaterial, MeshReflectorMaterial, OrbitControls, RoundedBox, CameraControls, Stars, Stats, Text, Text3D, useCursor, useTexture, SpotLight, Edges, Html } from "@react-three/drei";
import { CuboidCollider, CylinderCollider, RigidBody } from "@react-three/rapier";
import { Torii } from "./Torii";
import { Ethereum } from "./Ethereum";
import { kanas } from "@/constants";
import { gameStates, useGameStore } from "@/app/store";
import { Suspense, useEffect, useRef, useState } from "react";
import KanaSpots from "./KanaSpots";
import CharacterController from "./CharacterController";
import { Kicker } from "./Kicker";
import { Cherry } from "./Cherry";

import { useControls } from "leva";
// Model
// import Hisoka from "./Hisoka";
// import { Tanjiro } from "./Tanjiro";
// import { Moon } from "./Moon";

import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import * as THREE from "three";
import { Tanjiro } from "./Tanjiro";
import { Gyutaro } from "./Gyutaro";
import { Nezuko } from "./Nezuko";


export const Experience = () => {

    const { currentKana, lastWrongKana, gameState } = useGameStore((state) => ({
        currentKana: state.currentKana,
        lastWrongKana: state.lastWrongKana,
        gameState: state.gameState
    }));

    return (
        // <Stats />
        // <OrbitControls />
        // <Moon position={[11, 7, -20]} rotation-y={0.45} rotation-x={0} />
        // <Tanjiro position={[-16, 0, -12]} rotation-y={0.45} rotation-x={0} /> 
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

                    {/* <group position-y={0.5}>
                        <Kicker />
                    </group> */}

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
    )
}

export const Experience2 = () => {

    const { currentKana, lastWrongKana, gameState } = useGameStore((state) => ({
        currentKana: state.currentKana,
        lastWrongKana: state.lastWrongKana,
        gameState: state.gameState
    }));

    const [active, setActive] = useState(null);
    const [hovered, setHovered] = useState(null);
    useCursor(hovered);
    const controlsRef = useRef();
    const scene = useThree((state) => state.scene);

    useEffect(() => {
        if (active) {
            const targetPosition = new THREE.Vector3();
            scene.getObjectByName(active).getWorldPosition(targetPosition);
            controlsRef.current?.setLookAt(
                0,
                0,
                5,
                targetPosition.x,
                targetPosition.y,
                targetPosition.z,
                true
            );
        } else {
            controlsRef.current?.setLookAt(0, 0, 10, 0, 0, 0, true);
        }
    }, [active]);

    return (
        <>
            {/* Lights */}
            <ambientLight intensity={0.8} />
            {/* <OrbitControls /> */}
            <Stars radius={100} depth={500} count={5000} factor={4} saturation={0} fade speed={2} />
            <CameraControls
                ref={controlsRef}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 6}
            />

            <group >

                <NFTCard
                    name="Harigana Master"
                    color="#db8595"
                    texture={
                        "textures/anime_art_style_a_water_based_pokemon_like_environ.jpg"
                    }
                    active={active}
                    setActive={setActive}
                    hovered={hovered}
                    setHovered={setHovered}
                >

                    <Nezuko scale={[1.5, 1.5, 1.5]} position-y={0.5} position-x={0.2} rotation-y={0} />

                </NFTCard>

                <NFTCard
                    texture={"textures/anime_art_style_lava_world.jpg"}
                    name="Katakana Master"
                    color={"#ff0027"}
                    position-x={-3}
                    rotation-y={Math.PI / 8}
                    active={active}
                    setActive={setActive}
                    hovered={hovered}
                    setHovered={setHovered}
                >
                    <Tanjiro position-y={-1} position-x={0.2} rotation-y={-0.45} />

                </NFTCard>
                <NFTCard
                    name="Super Hack"
                    color="#7c8758"
                    texture={"textures/anime_art_style_cactus_forest.jpg"}
                    position-x={3}
                    rotation-y={-Math.PI / 8}
                    active={active}
                    setActive={setActive}
                    hovered={hovered}
                    setHovered={setHovered}
                >
                    <Gyutaro position-y={-1} position-x={0.2} rotation-y={2.5} hovered={hovered === "Super Hack"} />
                </NFTCard>


            </group>
        </>
    )
}

const NFTCard = ({
    children,
    texture,
    name,
    color,
    active,
    setActive,
    hovered,
    setHovered,
    ...props
}) => {
    const map = useTexture(texture);
    const portalMaterial = useRef();

    useFrame((_state, delta) => {
        const worldOpen = active === name;
        easing.damp(portalMaterial.current, "blend", worldOpen ? 1 : 0, 0.2, delta);
    });


    const { gl } = useThree();


    return (
        <group {...props}>
            <Text
                font="fonts/Caprasimo-Regular.ttf"
                fontSize={0.15}
                position={[-0.35, 1.8, 0.051]}
                anchorY={"top"}
            >
                {name}
                <meshBasicMaterial color={color} toneMapped={false} />
            </Text>
            <Html
                scale={0.3}
                transform
                portal={{ current: gl.domElement.parentNode }}
                position={[0, -2, 0]}
            >
                <span className={` bg-[#5c3069] min-w-[275px] grid bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg p-4 px-8`}>
                    <p className={`text-white`} >Mint Status</p>
                </span>

            </Html>

            <RoundedBox
                name={name}
                args={[2, 3, 0.1]}
                onDoubleClick={() => setActive(active === name ? null : name)}
                onPointerEnter={() => setHovered(name)}
                onPointerLeave={() => setHovered(null)}
            >
                <MeshPortalMaterial ref={portalMaterial} side={THREE.DoubleSide}>
                    <ambientLight intensity={1} />
                    <Environment preset="sunset" />
                    {children}
                    <mesh>
                        <sphereGeometry args={[5, 64, 64]} />
                        <meshStandardMaterial map={map} side={THREE.BackSide} />
                    </mesh>
                </MeshPortalMaterial>
            </RoundedBox>
        </group>
    );
};