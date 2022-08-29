import { DateTime } from "luxon";
import { WeatherFinder, WeatherType } from "./WeatherFinder";
import { Creature, CreatureType, SpawnInfo } from "./Creature"
import { useSetRecoilState } from "recoil";
import { creatureSpawnsLoadedAtom, creatureSpawnsAtom } from "../state/atoms"
import { useEffect } from "react";

export const EORZEA_DAY_IN_SECONDS = 4200
export const EORZEA_HOUR_IN_SECONDS = 175

interface Props {
    children?: React.ReactNode
}
const creatures = {
    "Glyptodon": new Creature(
        "Glyptodon",
        CreatureType.MEDIUM,
        { 
            x: 31, 
            y: 11 
        },
        WeatherType.ANY,
        { 
            startTimeHour: 0, 
            endTimeHour: 3
        }
    ),
    "Island Billy": new Creature(
        "Island Billy",
        CreatureType.LARGE,
        {
            x: 26,
            y: 22
        },
        WeatherType.ANY,
        {
            startTimeHour: 3,
            endTimeHour: 6
        }
    ),
    "Lemur": new Creature(
        "Lemur",
        CreatureType.SMALL,
        {
            x: 20,
            y: 26
        },
        WeatherType.ANY,
        {
            startTimeHour: 6,
            endTimeHour: 9
        }
    ),
    "Star Marmot": new Creature(
        "Star Marmot",
        CreatureType.SMALL,
        {
            x: 15,
            y: 19
        },
        WeatherType.ANY,
        {
            startTimeHour: 9,
            endTimeHour: 12
        }
    ),
    "Apkallu of Paradise": new Creature(
        "Apkallu of Paradise",
        CreatureType.SMALL,
        {
            x: 19,
            y: 11
        },
        WeatherType.ANY,
        {
            startTimeHour: 12,
            endTimeHour: 15
        }
    ),
    "Dodo of Paradise": new Creature(
        "Dodo of Paradise",
        CreatureType.MEDIUM,
        {
            x: 16,
            y: 12 
        },
        WeatherType.ANY,
        {
            startTimeHour: 15,
            endTimeHour: 18
        }
    ),
    "Island Stag": new Creature(
        "Island Stag",
        CreatureType.MEDIUM,
        {
            x: 20,
            y: 19 
        },
        WeatherType.ANY,
        {
            startTimeHour: 18,
            endTimeHour: 21 
        }
    ),
    "Beachcomb": new Creature(
        "Beachcomb",
        CreatureType.SMALL,
        {
            x: 18,
            y: 13
        },
        WeatherType.RAIN,
        {
            startTimeHour: 0,
            endTimeHour: 3
        }
    ),
    "Alligator": new Creature(
        "Alligator",
        CreatureType.LARGE,
        {
            x: 17,
            y: 27
        },
        WeatherType.SHOWERS,
        {
            startTimeHour: 6,
            endTimeHour: 9
        }
    ),
    "Goobue": new Creature(
        "Goobue",
        CreatureType.LARGE,
        {
            x: 33,
            y: 16
        },
        WeatherType.CLOUDS,
        {
            startTimeHour: 9,
            endTimeHour: 12
        }
    ),
    "Twinklefleece": new Creature(
        "Twinklefleece",
        CreatureType.SMALL,
        {
            x: 22,
            y: 21
        },
        WeatherType.FOG,
        {
            startTimeHour: 18,
            endTimeHour: 21
        }
    ),
    "Ornery Karakul": new Creature(
        "Ornery Karakul",
        CreatureType.SMALL,
        {
            x: 20,
            y: 23
        },
        WeatherType.FAIR_SKIES,
        {
            startTimeHour: 0,
            endTimeHour: 24
        }
    ),
    "Black Chocobo": new Creature(
        "Black Chocobo",
        CreatureType.LARGE,
        {
            x: 13,
            y: 11
        },
        WeatherType.CLEAR_SKIES,
        {
            startTimeHour: 0,
            endTimeHour: 24
        }
    ),
    "Gold Back": new Creature(
        "Gold Back",
        CreatureType.LARGE,
        {
            x: 31,
            y: 28
        },
        WeatherType.RAIN,
        {
            startTimeHour: 0,
            endTimeHour: 24
        }
    ),
    "Grand Buffalo": new Creature(
        "Grand Buffalo",
        CreatureType.LARGE,
        {
            x: 12,
            y: 17 
        },
        WeatherType.CLOUDS,
        {
            startTimeHour: 0,
            endTimeHour: 24
        }
    ),
    "Yellow Coblyn": new Creature(
        "Yellow Coblyn",
        CreatureType.SMALL,
        {
            x: 26,
            y: 19 
        },
        WeatherType.FOG,
        {
            startTimeHour: 0,
            endTimeHour: 24
        }
    ),
}

export function CreatureCalculator(props: Props) {
    const setCalculationComplete = useSetRecoilState(creatureSpawnsLoadedAtom);
    const setCreatureSpawns = useSetRecoilState(creatureSpawnsAtom);

    useEffect(() => {
        let creatureSpawns: {[key: string]: SpawnInfo[]} = {}
        for (const creature of Object.values(creatures)) {
            creatureSpawns = {
                ...creatureSpawns,
                [creature.name]: []
            }
        }

        let weatherStartTime: DateTime = WeatherFinder.getCurrentWeatherStartTime()

        //620 weather cycles is a little over 5 earth days
        let cycle = 0;
        while (cycle < 620) {
            const weather: WeatherType = WeatherFinder.getWeather(weatherStartTime.toMillis())
            for (const creature of Object.values(creatures)) {
                const creatureSpawn: SpawnInfo | undefined = creature.creatureWillSpawnInWeatherWindow(weatherStartTime, weather)
                if (creatureSpawn !== undefined) {
                    creatureSpawns = {
                        ...creatureSpawns,
                        [creature.name]: [...creatureSpawns[creature.name], creatureSpawn]
                    }
                }
            }
            weatherStartTime = weatherStartTime.plus({seconds: EORZEA_HOUR_IN_SECONDS * 8})
            ++cycle;
        }

        setCreatureSpawns(creatureSpawns)
        setCalculationComplete(true)
    }, [])

    return <> {props.children} </>
}