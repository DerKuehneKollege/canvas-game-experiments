export class Helpers {

    public static readonly FULL_CIRCLE = Math.PI * 2;

    public static map(
        value: number,
        istart: number,
        istop: number,
        ostart: number,
        ostop: number
    ): number {
        return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
    }

    /**
     * Random number between min and max (including both values)
     * @param min inclusive min value
     * @param max inclusive max value
     */
    public static randomIntBetween(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * Random number between min and max (including both values)
     * @param min inclusive min value
     * @param max inclusive max value
     */
    public static randomFloatBetween(min: number, max: number): number {
        return Math.random() * (max - min + 1) + min;
    }

}