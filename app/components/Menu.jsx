import { gameStates, useGameStore } from "../store"

export const Menu = () => {

    const { startGame, gameState, goToMenu } = useGameStore((state) => ({
        startGame: state.startGame,
        gameState: state.gameState,
        goToMenu: state.goToMenu,
    }));
    return (
        <>
            <div className={`menu ${gameState !== gameStates.MENU ? `menu--hidden` : ``}`}>
                <h1 className={`text-white font-serif`}>Kana Game</h1>
                <button disabled={gameState !== gameStates.MENU}
                    onClick={() => startGame({ mode: 'hiragana' })}
                    className={`px-4 py-8 border-none transition-colors text-2xl
                  bg-[rgba(255,255,255,0.6)] hover:bg-white hover:cursor-pointer `}>
                    Start hiragana game
                </button>
                <button disabled={gameState !== gameStates.MENU}
                    onClick={() => startGame({ mode: 'kitakana' })}
                    className={`px-4 py-8 border-none transition-colors text-2xl
                 bg-[rgba(255,255,255,0.6)] hover:bg-white hover:cursor-pointer `}
                >
                    Start katakana game
                </button>
                <div>
                    <p className={`text-white font-serif`}>
                        Made with 💙 by{" "}
                        <a href="https://youtube.com/@WawaSensei" target="_blank">
                            Dev_Jdeed
                        </a>
                        
                    </p>
                </div>
            </div>
            <div
                className={`scores ${gameState !== gameStates.GAME_OVER ? "scores--hidden" : ""
                    }`}
            >
                <h1 className={`text-white font-serif`}>Congratulations you are becoming a true master</h1>
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