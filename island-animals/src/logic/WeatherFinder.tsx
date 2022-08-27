import { DateTime } from "luxon";
import { EORZEA_DAY_IN_SECONDS, EORZEA_HOUR_IN_SECONDS } from "./CreatureCalculator";

export enum WeatherType {
    CLEAR_SKIES="Clear Skies",
    FAIR_SKIES="Fair Skies",
    CLOUDS="Clouds",
    RAIN="Rain",
    FOG="Fog",
    SHOWERS="Showers",
    ANY="Any"
}

export class WeatherFinder {
    
    static getWeather(epochTimeInMillis: number): WeatherType {

        const epochTimeInSeconds = epochTimeInMillis / 1000;

        //number of elapsed eorzea hours since epoch
        const elapsedEorzeaHours = epochTimeInSeconds / EORZEA_HOUR_IN_SECONDS;

        //number of elapsed eorzea days since epoch
        const elapsedEorzeaDays = epochTimeInSeconds / EORZEA_DAY_IN_SECONDS;

        // Thanks to Rogueadyn's SaintCoinach library for these calculations.
        const increment = (elapsedEorzeaHours + 8 - (elapsedEorzeaHours % 8)) % 24
        const totalDaysUint = (elapsedEorzeaDays << 32) >>> 0;
        const calcBase = totalDaysUint * 100 + increment;
        const calcStep1 = ((calcBase << 11) ^ calcBase) >>> 0;
        const calcStep2 = ((calcStep1 >>> 8) ^ calcStep1) >>> 0;
        const weatherChance = calcStep2 % 100

        return this.convertWeatherChanceToWeatherType(weatherChance);
    }

    private static convertWeatherChanceToWeatherType(weatherChance: number): WeatherType {
        if (weatherChance < 25) {
            return WeatherType.CLEAR_SKIES
        } else if (weatherChance < 70) {
            return WeatherType.FAIR_SKIES
        } else if (weatherChance < 80) {
            return WeatherType.CLOUDS
        } else if (weatherChance < 90) {
            return WeatherType.RAIN
        } else if (weatherChance < 95) {
            return WeatherType.FOG
        } else {
            return WeatherType.SHOWERS
        }
    }

    static getCurrentWeatherStartTime(): DateTime {
        const secondsSinceEpoch = DateTime.now().toMillis() / 1000;
        const currentEorzeaHour = (secondsSinceEpoch / EORZEA_HOUR_IN_SECONDS) % 24;
        const weatherCycleStart = currentEorzeaHour - (currentEorzeaHour % 8);
        return DateTime.fromMillis((secondsSinceEpoch - (EORZEA_HOUR_IN_SECONDS * (currentEorzeaHour - weatherCycleStart))) * 1000)
    }

    static getEorzeaHour(dateTime: DateTime): number {
        const secondsSinceEpoch = dateTime.toMillis() / 1000;
        return (secondsSinceEpoch / EORZEA_HOUR_IN_SECONDS) % 24;
    }
}