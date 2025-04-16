import { SMath } from 'smath';
import { Datum, Point, PsychartOptions } from './types';
const Psychrolib = require('psychrolib');

/**
 * Represents a single air condition using several states.
 */
export class PsyState {
    /**
     * Dry Bulb
     */
    public readonly db: number;
    /**
     * Relative Humidity
     */
    public readonly rh: number;
    /**
     * Wet Bulb
     */
    public readonly wb: number;
    /**
     * Dew Point
     */
    public readonly dp: number;
    /**
     * Humidity Ratio
     */
    public readonly hr: number;
    /**
     * Vapor Pressure
     */
    public readonly vp: number;
    /**
     * Moist Air Enthalpy
     */
    public readonly h: number;
    /**
     * Moist Air Volume
     */
    public readonly v: number;
    /**
     * Degree of Saturation
     */
    public readonly s: number;
    /**
     * Standard Atmospheric Air Pressure
     */
    private static atm: number;
    /**
     * Minimum Dry Bulb
     */
    private static dbMin: number;
    /**
     * Maximum Dry Bulb
     */
    private static dbMax: number;
    /**
     * Maximum Humidity Ratio
     */
    private static hrMax: number;
    /**
     * Psychart panel size
     */
    private static size: Point;
    /**
     * Psychart panel padding
     */
    private static padding: Point;
    /**
     * Render a Mollier diagram instead
     */
    private static flipXY: boolean;
    /**
     * Compute a first-time initialization of psychrolib.
     */
    public static initialize(options: PsychartOptions): void {
        PsyState.size = options.size;
        PsyState.padding = options.padding;
        PsyState.flipXY = options.flipXY;
        Psychrolib.SetUnitSystem(options.unitSystem === 'IP' ? Psychrolib.IP : Psychrolib.SI);
        PsyState.atm = Psychrolib.GetStandardAtmPressure(options.altitude);
        PsyState.dbMin = options.dbMin;
        PsyState.dbMax = options.dbMax;
        PsyState.hrMax = Psychrolib.GetHumRatioFromTDewPoint(options.dpMax, PsyState.atm);
    }
    /**
     * A static helper function to convert a humidity ratio into a dew point.
     */
    public static hr2dp(db: number, hr: number): number {
        return Psychrolib.GetTDewPointFromHumRatio(db, hr, PsyState.atm);
    }
    /**
     * Initialize a new psychrometric state.
     */
    constructor(public readonly state: Datum) {
        this.db = state.db;
        switch (state.measurement) {
            case ('dbrh'): {
                this.rh = state.other;
                [this.hr, this.wb, this.dp, this.vp, this.h, this.v, this.s] = Psychrolib.CalcPsychrometricsFromRelHum(state.db, state.other, PsyState.atm);
                break;
            }
            case ('dbwb'): {
                this.wb = state.other;
                [this.hr, this.dp, this.rh, this.vp, this.h, this.v, this.s] = Psychrolib.CalcPsychrometricsFromTWetBulb(state.db, state.other, PsyState.atm);
                break;
            }
            case ('dbdp'): {
                this.dp = state.other;
                [this.hr, this.wb, this.rh, this.vp, this.h, this.v, this.s] = Psychrolib.CalcPsychrometricsFromTDewPoint(state.db, state.other, PsyState.atm);
                break;
            }
            default: {
                throw new Error('Invalid measurement type ' + state.measurement + '.');
            }
        }
    }
    /**
     * Convert this psychrometric state to an X-Y coordinate on a psychrometric chart.
     */
    public toXY(): Point {
        if (PsyState.flipXY) {
            return {
                x: SMath.clamp(SMath.translate(this.hr, 0, PsyState.hrMax, PsyState.padding.x, PsyState.size.x - PsyState.padding.x), PsyState.padding.x, PsyState.size.x - PsyState.padding.x),
                y: SMath.clamp(SMath.translate(this.db, PsyState.dbMin, PsyState.dbMax, PsyState.size.y - PsyState.padding.y, PsyState.padding.y), PsyState.padding.y, PsyState.size.y - PsyState.padding.y)
            };
        } else {
            return {
                x: SMath.clamp(SMath.translate(this.db, PsyState.dbMin, PsyState.dbMax, PsyState.padding.x, PsyState.size.x - PsyState.padding.x), PsyState.padding.x, PsyState.size.x - PsyState.padding.x),
                y: SMath.clamp(SMath.translate(this.hr, 0, PsyState.hrMax, PsyState.size.y - PsyState.padding.y, PsyState.padding.y), PsyState.padding.y, PsyState.size.y - PsyState.padding.y)
            };
        }
    }
}