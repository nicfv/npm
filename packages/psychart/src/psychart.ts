import { Color, Palette, PaletteName } from 'viridis';
import { PsyState } from './psystate';
import { SMath } from 'smath';
import { PsychartOptions, Datum, Point, Region, RegionName, DataOptions } from './types';
import { deepCopy, defaultDataOptions, defaultPsychartOptions, setDefaults } from './defaults';

const NS = 'http://www.w3.org/2000/svg';

/**
 * Generates an interactive psychrometric chart with plotting capabilities.
 */
export class Psychart {
    /**
     * Psychart full configuration.
     */
    private readonly config: PsychartOptions;
    /**
     * Defines the string representations of the current unit system.
     */
    private readonly units = {
        temp: '',
        hr: '',
        vp: '',
        h: '',
        v: '',
    };
    /**
     * Defines a scaling factor for humidity ratio.
     */
    private readonly scaleFactor: {
        readonly hr: number;
        readonly h: number;
    };
    /**
     * Defines the base element to attach to the viewing window.
     */
    private readonly base: SVGElement = document.createElementNS(NS, 'svg');
    /**
     * Defines all the groups in the SVG ordered by layer.
     */
    private readonly g = {
        regions: document.createElementNS(NS, 'g'),
        axes: document.createElementNS(NS, 'g'),
        text: document.createElementNS(NS, 'g'),
        trends: document.createElementNS(NS, 'g'),
        points: document.createElementNS(NS, 'g'),
        tooltips: document.createElementNS(NS, 'g'),
    };
    /**
     * Predefined regions source: 2021 Equipment Thermal Guidelines for Data Processing Environments
     * ASHRAE-55 source: https://comfort.cbe.berkeley.edu/
     */
    private static readonly regions: { [K in RegionName]: Region } = {
        'Summer (sitting)': {
            tooltip: 'ASHRAE-55 (Human comfort)\nAir speed = 0.1 m/s\nMET = 1.0 (seated)\nCLO = 0.5 (summer clothing)',
            data: [
                { db: 32.8, other: 0, measurement: 'dbrh' },
                { db: 27.2, other: 1, measurement: 'dbrh' },
                { db: 22.7, other: 1, measurement: 'dbrh' },
                { db: 26.9, other: 0, measurement: 'dbrh' },
            ],
        },
        'Summer (walking)': {
            tooltip: 'ASHRAE-55 (Human comfort)\nAir speed = 0.1 m/s\nMET = 1.5 (walking)\nCLO = 0.5 (summer clothing)',
            data: [
                { db: 31.2, other: 0, measurement: 'dbrh' },
                { db: 25.8, other: 1, measurement: 'dbrh' },
                { db: 20.3, other: 1, measurement: 'dbrh' },
                { db: 23.2, other: 0, measurement: 'dbrh' },
            ],
        },
        'Summer (light work)': {
            tooltip: 'ASHRAE-55 (Human comfort)\nAir speed = 0.1 m/s\nMET = 2.0 (light work)\nCLO = 0.5 (summer clothing)',
            data: [
                { db: 30.4, other: 0, measurement: 'dbrh' },
                { db: 24.8, other: 1, measurement: 'dbrh' },
                { db: 19.2, other: 1, measurement: 'dbrh' },
                { db: 22.0, other: 0, measurement: 'dbrh' },
            ],
        },
        'Winter (sitting)': {
            tooltip: 'ASHRAE-55 (Human comfort)\nAir speed = 0.1 m/s\nMET = 1.0 (seated)\nCLO = 1.0 (winter clothing)',
            data: [
                { db: 28.6, other: 0, measurement: 'dbrh' },
                { db: 22.7, other: 1, measurement: 'dbrh' },
                { db: 17.1, other: 1, measurement: 'dbrh' },
                { db: 20.5, other: 0, measurement: 'dbrh' },
            ],
        },
        'Winter (walking)': {
            tooltip: 'ASHRAE-55 (Human comfort)\nAir speed = 0.1 m/s\nMET = 1.5 (walking)\nCLO = 1.0 (winter clothing)',
            data: [
                { db: 26.8, other: 0, measurement: 'dbrh' },
                { db: 21.5, other: 1, measurement: 'dbrh' },
                { db: 14.5, other: 1, measurement: 'dbrh' },
                { db: 17.2, other: 0, measurement: 'dbrh' },
            ],
        },
        'Winter (light work)': {
            tooltip: 'ASHRAE-55 (Human comfort)\nAir speed = 0.1 m/s\nMET = 2.0 (light work)\nCLO = 1.0 (winter clothing)',
            data: [
                { db: 25.6, other: 0, measurement: 'dbrh' },
                { db: 20.4, other: 1, measurement: 'dbrh' },
                { db: 13.1, other: 1, measurement: 'dbrh' },
                { db: 15.5, other: 0, measurement: 'dbrh' },
            ],
        },
        'Givoni Comfort Zone': {
            tooltip: 'Comfort Zone of the Building Bioclimatic Chart\n(based on Milne and Givoni 1979 & ASHRAE 55-2017)',
            data: [
                { db: 19, other: 0.20, measurement: 'dbrh' },
                { db: 26, other: 0.20, measurement: 'dbrh' },
                { db: 26, other: 0.50, measurement: 'dbrh' },
                { db: 24, other: 0.80, measurement: 'dbrh' },
                { db: 19, other: 0.80, measurement: 'dbrh' },
            ],
        },
        'Data Center A4': {
            tooltip: 'The A4 ASHRAE data center\ncomfort zone. Typically\nan IT space with low\nenvironmental requirements.',
            data: [
                { db: 5, other: -12, measurement: 'dbdp' },
                { db: 22.5, other: 0.08, measurement: 'dbrh' },
                { db: 45.0, other: 0.08, measurement: 'dbrh' },
                { db: 45.0, other: 24, measurement: 'dbdp' },
                { db: 25.8, other: 0.90, measurement: 'dbrh' },
                { db: 5, other: 0.90, measurement: 'dbrh' },
            ],
        },
        'Data Center A3': {
            tooltip: 'The A3 ASHRAE data center\ncomfort zone. Typically\nan IT space with normal\nenvironmental requirements.',
            data: [
                { db: 5, other: -12, measurement: 'dbdp' },
                { db: 22.5, other: 0.08, measurement: 'dbrh' },
                { db: 40.0, other: 0.08, measurement: 'dbrh' },
                { db: 40.0, other: 24, measurement: 'dbdp' },
                { db: 26.7, other: 0.85, measurement: 'dbrh' },
                { db: 5, other: 0.85, measurement: 'dbrh' },
            ],
        },
        'Data Center A2': {
            tooltip: 'The A2 ASHRAE data center\ncomfort zone. Typically\nan IT space with strict\nenvironmental requirements.',
            data: [
                { db: 10.0, other: -12, measurement: 'dbdp' },
                { db: 22.5, other: 0.08, measurement: 'dbrh' },
                { db: 35.0, other: 0.08, measurement: 'dbrh' },
                { db: 35.0, other: 21, measurement: 'dbdp' },
                { db: 24.7, other: 0.80, measurement: 'dbrh' },
                { db: 10.0, other: 0.80, measurement: 'dbrh' },
            ],
        },
        'Data Center A1': {
            tooltip: 'The A1 ASHRAE data\ncenter comfort zone.\nTypically a data center with\nmission-critical operations.',
            data: [
                { db: 15.0, other: -12, measurement: 'dbdp' },
                { db: 22.5, other: 0.08, measurement: 'dbrh' },
                { db: 32.0, other: 0.08, measurement: 'dbrh' },
                { db: 32.0, other: 17, measurement: 'dbdp' },
                { db: 20.6, other: 0.80, measurement: 'dbrh' },
                { db: 15.0, other: 0.80, measurement: 'dbrh' },
            ],
        },
        'Data Center Recommended (low pollutants)': {
            tooltip: 'The "recommended" ASHRAE\ncomfort zone for data centers\nwith conditions with low\nconcentration of pollutants.',
            data: [
                { db: 18.0, other: -9, measurement: 'dbdp' },
                { db: 27.0, other: -9, measurement: 'dbdp' },
                { db: 27.0, other: 15, measurement: 'dbdp' },
                { db: 20.7, other: 0.70, measurement: 'dbrh' },
                { db: 18.0, other: 0.70, measurement: 'dbrh' },
            ],
        },
        'Data Center Recommended (high pollutants)': {
            tooltip: 'The "recommended" ASHRAE\ncomfort zone for data centers\nwith conditions with high\nconcentration of pollutants.',
            data: [
                { db: 18.0, other: -9, measurement: 'dbdp' },
                { db: 27.0, other: -9, measurement: 'dbdp' },
                { db: 27.0, other: 15, measurement: 'dbdp' },
                { db: 26.2, other: 0.50, measurement: 'dbrh' },
                { db: 18.0, other: 0.50, measurement: 'dbrh' },
            ],
        },
        'IBM TS4500 Ambient (cooling)': {
            tooltip: 'The required ambient conditions\nfor the IBM TS4500 tape storage\nunit with integrated cooling.',
            data: [
                { db: 15, other: 0.20, measurement: 'dbrh' },
                { db: 35, other: 0.20, measurement: 'dbrh' },
                { db: 35, other: 0.80, measurement: 'dbrh' },
                { db: 15, other: 0.80, measurement: 'dbrh' },
            ],
        },
        'IBM TS4500 Ambient (no cooling)': {
            tooltip: 'The required ambient conditions\nfor the IBM TS4500 tape storage\nunit without integrated cooling.',
            data: [
                { db: 15, other: 0.20, measurement: 'dbrh' },
                { db: 32, other: 0.20, measurement: 'dbrh' },
                { db: 32, other: 26, measurement: 'dbwb' },
                { db: 28.8, other: 0.80, measurement: 'dbrh' },
                { db: 15, other: 0.80, measurement: 'dbrh' },
            ],
        },
        'IBM TS4500 Recommended': {
            tooltip: 'The recommended ambient conditions\nfor the IBM TS4500 tape storage\nunit for optimal reliability and efficiency.',
            data: [
                { db: 16, other: 0.20, measurement: 'dbrh' },
                { db: 25, other: 0.20, measurement: 'dbrh' },
                { db: 25, other: 0.50, measurement: 'dbrh' },
                { db: 16, other: 0.50, measurement: 'dbrh' },
            ],
        },
    };
    /**
     * The last states plotted on Psychart for each series.
     */
    private lastState: { [legend: string]: PsyState } = {};
    /**
     * Return an array of region names and their corresponding tooltips.
     */
    public static getRegionNamesAndTips(): Array<[RegionName, string]> {
        return Object.entries(this.regions).map(([name, region]) => [name as RegionName, region.tooltip]);
    }
    /**
     * Generate an SVG element to use as this gradient's icon.
     * Returns the outer HTML string to be saved in a file.
     */
    public static generateGradientIcon(gradient: PaletteName): string {
        const maxColorIndex: number = Palette[gradient].colors.length - 1;
        return '<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">' +
            Palette[gradient].colors.map((color, i) => '<stop style="stop-color:' + color.toString() + '" offset="' + SMath.normalize(i, 0, maxColorIndex) + '" />').join('') +
            '</linearGradient></defs><rect style="fill:url(#grad);stroke:none" width="10" height="10" x="0" y="0" rx="2" ry="2" /></svg>';
    }
    /**
     * Convert from Celsius to Fahrenheit.
     */
    private static CtoF(C: number): number {
        return SMath.translate(C, 0, 100, 32, 212);
    }
    /**
     * Get a range of numbers used for an axis.
     */
    private static getRange(min: number, max: number, step: number): number[] {
        const stepMin: number = SMath.round2(min + step * 0.49, step),
            stepMax: number = SMath.round2(max - step * 0.49, step),
            range: number[] = [];
        for (let i = stepMin; i <= stepMax; i += step) {
            range.push(i);
        }
        return range;
    }
    /**
     * Construct a new instance of `Psychart` given various configuration properties.
     */
    constructor(options: Partial<PsychartOptions> = {}) {
        this.config = setDefaults(options, defaultPsychartOptions);
        // Compute a first-time initialization of psychrolib
        PsyState.initialize(this.config);
        // Check to make sure that dpMax is less than dbMax
        if (this.config.dpMax > this.config.dbMax) {
            throw new Error('Dew point maximum is greater than dry bulb range!');
        }
        // Set the chart's viewport size.
        this.base.setAttribute('viewBox', '0 0 ' + this.config.size.x + ' ' + this.config.size.y);
        this.base.setAttribute('width', this.config.size.x + 'px');
        this.base.setAttribute('height', this.config.size.y + 'px');
        // Sets the displayed units based on the unit system.
        this.units.temp = '\u00B0' + (this.config.unitSystem === 'IP' ? 'F' : 'C');
        this.units.hr = (this.config.unitSystem === 'IP' ? 'lbw/klba' : 'gw/kga');
        this.units.vp = (this.config.unitSystem === 'IP' ? 'Psi' : 'Pa');
        this.units.h = (this.config.unitSystem === 'IP' ? 'Btu/lb' : 'kJ/kg');
        this.units.v = (this.config.unitSystem === 'IP' ? 'ft\u00B3/lb' : 'm\u00B3/kg');
        // Set the scaling factors for different unit systems.
        this.scaleFactor = {
            hr: (this.config.unitSystem === 'IP' ? 1e3 : 1e3),
            h: (this.config.unitSystem === 'IP' ? 1 : 1e-3),
        };
        // Create new SVG groups, and append all the
        // layers into the chart.
        Object.values(this.g).forEach(group => this.base.appendChild(group));
        // Draw constant dry bulb vertical lines.
        Psychart.getRange(this.config.dbMin, this.config.dbMax, this.config.major.temp).forEach(db => {
            const data: PsyState[] = [];
            // The lower point is on the X-axis (rh = 0%)
            data.push(new PsyState({ db: db, other: 0, measurement: 'dbrh' }));
            // The upper point is on the saturation line (rh = 100%)
            data.push(new PsyState({ db: db, other: 1, measurement: 'dbrh' }));
            // Draw the axis and the label
            this.drawAxis(data);
            this.drawLabel(db + (this.config.showUnits.axis ? this.units.temp : ''), data[0], this.config.flipXY ? TextAnchor.E : TextAnchor.N, 'Dry Bulb' + (this.config.showUnits.tooltip ? ' [' + this.units.temp + ']' : ''));
        });
        // Draw min and max dry bulb vertical axes.
        this.drawAxis([
            new PsyState({ db: this.config.dbMin, other: 0, measurement: 'dbrh' }),
            new PsyState({ db: this.config.dbMin, other: 1, measurement: 'dbrh' }),
        ]);
        this.drawAxis([
            new PsyState({ db: this.config.dbMax, other: 0, measurement: 'dbrh' }),
            new PsyState({ db: this.config.dbMax, other: 1, measurement: 'dbrh' }),
        ]);
        // Draw min and max dew point horizontal axes.
        this.drawAxis([
            new PsyState({ db: this.config.dbMin, other: 0, measurement: 'dbrh' }),
            new PsyState({ db: this.config.dbMax, other: 0, measurement: 'dbrh' }),
        ]);
        this.drawAxis([
            new PsyState({ db: this.config.dpMax, other: this.config.dpMax, measurement: 'dbdp' }),
            new PsyState({ db: this.config.dbMax, other: this.config.dpMax, measurement: 'dbdp' }),
        ]);
        switch (this.config.yAxis) {
            case ('dp'): {
                // Draw constant dew point horizontal lines.
                Psychart.getRange(0, this.config.dpMax, this.config.major.temp).forEach(dp => {
                    const data: PsyState[] = [];
                    // The left point is on the saturation line (db = dp)
                    data.push(new PsyState({ db: dp, other: dp, measurement: 'dbdp' }));
                    // The right point is at the maximum dry bulb temperature
                    data.push(new PsyState({ db: this.config.dbMax, other: dp, measurement: 'dbdp' }));
                    // Draw the axis and the label
                    this.drawAxis(data);
                    this.drawLabel(dp + (this.config.showUnits.axis ? this.units.temp : ''), data[1], this.config.flipXY ? TextAnchor.S : TextAnchor.W, 'Dew Point' + (this.config.showUnits.tooltip ? ' [' + this.units.temp + ']' : ''));
                });
                break;
            }
            case ('hr'): {
                // Draw constant humidity ratio horizontal lines.
                const maxHr: number = new PsyState({ db: this.config.dbMax, measurement: 'dbdp', other: this.config.dpMax }).hr,
                    step: number = this.config.major.humRat / this.scaleFactor.hr;
                Psychart.getRange(0, maxHr, step).forEach(hr => {
                    const data: PsyState[] = [],
                        dp: number = PsyState.hr2dp(this.config.dbMax, hr);
                    // The left point is on the saturation line
                    data.push(new PsyState({ db: dp, other: dp, measurement: 'dbdp' }));
                    // The right point is at the maximum dry bulb temperature
                    data.push(new PsyState({ db: this.config.dbMax, other: dp, measurement: 'dbdp' }));
                    // Draw the axis and the label
                    this.drawAxis(data);
                    this.drawLabel(Math.round(hr * this.scaleFactor.hr) + (this.config.showUnits.axis ? this.units.hr : ''), data[1], this.config.flipXY ? TextAnchor.S : TextAnchor.W, 'Humidity Ratio' + (this.config.showUnits.tooltip ? ' [' + this.units.hr + ']' : ''));
                });
                break;
            }
            default: {
                throw new Error('Invalid y-axis type: ' + this.config.yAxis);
            }
        }
        // Draw constant wet bulb diagonal lines.
        Psychart.getRange(this.config.dbMin, this.config.dpMax, this.config.major.temp).forEach(wb => {
            const data: PsyState[] = [];
            // Dry bulb is always equal or greater than wet bulb.
            for (let db = wb; db <= this.config.dbMax; db += this.config.resolution) {
                data.push(new PsyState({ db: db, other: wb, measurement: 'dbwb' }));
            }
            // Draw the axis and the label
            this.drawAxis(data);
            this.drawLabel(wb + (this.config.showUnits.axis ? this.units.temp : ''), data[0], this.config.flipXY ? TextAnchor.NW : TextAnchor.SE, 'Wet Bulb' + (this.config.showUnits.tooltip ? ' [' + this.units.temp + ']' : ''));
        });
        // Draw constant relative humidity lines.
        Psychart.getRange(0, 100, this.config.major.relHum).forEach(rh => {
            const data: PsyState[] = [];
            let preferredAnchor: TextAnchor = TextAnchor.NE;
            // Must iterate through all dry bulb temperatures to calculate each Y-coordinate
            for (let db = this.config.dbMin; db <= this.config.dbMax; db += this.config.resolution) {
                data.push(new PsyState({ db: db, other: rh / 100, measurement: 'dbrh' }));
                // Stop drawing when the line surpasses the bounds of the chart
                if (data[data.length - 1].dp >= this.config.dpMax) {
                    preferredAnchor = this.config.flipXY ? TextAnchor.W : TextAnchor.S;
                    break;
                }
            }
            // Draw the axis and the label
            this.drawAxis(data);
            if (rh > 0 && rh < 100) {
                this.drawLabel(rh + (this.config.showUnits.axis ? '%' : ''), data[data.length - 1], preferredAnchor, 'Relative Humidity' + (this.config.showUnits.tooltip ? ' [%]' : ''));
            }
        });
        // Draw any regions, if applicable
        let regionIndex = 0;
        Object.entries(Psychart.regions)
            .filter(([name,]) => this.config.regions?.includes(name as RegionName))
            .forEach(([, region]) => {
                // Force region gradient to remain within subrange of full span to improve visual impact in light/dark themes
                const minRegion = 0 + -1, // -1 (arbitrary) Affects minimum span of region
                    maxRegion = this.config.regions.length - 1 + 4, // +4 (arbitrary) Affects maximum span of region
                    minSpan = (this.config.theme === 'dark') ? maxRegion : minRegion,
                    maxSpan = (this.config.theme === 'dark') ? minRegion : maxRegion,
                    data = deepCopy(region.data);
                if (this.config.unitSystem === 'IP') {
                    // Convert from SI to US units
                    data.forEach(datum => {
                        datum.db = Psychart.CtoF(datum.db);
                        if (datum.measurement === 'dbdp' || datum.measurement === 'dbwb') {
                            datum.other = Psychart.CtoF(datum.other);
                        }
                    });
                }
                this.drawRegion(data, Palette[this.config.colors[this.config.theme].regionGradient].getColor(regionIndex, minSpan, maxSpan), region.tooltip);
                regionIndex++;
            });
    }
    /**
     * Generate SVG path data from an array of psychrometric states.
     */
    private setPathData(path: SVGPathElement, psystates: PsyState[], closePath: boolean): void {
        path.setAttribute('d', 'M ' + psystates.map(psy => {
            const xy = psy.toXY();
            return xy.x + ',' + xy.y;
        }).join(' ') + (closePath ? ' z' : ''));
    }
    /**
     * Draw an axis line given an array of psychrometric states.
     */
    private drawAxis(data: PsyState[]): void {
        this.g.axes.appendChild(this.createLine(data, this.config.colors[this.config.theme].axis, 1.0));
    }
    /**
     * Create a line to append onto a parent element.
     */
    private createLine(data: PsyState[], color: Color, weight: number): SVGPathElement {
        const line = document.createElementNS(NS, 'path');
        line.setAttribute('fill', 'none');
        line.setAttribute('stroke', color.toString());
        line.setAttribute('stroke-width', weight + 'px');
        line.setAttribute('vector-effect', 'non-scaling-stroke');
        // Convert the array of psychrometric states into an array of (x,y) points.
        this.setPathData(line, data, false);
        return line;
    }
    /**
     * Draw an axis label.
     */
    private drawLabel(text: string, location: PsyState, anchor: TextAnchor, tooltip?: string): void {
        const fontColor: Color = this.config.colors[this.config.theme].font,
            label = this.createLabel(text, location.toXY(), fontColor, anchor);
        this.g.text.appendChild(label);
        if (tooltip) {
            label.addEventListener('mouseover', e => this.drawTooltip(tooltip, { x: e.offsetX, y: e.offsetY }, fontColor));
            label.addEventListener('mouseleave', () => this.clearChildren(this.g.tooltips));
        }
    }
    /**
     * Create a label to append onto a parent element.
     */
    private createLabel(text: string, location: Point, color: Color, anchor: TextAnchor): SVGTextElement {
        const label = document.createElementNS(NS, 'text');
        label.setAttribute('fill', color.toString());
        label.setAttribute('font-family', this.config.font.family);
        label.setAttribute('font-size', this.config.font.size + 'px');
        // Use the `x`, `y`, `text-anchor`, and `dominant-baseline` properties to set the text anchor
        switch (anchor) {
            case (TextAnchor.NW): {
                label.setAttribute('x', (location.x + this.config.font.size / 2).toString());
                label.setAttribute('y', (location.y + this.config.font.size / 2).toString());
                label.setAttribute('text-anchor', 'start');
                label.setAttribute('dominant-baseline', 'hanging');
                break;
            }
            case (TextAnchor.N): {
                label.setAttribute('x', location.x.toString());
                label.setAttribute('y', (location.y + this.config.font.size / 2).toString());
                label.setAttribute('text-anchor', 'middle');
                label.setAttribute('dominant-baseline', 'hanging');
                break;
            }
            case (TextAnchor.NE): {
                label.setAttribute('x', (location.x - this.config.font.size / 2).toString());
                label.setAttribute('y', (location.y + this.config.font.size / 2).toString());
                label.setAttribute('text-anchor', 'end');
                label.setAttribute('dominant-baseline', 'hanging');
                break;
            }
            case (TextAnchor.E): {
                label.setAttribute('x', (location.x - this.config.font.size / 2).toString());
                label.setAttribute('y', location.y.toString());
                label.setAttribute('text-anchor', 'end');
                label.setAttribute('dominant-baseline', 'middle');
                break;
            }
            case (TextAnchor.SE): {
                label.setAttribute('x', (location.x - this.config.font.size / 2).toString());
                label.setAttribute('y', (location.y - this.config.font.size / 2).toString());
                label.setAttribute('text-anchor', 'end');
                label.setAttribute('dominant-baseline', 'alphabetic');
                break;
            }
            case (TextAnchor.S): {
                label.setAttribute('x', location.x.toString());
                label.setAttribute('y', (location.y - this.config.font.size / 2).toString());
                label.setAttribute('text-anchor', 'middle');
                label.setAttribute('dominant-baseline', 'alphabetic');
                break;
            }
            case (TextAnchor.SW): {
                label.setAttribute('x', (location.x + this.config.font.size / 2).toString());
                label.setAttribute('y', (location.y - this.config.font.size / 2).toString());
                label.setAttribute('text-anchor', 'start');
                label.setAttribute('dominant-baseline', 'alphabetic');
                break;
            }
            case (TextAnchor.W): {
                label.setAttribute('x', (location.x + this.config.font.size / 2).toString());
                label.setAttribute('y', location.y.toString());
                label.setAttribute('text-anchor', 'start');
                label.setAttribute('dominant-baseline', 'middle');
                break;
            }
            case (TextAnchor.C): {
                label.setAttribute('x', location.x.toString());
                label.setAttribute('y', location.y.toString());
                label.setAttribute('text-anchor', 'middle');
                label.setAttribute('dominant-baseline', 'middle');
                break;
            }
            default: {
                throw new Error('Text anchor ' + anchor + ' is invalid.');
            }
        }
        label.textContent = text;
        return label;
    }
    /**
     * Create a tooltip element.
     */
    private drawTooltip(text: string, location: Point, color: Color): void {
        const tooltipBase = document.createElementNS(NS, 'g'),
            labelElements: SVGTextElement[] = [],
            padding = 10,
            background = document.createElementNS(NS, 'rect');
        // Generate an array of SVGTextElement containing each line of this tooltip
        text.split('\n').forEach((line, i) => labelElements.push(this.createLabel(line, { x: 0, y: i * this.config.font.size }, color.getContrastingColor(), TextAnchor.NW)));
        // Append the elements onto the window
        tooltipBase.appendChild(background);
        labelElements.forEach(element => tooltipBase.appendChild(element));
        this.g.tooltips.appendChild(tooltipBase);
        // Compute the maximum width of any line in this tooltip and height for the background
        const maxWidth = labelElements.map(element => element.getBBox().width).reduce((a, b) => Math.max(a, b)) + padding,
            maxHeight = labelElements.length * this.config.font.size + padding;
        // Define styling properties for the tooltip background
        background.setAttribute('stroke', color.getContrastingColor().toString());
        background.setAttribute('fill', color.toString());
        background.setAttribute('x', '0');
        background.setAttribute('y', '0');
        background.setAttribute('width', maxWidth + 'px');
        background.setAttribute('height', maxHeight + 'px');
        background.setAttribute('rx', (padding / 2) + 'px');
        background.setAttribute('stroke-width', '1px');
        // Adjust the position if out-of-bounds
        if (location.x + padding + maxWidth > this.config.size.x) {
            location.x -= (maxWidth + padding);
        } else {
            location.x += padding;
        }
        if (location.y + padding + maxHeight > this.config.size.y) {
            location.y -= (maxHeight + padding);
        } else {
            location.y += padding;
        }
        tooltipBase.setAttribute('transform', 'translate(' + location.x + ',' + location.y + ')');
    }
    /**
     * Remove all the children from an element.
     */
    private clearChildren(element: Element): void {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
    /**
     * Return an array of all allowed gradient names.
     */
    public getGradientNames(): PaletteName[] {
        return Object.keys(Palette).filter(name => name !== this.config.colors[this.config.theme].regionGradient) as PaletteName[];
    }
    /**
     * Plot one psychrometric state onto the psychrometric chart.
     */
    public plot(state: Datum, config: Partial<DataOptions> = {}): void {
        // Skip series that are missing a measurement point.
        if (!Number.isFinite(state.db) || !Number.isFinite(state.other)) {
            return;
        }
        // Set default data options.
        const options: DataOptions = setDefaults(config, defaultDataOptions);
        // Skip series that are disabled.
        if (options.enabled === false) {
            return;
        }
        // Determine whether this is time-dependent.
        const timeSeries: boolean = Number.isFinite(options.time.now) && Number.isFinite(options.time.end) && Number.isFinite(options.time.start);
        // Divide by 100 if relHumType is set to 'percent'
        if (state.measurement === 'dbrh' && options.relHumType === 'percent') {
            state.other /= 100;
        }
        const currentState = new PsyState(state),
            location = currentState.toXY();
        // Compute the current color to plot
        const tMin: number = (this.config.theme === 'dark') ? options.time.end : options.time.start,
            tMax: number = (this.config.theme === 'dark') ? options.time.start : options.time.end,
            tNow: number = options.time.now,
            color: Color = timeSeries ? Palette[options.gradient].getColor(tNow, tMin, tMax) : Color.from(options.color);
        // Determine whether to connect the states with a line
        if (options.legend && options.line && this.lastState[options.legend]) {
            this.g.trends.appendChild(this.createLine([this.lastState[options.legend], currentState], color, 1));
        }
        this.lastState[options.legend] = currentState;
        // Define a 0-length path element and assign its attributes.
        const point = document.createElementNS(NS, 'path');
        point.setAttribute('fill', 'none');
        point.setAttribute('stroke', color.toString());
        point.setAttribute('stroke-width', +options.pointRadius + 'px');
        point.setAttribute('stroke-linecap', 'round');
        point.setAttribute('vector-effect', 'non-scaling-stroke');
        point.setAttribute('d', 'M ' + location.x + ',' + location.y + ' h 0');
        this.g.points.appendChild(point);
        // Set up the point name to showe in the tooltip.
        const pointName: string = (options.legend && options.name ? options.legend + ': ' + options.name : options.legend + options.name);
        // Generate the text to display on mouse hover.
        const tooltipString: string = (pointName ? pointName + '\n' : '') +
            (timeSeries ? new Date(tNow).toLocaleString() + '\n' : '') +
            currentState.db.toFixed(1) + this.units.temp + ' Dry Bulb\n' +
            (currentState.rh * 100).toFixed() + '% Rel. Hum.\n' +
            currentState.wb.toFixed(1) + this.units.temp + ' Wet Bulb\n' +
            currentState.dp.toFixed(1) + this.units.temp + ' Dew Point' +
            (options.advanced ? '\n' +
                (currentState.hr * this.scaleFactor.hr).toFixed(2) + ' ' + this.units.hr + ' Hum. Ratio\n' +
                currentState.vp.toFixed(1) + ' ' + this.units.vp + ' Vap. Press.\n' +
                (currentState.h * this.scaleFactor.h).toFixed(1) + ' ' + this.units.h + ' Enthalpy\n' +
                currentState.v.toFixed(2) + ' ' + this.units.v + ' Volume' : '');
        // Set the behavior when the user interacts with this point
        point.addEventListener('mouseover', e => this.drawTooltip(tooltipString, { x: e.offsetX, y: e.offsetY }, color));
        point.addEventListener('mouseleave', () => this.clearChildren(this.g.tooltips));
    }
    /**
     * Draw a shaded region on Psychart.
     */
    public drawRegion(states: Datum[], color: Color, tooltip?: string): void {
        // Add the first state to the data set
        const data: PsyState[] = [new PsyState(states[0])];
        for (let i = 1; i < states.length; i++) {
            const lastDatum = states[i - 1],
                currentDatum = states[i];
            // Check if iso-relative humidity (curved line)
            if (lastDatum.measurement === 'dbrh' && currentDatum.measurement === 'dbrh' && SMath.approx(lastDatum.other, currentDatum.other)) {
                const range = Math.abs(currentDatum.db - lastDatum.db);
                // Calculate several psychrometric states with a dry bulb step of `resolution`
                for (let i = 0; i < range; i += this.config.resolution) {
                    const db = SMath.translate(i, 0, range, lastDatum.db, currentDatum.db);
                    data.push(new PsyState({ db: db, other: lastDatum.other, measurement: 'dbrh' }));
                }
            }
            // Assume iso-dry bulb, wet bulb, or dew point (straight line)
            data.push(new PsyState(currentDatum));
        }
        // Create the SVG element to render the shaded region
        const region = document.createElementNS(NS, 'path');
        region.setAttribute('fill', color.toString());
        this.setPathData(region, data, true);
        this.g.regions.appendChild(region);
        // Optionally render a tooltip on mouse hover
        if (!!tooltip) {
            region.addEventListener('mouseover', e => this.drawTooltip(tooltip, { x: e.offsetX, y: e.offsetY }, color));
            region.addEventListener('mouseleave', () => this.clearChildren(this.g.tooltips));
        }
    }
    /**
     * Clear all plotted data from Psychart.
     */
    public clearData(): void {
        this.lastState = {};
        this.clearChildren(this.g.points);
        this.clearChildren(this.g.trends);
    }
    /**
     * Clear all rendered regions from Psychart.
     */
    public clearRegions(): void {
        this.clearChildren(this.g.regions);
    }
    /**
     * Return the SVG element to append on the parent.
     */
    public getElement(): SVGElement {
        return this.base;
    }
}

/**
 * Represents where the origin is in relation to the text.
 */
const enum TextAnchor {
    NW, N, NE, E, SE, S, SW, W, C
}