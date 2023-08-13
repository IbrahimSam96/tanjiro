'use client'

import moment from "moment/moment";
import { gameStates, useGameStore } from "../store"
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useEffect, useState } from "react";

import Image from "next/image";

import { EAS, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { SchemaEncoder } from "@ethereum-attestation-service/eas-sdk/dist";
import { ethers } from 'ethers';
import { useAccount, useNetwork, usePublicClient, useWalletClient } from "wagmi";
import { useEthersSigner, useProvider } from "../ethers";

const Menu = () => {

    const { startGame, gameState, goToMenu, mode, wrongAnswers, streak, topStreak, timeStamp, endTimeStamp, latestAttestation, setAttestationUID, goToShow } = useGameStore((state) => ({
        startGame: state.startGame,
        gameState: state.gameState,
        mode: state.mode,
        goToMenu: state.goToMenu,
        setAttestationUID: state.setAttestationUID,
        wrongAnswers: state.wrongAnswers,
        streak: state.streak,
        topStreak: state.topStreak,
        timeStamp: state.timeStamp,
        endTimeStamp: state.endTimeStamp,
        latestAttestation: state.latestAttestation,
        goToShow: state.goToShow
    }));

    // console.log(wrongAnswers, streak, topStreak, timeStamp);

    let elapsedDuration = moment(endTimeStamp).diff(timeStamp)

    let elapsed = moment(elapsedDuration).format('mm:ss');


    // Wagmi and ethers provider and signer setup
    const connection = useNetwork();
    // Wagmi signer/walletCLIENT provider/publicClient 
    const { data: walletClient } = useWalletClient({
        chainId: connection.chain?.id,
    });
    const publicClient = usePublicClient();

    // WAGMI walletClient TO ethers signer 
    const signer = useEthersSigner();

    const provider = useProvider();

    const { address, isDisconnected, isConnected } = useAccount();

    // EAS Contract Address
    const [EASContractAddress, setEASContractAddress] = useState('');
    // list of EAS Contract Addresses - Ethereun Attestation Service
    const EASAddresses = {
        optimismGoerli: '0x4200000000000000000000000000000000000021',
        sepolia: '0xC2679fBD37d54388Ce493F1DB75320D236e1815e',
        baseGoerli: '0xAcfE09Fd03f7812F022FBf636700AdEA18Fd2A7A',
        zoraTestnet: '0x83Bf9F56E703A87fC05eabB6933E1A8D5ceC87f3',
        // modeTestnet: '' NOT SUPPORTED ON EAS
    }
    // Schema Resgistry Contract Address
    const [schemaRegistryContractAddress, setSchemaRegistryContractAddress] = useState('')
    // list of Schema Registry Contract Addresses - Ethereun Attestation Service
    const SchemaRegistryAddresses = {
        optimismGoerli: '0x4200000000000000000000000000000000000020',
        sepolia: '0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0',
        baseGoerli: '0x720c2bA66D19A725143FBf5fDC5b4ADA2742682E',
        zoraTestnet: '0xBb7ca7a34cE4D4808385c117101657026d861292',
        // modeTestnet: '' NOT SUPPORTED ON EAS YET
    }
    // Deployed Schemas UID's
    // Sepolia 0x9b64e207e65aed3b0143bebc1b715ca2a012fce065ec7cfe0fc2dda061e1c464
    // Optimism Goerli 0x9b64e207e65aed3b0143bebc1b715ca2a012fce065ec7cfe0fc2dda061e1c464
    // zoraTestnet // NOT available yet
    // Base Goerli // NOT available yet

    const [schemaUID, setActiveSchemaUID] = useState('');

    // Changes All EAS Schema Registry, and Schema Contract Addresses depending on active chain 
    useEffect(() => {

        if (connection.chain) {
            if (connection.chain.name == "Optimism Goerli") {
                setSchemaRegistryContractAddress(SchemaRegistryAddresses.optimismGoerli);
                setEASContractAddress(EASAddresses.optimismGoerli);
                setActiveSchemaUID('0x9b64e207e65aed3b0143bebc1b715ca2a012fce065ec7cfe0fc2dda061e1c464')
            }

            if (connection.chain.name == 'Sepolia') {
                setSchemaRegistryContractAddress(SchemaRegistryAddresses.sepolia)
                setEASContractAddress(EASAddresses.sepolia)
                setActiveSchemaUID('0x9b64e207e65aed3b0143bebc1b715ca2a012fce065ec7cfe0fc2dda061e1c464')
            }

            if (connection.chain.name == 'Base Goerli') {
                setSchemaRegistryContractAddress(SchemaRegistryAddresses.baseGoerli)
                setEASContractAddress(EASAddresses.baseGoerli)
                // NOT available yet
                setActiveSchemaUID('')
            }

            if (connection.chain.name == "Zora Goerli Testnet") {
                setSchemaRegistryContractAddress(SchemaRegistryAddresses.zoraTestnet)
                setEASContractAddress(EASAddresses.zoraTestnet)
                // NOT available yet
                setActiveSchemaUID('')

            }

        }

    }, [connection.chain]);


    const [loading, setLoading] = useState(false);

    const AttestOnChain = async () => {
        setLoading(true)
        // Attest User score on EAS Schema  
        if (gameStates.GAME_OVER == gameState) {

            if (schemaUID == '' || EASContractAddress == '' || isDisconnected) {
                console.log('Empty Contract / Registry or UID value')
                return;
            }

            const eas = new EAS(EASContractAddress);

            eas.connect(signer);

            // // Initialize SchemaEncoder with the schema string
            const schemaEncoder = new SchemaEncoder("string gameMode, uint64 completionDate, bytes32 gameVersion");
            const encodedData = schemaEncoder.encodeData([
                { name: "gameMode", value: mode, type: "string" },
                { name: "completionDate", value: elapsed, type: "uint64" },
                { name: "gameVersion", value: '1', type: "bytes32" },
            ]);

            const tx = await eas.attest({
                schema: schemaUID,
                data: {
                    recipient: address,
                    expirationTime: 0,
                    revocable: true,
                    data: encodedData,
                },
            });

            const newAttestationUID = await tx.wait();
            setAttestationUID(newAttestationUID);

            console.log("New attestation UID:", newAttestationUID);

            setLoading(false)

        }
        else {
            setLoading(false)
        }
    }

    return (
        <>
            <div className={`menu ${gameState !== gameStates.MENU ? `menu--hidden` : ``}`}>
                <span className={`self-start ml-auto mx-2`}>
                    <ConnectButton />
                </span>

                <div>
                    <h1 className={`text-white font-serif text-center`}>Kana Game</h1>
                    <p className={`text-white`}>What do you want to practice today?</p>
                </div>

                <button disabled={gameState !== gameStates.MENU}
                    onClick={() => startGame({ mode: 'hiragana' })}
                    className={`Menubutton`}>
                    Start hiragana game
                </button>

                <button disabled={gameState !== gameStates.MENU}
                    onClick={() => startGame({ mode: 'kitakana' })}
                    className={`Menubutton`}
                >
                    Start katakana game
                </button>

                <div>
                    <p className={`text-white font-serif`}>
                        Made with 💙 by{" "}
                        <a href="https://twitter.com/dev_jdeed" target="_blank">
                            Dev_Jdeed
                        </a>

                    </p>
                </div>


                <button disabled={gameState !== gameStates.MENU}
                    onClick={() => {

                    }}
                    className={`MenubuttonMint flex`}
                >
                    <Image className={`my-auto mr-2`} alt={'Zora Mint'} src={'/zoraOrb.svg'} width={30} height={30} />
                    <p className={`my-auto mr-2`}> {`Mint Master's NFT`}</p>
                </button>

            </div>
            <div
                className={`scores ${gameState !== gameStates.GAME_OVER ? "scores--hidden" : ""
                    }`}
            >
                <span className={`self-start ml-auto mx-2`}>
                    <ConnectButton />
                </span>
                <h1 className={`text-white font-serif text-2xl`}>Congratulations you are becoming a true master</h1>

                <span className={` bg-[#5c3069] min-w-[400px] grid bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg p-4 px-8`}>

                    <p className={`text-white font-serif py-2`}> Stats </p>

                    <span className={`flex py-2`}>
                        <p className={`text-white font-serif mr-auto`}>  Time </p>
                        <p className={`font-serif text-white ml-auto`}> {elapsed}</p>
                    </span>

                    <span className={`flex py-2`}>
                        <p className={`text-white font-serif mr-auto`}>Wrong Answers </p>
                        <p className={`text-[yellow] font-serif ml-auto`}> {wrongAnswers}</p>
                    </span>

                    <span className={`flex py-2`}>
                        <p className={`text-white font-serif mr-auto`}>Top Streak </p>
                        <p className={`text-[#58db58] font-serif ml-auto`}> {topStreak}</p>
                    </span>

                    <p className={`text-white font-serif py-2 justify-self-start text-xs whitespace-pre-wrap`}> Instruction: Attest your game score on the desired destination chain to unlock mint rights </p>

                    <span className={`flex`}>

                        <button
                            disabled={gameState !== gameStates.GAME_OVER}

                            onClick={AttestOnChain}
                            className={`MenuSubmit py-2 ${loading ? 'animate-pulse min-w-[200px]' : ' '}   `}
                        >
                            {loading ? '' : 'Submit your score'}
                        </button>

                        <button
                            disabled={gameState !== gameStates.GAME_OVER}

                            className={`MenuSubmit ml-auto`}
                            onClick={goToShow}
                        >
                            Available Rewards
                        </button>
                    </span>


                    <p className={`text-[white] text-2xl font-mono font-extralight py-4 justify-self-center`}> or </p>

                </span>

                <button
                    className={`Menubutton `}
                    onClick={goToMenu}
                    disabled={gameState !== gameStates.GAME_OVER}
                >
                    Play again
                </button>

            </div>
        </>
    )
}

export default React.memo(Menu)