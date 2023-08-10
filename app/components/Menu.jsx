import moment from "moment/moment";
import { gameStates, useGameStore } from "../store"

export const Menu = () => {

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

    console.log(wrongAnswers, streak, topStreak, timeStamp);

    let elapsedDuration = moment(endTimeStamp).diff(timeStamp)

    let elapsed = moment(elapsedDuration).format('mm:ss');



    return (
        <>
            <div className={`menu ${gameState !== gameStates.MENU ? `menu--hidden` : ``}`}>
                <div>
                    <h1 className={`text-white font-serif text-center`}>Kana Game</h1>
                    <p className={`text-white`}>What do you want to practice today?</p>
                </div>

                <button disabled={gameState !== gameStates.MENU}
                    onClick={() => startGame({ mode: 'hiragana' })}
                    className={`px-4 py-8 border-none transition-colors text-2xl
                    bg-[rgb(215,186,223,60%)] hover:bg-white hover:cursor-pointer `}>
                    Start hiragana game
                </button>

                <button disabled={gameState !== gameStates.MENU}
                    onClick={() => startGame({ mode: 'kitakana' })}
                    className={`px-4 py-8 border-none transition-colors text-2xl
                 bg-[rgb(215,186,223,60%)] hover:bg-white hover:cursor-pointer `}
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
            </div>
            <div
                className={`scores ${gameState !== gameStates.GAME_OVER ? "scores--hidden" : ""
                    }`}
            >
                <h1 className={`text-white font-serif`}>Congratulations you are becoming a true master</h1>

                <span className={`flex`}>
                    <p className={`text-white font-serif`}>Elapsed Time: </p>
                    <p className={`font-serif ml-2`}> {elapsed}</p>
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