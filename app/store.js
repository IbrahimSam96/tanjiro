import { create } from "zustand";
import { kanas } from "../constants";

export const generateGameLevel = ({ nbStages }) => {
    // array of stages
    const level = [];
    for (let i = 0; i < nbStages; i++) {
        const stage = [];
        const nOptions = 3 + i;

        for (let j = 0; j < nOptions; j++) {
            // the kana
            let kana = null;
            // loop and find one not already in stage
            while (!kana || stage.includes(kana)) {

                kana = kanas[Math.floor(Math.random() * kanas.length)];
            }
            // Add it to stage
            stage.push(kana)
        }
        // Select a random kana to be the correct answer
        stage[Math.floor(Math.random() * stage.length)].correct = true;
        // pus that stage to level
        level.push(stage)
    }
    return level;

}

// Global store function -  Meant to return state object of our game
export const useGameStore = create((set) => ({
    level: null,
    currentStage: 0,
    currentKana: null,
    mode: 'hiragana',
    // extra
    score: 0,
    timeStamp: null,
    startGame: () => {
        // generates game level and gets correct kana
        const level = generateGameLevel({ nbStages: 5 });
        const currentKana = level[0].find((kana) => kana.correct);
        set({ level, currentStage: 0, currentKana })
    },
    nextStage: () => {
        // increases stage number and selects the  correct kana for the new stage
        set((state) => {
            const currentStage = state.currentStage + 1;
            const currentKana = state.level[currentStage].find(
                (kana) => kana.correct
                );
            // extra
            const score = state.score + 1;

            return { currentStage, currentKana, score }

        })
    }

}))