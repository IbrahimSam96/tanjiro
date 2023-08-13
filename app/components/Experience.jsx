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
import { useAccount, useContractWrite, useNetwork, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { parseEther } from "viem";

import { erc721DropABI } from "@zoralabs/zora-721-contracts";
import { EAS } from "@ethereum-attestation-service/eas-sdk/dist";
import { useProvider } from "../ethers";


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

    const { currentKana, lastWrongKana, gameState, latestAttestation, goToMenu } = useGameStore((state) => ({
        currentKana: state.currentKana,
        lastWrongKana: state.lastWrongKana,
        gameState: state.gameState,
        latestAttestation: state.latestAttestation,
        goToMenu: state.goToMenu
    }));

    const [active, setActive] = useState(null);
    const [hovered, setHovered] = useState(null);
    useCursor(hovered);
    const controlsRef = useRef();
    const scene = useThree((state) => state.scene);

    const { gl } = useThree();

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


    // EAS Contract Address
    const [EASContractAddress, setEASContractAddress] = useState('');
    // list of Schema Contract Addresses - Ethereun Attestation Service
    const EASAddresses = {
        optimismGoerli: '0x4200000000000000000000000000000000000021',
        sepolia: '0xC2679fBD37d54388Ce493F1DB75320D236e1815e',
        baseGoerli: '0xAcfE09Fd03f7812F022FBf636700AdEA18Fd2A7A'
        // zoraTestnet: '', NOT SUPPORTED ON EAS
        // modeTestnet: '' NOT SUPPORTED ON EAS
    }

    const ValidateAttestationAndMint = async () => {

        console.log(latestAttestation);

        if (!latestAttestation) {
            return;
        }

        const eas = new EAS(EASContractAddress);

        eas.connect(provider);

        // Optimism goerli 0x6fe3dcba49e0a75864caff989589a8d1831cf3f332f2eba694900019eb5c4c48 0xfd6d935cc0c276eb24da791e931498f10f4e0f15617f9dec2473eb7d545cfb27
        // sepolia example 0x7f8ddbf4246d5fe732d4ac373bc0790ccba6aa074fab21622154ffb4cba39c77

        const attestation = await eas.getAttestation(latestAttestation);

        // Validate Attestation 
        if (attestation) {
            // Depending on the attestation values choose the applicable NFT. 

            let isValid = address == attestation.recipient;
            console.log(' AttestationValid:', attestation);

            write?.();
        }

        console.log('Latest Attestation:', attestation);
    }

    // Wagmi and ethers provider and signer setup
    const connection = useNetwork();
    const provider = useProvider();

    const { address } = useAccount();

    const [HariaganaERC21Address, setHariganaERC721Address] = useState('');
    const [KatakanaERC21Address, setKatakanaERC721Address] = useState('');
    const [SuperHackERC21Address, setSuperHackERC21Address] = useState('');
    // Zora deployed ERC721 contracts to mint NFT against
    // Optimisim Goerli Harigana Master 0x82d509f7c3e2cc64bb6bb4979a4492397b3d4707
    // Optimisim Goerli Katakana Master 0x6c8ad6f32515eaa1275671f654a1cef7e2fc1113
    // Optimisim Goerli Super Hack - Tanjiro 0x2c5ba50d47769c2f541ba34f5756d16cf553c0a1

    // Changes Zora's Contract Addresses AND EAS depending on active chain 
    useEffect(() => {
        if (connection.chain) {
            if (connection.chain.name == "Optimism Goerli") {
                setHariganaERC721Address('0x82d509f7c3e2cc64bb6bb4979a4492397b3d4707')
                setKatakanaERC721Address('0x6c8ad6f32515eaa1275671f654a1cef7e2fc1113')
                setSuperHackERC21Address('0x2c5ba50d47769c2f541ba34f5756d16cf553c0a1')

                setEASContractAddress(EASAddresses.optimismGoerli);

            }

            if (connection.chain.name == 'Sepolia') {
                setHariganaERC721Address('')
                setKatakanaERC721Address('')
                setSuperHackERC21Address('')

                setEASContractAddress(EASAddresses.sepolia)
                setEASContractAddress(EASAddresses.baseGoerli)

            }

            if (connection.chain.name == 'Base Goerli') {
                setHariganaERC721Address('')
                setKatakanaERC721Address('')
                setSuperHackERC21Address('')
            }

        }

    }, [connection.chain]);


    const erc721AddressHarigana = HariaganaERC21Address;
    const erc721AddressKatakana = KatakanaERC21Address;
    const erc721AddressSuperHack = SuperHackERC21Address;

    const recipient = address;
    const quantity = 1n;
    const comment = "Awarded for being a true master in the game mode"; //todo tailor it to depending on the record 
    // address that will receive mint referrral rewards
    const mintReferral = address;

    const mintFee = parseEther("0.000777");

    const {
        config,
        error: prepareError,
        isError: isPrepareError,
    } = usePrepareContractWrite({
        abi: erc721DropABI,
        address: erc721AddressKatakana,
        functionName: "mintWithRewards",
        args: [recipient, quantity, comment, mintReferral],
        value: mintFee * quantity,
    });

    const { write, data, error, isLoading, isError } = useContractWrite(config);
    const {
        data: receipt,
        isLoading: isPending,
        isSuccess,
    } = useWaitForTransaction({ hash: data?.hash });

    console.log(receipt)
    useEffect(() => {
    // Play SoundTrack After Mint
        if (isSuccess) {
            const audio = new Audio(`./sounds/ThemeSong.mp3`);
     
            audio.play();

        }
    }, [receipt])


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
                    ValidateAttestationAndMint={ValidateAttestationAndMint}

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
                    ValidateAttestationAndMint={ValidateAttestationAndMint}

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
                    ValidateAttestationAndMint={ValidateAttestationAndMint}
                >
                    <Gyutaro position-y={-1} position-x={0.2} rotation-y={2.5} hovered={hovered === "Super Hack"} />
                </NFTCard>

                <Html
                    scale={0.3}
                    transform
                    portal={{ current: gl.domElement.parentNode }}
                    position={[-4, 2.5, 0]}

                >
                    <button
                        className={`MenuMint self-center text-center w-full`}
                        onClick={goToMenu}
                    >
                        Go Back
                    </button>
                </Html>

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
    ValidateAttestationAndMint,
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
                position={[0, -2.2, 0]}
            >
                <span className={` bg-[#5c3069] min-w-[275px] grid bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg p-4 px-8`}>
                    <span className={`grid`}>

                        <span className={`flex py-2`}>
                            <p className={`text-white mr-auto my-auto`} >Mint Status</p>

                            <span className={`flex ml-auto my-auto`} >
                                <svg className={`inline animate-pulse my-auto`} width="30" height="30" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.25968 4.35211C9.64783 4.35211 10.0222 4.40304 10.3828 4.50489C10.7435 4.604 11.0793 4.74577 11.3904 4.93021C11.7042 5.11464 11.9891 5.33625 12.2451 5.59501C12.5039 5.85103 12.7255 6.13594 12.9099 6.44977C13.0944 6.76084 13.2361 7.09668 13.3352 7.4573C13.4371 7.81792 13.488 8.19231 13.488 8.58045C13.488 8.9686 13.4371 9.34299 13.3352 9.70361C13.2361 10.0642 13.0944 10.4014 12.9099 10.7153C12.7255 11.0263 12.5039 11.3113 12.2451 11.57C11.9891 11.826 11.7042 12.0463 11.3904 12.2307C11.0793 12.4151 10.7435 12.5583 10.3828 12.6601C10.0222 12.7592 9.64783 12.8088 9.25968 12.8088C8.87153 12.8088 8.49715 12.7592 8.13653 12.6601C7.77591 12.5583 7.43869 12.4151 7.12487 12.2307C6.8138 12.0463 6.52888 11.826 6.27011 11.57C6.0141 11.3113 5.79387 11.0263 5.60944 10.7153C5.425 10.4014 5.28185 10.0642 5.17999 9.70361C5.08089 9.34299 5.03134 8.9686 5.03134 8.58045C5.03134 8.19231 5.08089 7.81792 5.17999 7.4573C5.28185 7.09668 5.425 6.76084 5.60944 6.44977C5.79387 6.13594 6.0141 5.85103 6.27011 5.59501C6.52888 5.33625 6.8138 5.11464 7.12487 4.93021C7.43869 4.74577 7.77591 4.604 8.13653 4.50489C8.49715 4.40304 8.87153 4.35211 9.25968 4.35211Z" fill="#27AE60" />
                                </svg>
                                <p className={`text-[#02ec7f] font-bold text-xs ml-1 inline my-auto`}>Active</p>

                            </span>

                        </span>

                        <span className={`flex py-2`}>
                            <p className={`text-white mr-auto `} >Price </p>
                            <p className={`text-white ml-auto text-xl font-bold`} >Free </p>

                        </span>

                        <span className={`flex pb-2`}>
                            <a className={`mr-auto`} href={`https://support.zora.co/en/articles/4981037-zora-mint-collect-fees`} rel="noreferrer" target="_blank">
                                <p className={`text-[grey]  `} >Mint Fee ↗ </p>
                            </a>
                            <p className={`text-white ml-auto text-base font-bold whitespace-pre-wrap `} >0.000777 ETH
                            </p>
                        </span>

                        <button
                            className={`MenuMint self-center text-center w-full`}
                            onClick={() => {
                                ValidateAttestationAndMint()
                            }}
                        >
                            Mint
                        </button>
                    </span>

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