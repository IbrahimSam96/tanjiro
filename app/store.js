import { create } from "zustand";
import { kanas } from "../constants";
import { subscribeWithSelector } from 'zustand/middleware';

export const gameStates = {
    MENU: 'MENU',
    GAME: 'GAME',
    GAME_OVER: 'GAME_OVER',
    SHOW: 'SHOW'
}

export const playAudio = (path, callback) => {
    const audio = new Audio(`./sounds/${path}.mp3`);
    if (callback) {
        audio.addEventListener("ended", callback);
    }
    audio.play();
};


export const generateGameLevel = ({ nbStages }) => {
    // array of stages
    const level = [];
    const goodKanas = []

    for (let i = 0; i < nbStages; i++) {
        const stage = [];
        const nOptions = 3 + i;

        for (let j = 0; j < nOptions; j++) {
            // the kana
            let kana = null;
            // loop and find one not already in stage
            while (!kana || stage.includes(kana) || goodKanas.includes(kana)) {

                kana = kanas[Math.floor(Math.random() * kanas.length)];
            }
            // Add it to stage
            stage.push(kana)
        }
        // Select a random kana to be the correct answer
        const goodKana = stage[Math.floor(Math.random() * stage.length)];
        goodKana.correct = true;
        goodKanas.push(goodKana);

        // puts that stage to level
        level.push(stage)
    }
    return level;
}

// Global store function -  Meant to return state object of our game
export const useGameStore = create(
    subscribeWithSelector((set, get) => ({
        level: null,
        currentStage: 0,
        currentKana: null,
        lastWrongKana: null,
        mode: 'hiragana',
        gameState: gameStates.MENU,
        // extra
        wrongAnswers: 0,
        streak: 0,
        topStreak: 0,
        timeStamp: null,
        endTimeStamp: null,
        latestAttestation: null,
        startGame: ({ mode }) => {
            // generates game level and gets correct kana
            const level = generateGameLevel({ nbStages: 5 });
            const currentKana = level[0].find((kana) => kana.correct);
            playAudio("start", () => {
                playAudio(`kanas/${currentKana.name}`);
            });
            set({
                level, currentStage: 0,
                currentKana, gameState: gameStates.GAME,
                mode, streak: 0, topStreak: 0,
                wrongAnswers: 0, timeStamp: new Date(),
            })
        },
        nextStage: () => {
            // increases stage number and selects the  correct kana for the new stage
            set((state) => {
                if (state.currentStage + 1 === state.level.length) {
                    // Run Code to sign Attestation if wrongAnswers == 0 prepare completionDate: endTimeStamp - timeStamp ,gameMode: mode,gameVersion:gameVersion1
                    playAudio("congratulations");
                    return {
                        currentStage: 0,
                        currentKana: null,
                        level: null,
                        gameState: gameStates.GAME_OVER,
                        lastWrongKana: null,
                        endTimeStamp: new Date()
                    };
                }
                const currentStage = state.currentStage + 1;
                const currentKana = state.level[currentStage].find(
                    (kana) => kana.correct
                );
                // extra
                const streak = state.streak + 1;
                const topStreak = state.topStreak > streak ? state.topStreak : streak;

                playAudio("good");
                playAudio(`correct${currentStage % 3}`, () => {
                    playAudio(`kanas/${currentKana.name}`);
                });

                return { currentStage, currentKana, streak, topStreak, lastWrongKana: null, }
            })
        },
        goToMenu: () => {
            set({
                gameState: gameStates.MENU,
            });
        },
        goToShow: () => {
            set({
                gameState: gameStates.SHOW,
            });
        },
        kanaTouched: (kana) => {
            const currentKana = get().currentKana;
            if (currentKana.name === kana.name) {
                get().nextStage()
            } else {
                playAudio("wrong");
                playAudio(`kanas/${kana.name}`, () => {
                    playAudio("fail");
                });

                set((state) => ({
                    wrongAnswers: state.wrongAnswers + 1,
                    lastWrongKana: kana,
                    streak: 0,
                }));
            }
        },
        setAttestationUID: (uid) => {
            set({
                latestAttestation: uid,
            });
        },
        // CHARACTER CONTROLLER
        characterState: "Idle",
        setCharacterState: (characterState) =>
            set({
                characterState,
            })
    })

    ))