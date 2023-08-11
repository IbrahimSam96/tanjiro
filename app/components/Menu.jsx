'use client'

import moment from "moment/moment";
import { gameStates, useGameStore } from "../store"
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useEffect, useState } from "react";


import { useAccount, useContractWrite, useNetwork, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { parseEther } from "viem";

import { erc721DropABI } from "@zoralabs/zora-721-contracts";

import Image from "next/image";
const Menu = () => {

    const { startGame, gameState, goToMenu, wrongAnswers, streak, topStreak, timeStamp, endTimeStamp } = useGameStore((state) => ({
        startGame: state.startGame,
        gameState: state.gameState,
        goToMenu: state.goToMenu,
        wrongAnswers: state.wrongAnswers,
        streak: state.streak,
        topStreak: state.topStreak,
        timeStamp: state.timeStamp,
        endTimeStamp: state.endTimeStamp
    }));

    // console.log(wrongAnswers, streak, topStreak, timeStamp);

    let elapsedDuration = moment(endTimeStamp).diff(timeStamp)

    let elapsed = moment(elapsedDuration).format('mm:ss');


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
                    <p className={`my-auto mr-2`}> Mint Master's NFT</p>
                </button>

            </div>
            <div
                className={`scores ${gameState !== gameStates.GAME_OVER ? "scores--hidden" : ""
                    }`}
            >
                <h1 className={`text-white font-serif`}>Congratulations you are becoming a true master</h1>

                <span className={`flex`}>
                    <p className={`text-white font-serif`}>Elapsed Time: </p>
                    <p className={`font-serif ml-2 text-white `}> {elapsed}</p>
                </span>

                <span className={`flex`}>
                    <p className={`text-white font-serif`}>Total Wrong Answers: </p>
                    <p className={`text-[red] font-serif ml-2`}> {wrongAnswers}</p>
                </span>

                <span className={`flex`}>
                    <p className={`text-white font-serif`}>Top Streak: </p>
                    <p className={`text-[green] font-serif ml-2`}> {topStreak}</p>
                </span>

                <button
                    className={`px-4 py-8 border-none transition-colors text-2xl
                bg-[rgba(255,255,255,0.6)] hover:bg-white hover:cursor-pointer `}
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