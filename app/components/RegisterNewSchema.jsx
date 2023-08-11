'use client'
import { EAS, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { SchemaEncoder } from "@ethereum-attestation-service/eas-sdk/dist";
import { ethers } from 'ethers';
import { useEffect, useState } from "react";
import { useAccount, useNetwork, usePublicClient, useWalletClient } from "wagmi";
import { useEthersSigner, useProvider } from "../ethers";
import { gameStates, useGameStore } from "../store";

export const RegisterSchema = () => {

    const { wrongAnswers, mode, timeStamp, endTimeStamp, gameState } = useGameStore(
        (state) => ({
            wrongAnswers: state.wrongAnswers,
            mode: state.mode,
            timeStamp: state.timeStamp,
            endTimeStamp: state.endTimeStamp,
            gameState: state.gameState
        })
    );
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
    // list of Schema Contract Addresses - Ethereun Attestation Service
    const EASAddresses = {
        optimismGoerli: '0x4200000000000000000000000000000000000021',
        sepolia: '0xC2679fBD37d54388Ce493F1DB75320D236e1815e',
        baseGoerli: '0xAcfE09Fd03f7812F022FBf636700AdEA18Fd2A7A'
        // zoraTestnet: '', NOT SUPPORTED ON EAS
        // modeTestnet: '' NOT SUPPORTED ON EAS
    }
    // Schema Resgistry Contract Address
    const [schemaRegistryContractAddress, setSchemaRegistryContractAddress] = useState('')
    // list of Schema Registry Contract Addresses - Ethereun Attestation Service
    const SchemaRegistryAddresses = {
        optimismGoerli: '0x4200000000000000000000000000000000000020',
        sepolia: '0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0',
        baseGoerli: '0x720c2bA66D19A725143FBf5fDC5b4ADA2742682E'
        // zoraTestnet: '', NOT SUPPORTED ON EAS
        // modeTestnet: '' NOT SUPPORTED ON EAS
    }
    // Deployed Schemas UID's
    // Sepolia 0x9b64e207e65aed3b0143bebc1b715ca2a012fce065ec7cfe0fc2dda061e1c464
    // Optimism Goerli 0x9b64e207e65aed3b0143bebc1b715ca2a012fce065ec7cfe0fc2dda061e1c464
    // Base Goerli // NOT available yet

    const [schemaUID, setActiveSchemaUID] = useState('');

    const [AttestationUID, setAttestationUID] = useState('');

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

        }

    }, [connection.chain]);



    const getSchema = async () => {

        const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);
        schemaRegistry.connect(provider);

        const schemaRecord = await schemaRegistry.getSchema({ uid: schemaUID });

        console.log(schemaRecord);

    }

    const getAttestation = async () => {

        if (AttestationUID == '') {
            console.log('No attestation UID provided')
            return;
        }

        const eas = new EAS(EASContractAddress);

        eas.connect(provider);

        // sepolia example 0x7f8ddbf4246d5fe732d4ac373bc0790ccba6aa074fab21622154ffb4cba39c77
        // Optimism goerli 0x6fe3dcba49e0a75864caff989589a8d1831cf3f332f2eba694900019eb5c4c48
        const attestation = await eas.getAttestation(AttestationUID);

        console.log(attestation);

    }

    const RegisterSchema = async () => {

        if (schemaRegistryContractAddress == '' || EASContractAddress == '') {
            return;
        }
        // Initialize the sdk with the address of the EAS Schema contract address
        // 0xC2679fBD37d54388Ce493F1DB75320D236e1815e SEPOLIA
        const eas = new EAS(EASContractAddress);
        // Connects an ethers style provider/signingProvider to perform read/write functions.
        // MUST be a signer to do write operations!

        eas.connect(publicClient);
        // 0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0 SEPOLIA
        const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);

        schemaRegistry.connect(signer);

        const schema = "uint256 eventId, uint8 voteIndex";
        const resolverAddress = schemaRegistryContractAddress;
        const revocable = true;

        const transaction = await schemaRegistry.register({
            schema,
            resolverAddress,
            revocable,
        });

        // Optional: Wait for transaction to be validated
        await transaction.wait();

    }

    const AttestOnChain = async () => {

        // Attest User to mint Zora's ERC721  
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
                { name: "completionDate", value: timeStamp - endTimeStamp, type: "uint64" },
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

            // console.log("New attestation UID:", newAttestationUID);

        }
    }



    // When gameState changes Calls AttestOnChain
    useEffect(
        () => useGameStore.subscribe((state) => state.gameState, AttestOnChain),
        []
    );


    return (
        <>

        </>
    )
} 