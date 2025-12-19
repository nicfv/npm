import * as SMath from 'smath';
import { Options, Point, State } from './types';
import * as Psychrolib from 'psychrolib';

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
    private readonly atm: number;
    /**
     * Maximum Humidity Ratio
     */
    private readonly hrMax: number;
    /**
     * Initialize a new psychrometric state.
     */
    constructor(public readonly state: State, private readonly options: Options) {
        Psychrolib.SetUnitSystem(options.unitSystem === 'IP' ? Psychrolib.IP : Psychrolib.SI);
        this.atm = Psychrolib.GetStandardAtmPressure(options.altitude);
        this.hrMax = Psychrolib.GetHumRatioFromTDewPoint(options.dpMax, this.atm);
        this.db = state.db;
        switch (state.measurement) {
            case ('dbrh'): {
                this.rh = state.other;
                [this.hr, this.wb, this.dp, this.vp, this.h, this.v, this.s] = Psychrolib.CalcPsychrometricsFromRelHum(state.db, state.other, this.atm);
                break;
            }
            case ('dbwb'): {
                this.wb = state.other;
                [this.hr, this.dp, this.rh, this.vp, this.h, this.v, this.s] = Psychrolib.CalcPsychrometricsFromTWetBulb(state.db, state.other, this.atm);
                break;
            }
            case ('dbdp'): {
                this.dp = state.other;
                [this.hr, this.wb, this.rh, this.vp, this.h, this.v, this.s] = Psychrolib.CalcPsychrometricsFromTDewPoint(state.db, state.other, this.atm);
                break;
            }
            case ('dbhr'): {
                this.dp = Psychrolib.GetTDewPointFromHumRatio(state.db, state.other, this.atm);
                [this.hr, this.wb, this.rh, this.vp, this.h, this.v, this.s] = Psychrolib.CalcPsychrometricsFromTDewPoint(state.db, this.dp, this.atm);
                if (!SMath.approx(this.hr, state.other) && SMath.error(this.hr, state.other) > 0.01) {
                    throw new Error('Error in psychrolib computation. Expected: ' + state.other + ', Found: ' + this.hr);
                }
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
        // Determine if additional padding is needed to show axis names
        const fontPad: number = this.options.showAxisNames ? (1.5 * this.options.font.size) : 0;
        // The lower-left location
        const origin: Point = {
            x: this.options.padding.x + (this.options.flipXY ? fontPad : 0),
            y: this.options.padding.y + (this.options.flipXY ? fontPad : 0),
        };
        // The upper-right location
        const bound: Point = {
            x: this.options.size.x - this.options.padding.x - (this.options.flipXY ? 0 : fontPad),
            y: this.options.size.y - this.options.padding.y - (this.options.flipXY ? 0 : fontPad),
        };
        if (this.options.flipXY) {
            return {
                x: SMath.clamp(SMath.translate(this.hr, 0, this.hrMax, origin.x, bound.x), origin.x, bound.x),
                y: SMath.clamp(SMath.translate(this.db, this.options.dbMin, this.options.dbMax, bound.y, origin.y), origin.y, bound.y)
            };
        } else {
            return {
                x: SMath.clamp(SMath.translate(this.db, this.options.dbMin, this.options.dbMax, origin.x, bound.x), origin.x, bound.x),
                y: SMath.clamp(SMath.translate(this.hr, 0, this.hrMax, bound.y, origin.y), origin.y, bound.y)
            };
        }
    }
}