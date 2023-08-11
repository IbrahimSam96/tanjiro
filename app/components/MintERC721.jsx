'use client'

import { useEffect, useState } from "react";
import { useAccount, useContractWrite, useNetwork, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { parseEther } from "viem";

import { erc721DropABI } from "@zoralabs/zora-721-contracts";

export const MintERC721 = () => {

    // Wagmi and ethers provider and signer setup
    const connection = useNetwork();

    const { address } = useAccount();

    const [HariaganaERC21Address, setHariganaERC721Address] = useState('');
    const [KatakanaERC21Address, setKatakanaERC721Address] = useState('');
    const [SuperHackERC21Address, setSuperHackERC21Address] = useState('')
    // Zora'a deployed ERC721 contracts to mint NFT against
    // Optimisim Goerli Harigana Master 0x82d509f7c3e2cc64bb6bb4979a4492397b3d4707
    // Optimisim Goerli Katakana Master 0x6c8ad6f32515eaa1275671f654a1cef7e2fc1113
    // Optimisim Goerli Super Hack - Tanjiro 0x2c5ba50d47769c2f541ba34f5756d16cf553c0a1
    // Changes Zora's Contract Addresses depending on active chain 
    useEffect(() => {
        if (connection.chain) {
            if (connection.chain.name == "Optimism Goerli") {
                setHariganaERC721Address('0x82d509f7c3e2cc64bb6bb4979a4492397b3d4707')
                setKatakanaERC721Address('0x6c8ad6f32515eaa1275671f654a1cef7e2fc1113')
                setSuperHackERC21Address('setSuperHackERC21Address')
            }

            if (connection.chain.name == 'Sepolia') {
                setHariganaERC721Address('')
                setKatakanaERC721Address('')
                setSuperHackERC21Address('')
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
    const comment = "Awarded for being a true master in game mode";
    // address that will receive mint referrral rewards
    const mintReferral = address;

    const mintFee = parseEther("0.000777");

    const {
        config,
        error: prepareError,
        isError: isPrepareError,
    } = usePrepareContractWrite({
        abi: erc721DropABI,
        address: erc721AddressHarigana,
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


    return (
        <button onClick={() => {
            write?.();
        }} className={`p-4 border-none rounded transition-colors text-xl
        bg-[rgba(255,255,255,60%)] hover:bg-[#FFFFFF] hover:cursor-pointer `}>
            Mint ERC721 TOKEN
        </button>
    )
}