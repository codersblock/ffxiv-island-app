import { atom } from "recoil";
import { SpawnInfo } from "../logic/Creature";

export const creatureSpawnsLoadedAtom = atom({
    key: 'creatureSpawnsLoaded',
    default: false
})

export const creatureSpawnsAtom = atom({
    key: 'creatureSpawns',
    default: {} as {[key: string]: SpawnInfo[]}
})