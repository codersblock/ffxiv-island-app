import { DateTime } from 'luxon';
import { EORZEA_HOUR_IN_SECONDS } from './CreatureCalculator';
import { WeatherFinder, WeatherType } from './WeatherFinder'
export enum CreatureType {
    SMALL="Small",
    MEDIUM="Medium",
    LARGE="Large",
}

export interface Coordinates {
    x: number, 
    y: number,
}

export interface TimeSpan {
    startTimeHour: number,
    endTimeHour: number
}

export interface SpawnInfo {
    startTime: DateTime,
    endTime: DateTime,
    eorzeaStartHour: number,
    eorzeaEndHour: number,
    weather: WeatherType
}

export class Creature {
    public readonly name: string;
    public readonly type: CreatureType;
    public coordinates: Coordinates;
    public requiredWeather: WeatherType;
    public requiredTimeEorzea: TimeSpan;

    constructor(name: string, type: CreatureType, coordinates: Coordinates, requiredWeather: WeatherType, requiredTimeEorzea: TimeSpan) {
        this.name = name;
        this.type = type;
        this.coordinates = coordinates;
        this.requiredWeather = requiredWeather;
        this.requiredTimeEorzea = requiredTimeEorzea;
    }

    creatureWillSpawnInWeatherWindow(weatherCycleStartTime: DateTime, weather: WeatherType): SpawnInfo | undefined {
        const eorzeaWeatherStartHour = WeatherFinder.getEorzeaHour(weatherCycleStartTime)

        const allDaySpawn: boolean = this.requiredTimeEorzea.startTimeHour === 0 && this.requiredTimeEorzea.endTimeHour === 24

        if (
            allDaySpawn || 
            (eorzeaWeatherStartHour <= this.requiredTimeEorzea.startTimeHour &&
            (eorzeaWeatherStartHour + 8) > this.requiredTimeEorzea.startTimeHour)
        ) {
            if (this.requiredWeather === WeatherType.ANY || this.requiredWeather === weather) {
                const eorzeaStartHour = allDaySpawn ? eorzeaWeatherStartHour : this.requiredTimeEorzea.startTimeHour;
                const eorzeaEndHour = allDaySpawn ? eorzeaWeatherStartHour + 8 : (
                    (this.requiredWeather !== WeatherType.ANY && (eorzeaWeatherStartHour + 8 < this.requiredTimeEorzea.endTimeHour)) ?
                        eorzeaWeatherStartHour + 8 :
                        this.requiredTimeEorzea.endTimeHour
                )

                const spawnInfo = {
                    weather,
                    eorzeaStartHour,
                    eorzeaEndHour,
                    startTime: this.calculateEarthHour(weatherCycleStartTime, eorzeaWeatherStartHour, eorzeaStartHour),
                    endTime: this.calculateEarthHour(weatherCycleStartTime, eorzeaWeatherStartHour, eorzeaEndHour)
                }

                if (spawnInfo.endTime > DateTime.now()) {
                    return spawnInfo
                }
            }
        }

        return;
    }

    private calculateEarthHour(weatherCycleStartTime: DateTime, eorzeaWeatherStartHour: number, eorzeaHour: number): DateTime {
        const additionalEorzeaHours = eorzeaHour - eorzeaWeatherStartHour;
        return weatherCycleStartTime.plus({seconds: additionalEorzeaHours * EORZEA_HOUR_IN_SECONDS})
    }
}