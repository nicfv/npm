/**
 * Details about a chart axis.
 */
export interface Axis {
    /**
     * The units of this axis.
     */
    readonly unit: string;
    /**
     * The interval between ticks on this axis.
     */
    readonly step: number;
    /**
     * The maximum value shown this axis.
     */
    readonly max: number;
}

export interface PumpchartOptions {
    /**
     * The flow rate (x-axis)
     */
    readonly flow: Axis;
    /**
     * The head pressure (y-axis)
     */
    readonly head: Axis;
}