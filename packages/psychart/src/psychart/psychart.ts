import { Color, Palette, PaletteName } from 'viridis';
import { PsyState } from './psystate';
import * as SMath from 'smath';
import { DataOptions, Options, Region, State } from './types';
import { defaultDataOptions, defaultOptions, regions } from './defaults';
import { Chart } from '../chart';
import { TextAnchor } from '../types';

/**
 * Generates an interactive psychrometric chart with plotting capabilities.
 */
export class Psychart extends Chart<Options> {
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
     * Represents the legend for Psychart.
     */
    private readonly legend: SVGSVGElement = document.createElementNS(this.NS, 'svg');
    /**
     * Legend definitions, which contains linear gradients.
     */
    private readonly legendDefs: SVGDefsElement = document.createElementNS(this.NS, 'defs');
    /**
     * The base element for adding lines in the legend.
     */
    private readonly legendg: SVGGElement = document.createElementNS(this.NS, 'g');
    /**
     * Defines all the groups in the SVG ordered by layer.
     */
    private readonly g = {
        regions: document.createElementNS(this.NS, 'g'),
        axes: document.createElementNS(this.NS, 'g'),
        text: document.createElementNS(this.NS, 'g'),
        trends: document.createElementNS(this.NS, 'g'),
        hilites: document.createElementNS(this.NS, 'g'),
        points: document.createElementNS(this.NS, 'g'),
        tooltips: document.createElementNS(this.NS, 'g'),
    };
    /**
     * The data series plotted on Psychart with each of their last states and visibility toggles.
     */
    private series: Record<
        string, // Legend
        {
            lastState: PsyState,
            hidden: boolean,
            readonly pointGroup: SVGGElement,
            readonly lineGroup: SVGGElement,
        }
    > = {};
    /**
     * The serial number for identified points.
     */
    private pointId = 0;
    /**
     * Helper function to return an array of region names and their corresponding tooltips.
     */
    public static getRegionNamesAndTips(): [Region, string][] {
        return Object.entries(regions).map(([name, region]) => [name as Region, region.tooltip]);
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
        const padding = 0.9,
            stepMin: number = SMath.round2(min + step * padding, step),
            stepMax: number = SMath.round2(max - step * padding, step),
            range: number[] = [];
        for (let i = stepMin; i <= stepMax; i += step) {
            range.push(i);
        }
        return [min, ...range, max];
    }
    /**
     * Construct a new instance of `Psychart` given various configuration properties.
     */
    constructor(options: Partial<Options> = {}) {
        super(options, defaultOptions);
        // Check to make sure that dpMax is less than dbMax
        if (this.options.dpMax > this.options.dbMax) {
            throw new Error('Dew point maximum is greater than dry bulb range!');
        }
        // Set base styling.
        this.base.style.position = 'relative';
        // If set, generate the legend.
        if (typeof this.options.legend === 'object') {
            // Set the legend's viewport size.
            this.legend.setAttribute('viewBox', '0 0 ' + this.options.size.x + ' ' + this.getLegendHeight());
            this.legend.setAttribute('width', this.options.size.x + 'px');
            this.legend.setAttribute('height', this.getLegendHeight() + 'px');
            this.legend.appendChild(this.legendDefs);
            this.legend.appendChild(this.createLabel(this.options.legend.title, { x: 0, y: 0 }, Color.hex(this.options.colors.font), TextAnchor.NW, 0));
            this.legend.appendChild(this.legendg);
            // Attach elements to the base element.
            const legendContainer: HTMLDivElement = document.createElement('div');
            legendContainer.setAttribute('title', 'Click to toggle data series visibility.');
            legendContainer.style.position = 'absolute';
            legendContainer.style.left = (this.options.flipXY ? (this.options.size.x - this.options.legend.size.x - this.options.legend.margin.x) : this.options.legend.margin.x) + 'px';
            legendContainer.style.top = (this.options.flipXY ? (this.options.size.y - this.options.legend.size.y - this.options.legend.margin.y) : this.options.legend.margin.y) + 'px';
            legendContainer.style.width = this.options.legend.size.x + 'px';
            legendContainer.style.height = this.options.legend.size.y + 'px';
            legendContainer.style.overflowX = 'hidden';
            legendContainer.style.overflowY = 'auto';
            legendContainer.style.border = '1px solid ' + this.options.colors.axis;
            legendContainer.appendChild(this.legend);
            this.base.appendChild(legendContainer);
        }
        // Sets the displayed units based on the unit system.
        this.units.temp = '\u00B0' + (this.options.unitSystem === 'IP' ? 'F' : 'C');
        this.units.hr = (this.options.unitSystem === 'IP' ? 'lbw/klba' : 'gw/kga');
        this.units.vp = (this.options.unitSystem === 'IP' ? 'Psi' : 'Pa');
        this.units.h = (this.options.unitSystem === 'IP' ? 'Btu/lb' : 'kJ/kg');
        this.units.v = (this.options.unitSystem === 'IP' ? 'ft\u00B3/lb' : 'm\u00B3/kg');
        // Set the scaling factors for different unit systems.
        this.scaleFactor = {
            hr: (this.options.unitSystem === 'IP' ? 1e3 : 1e3),
            h: (this.options.unitSystem === 'IP' ? 1 : 1e-3),
        };
        // Append all the layers into the chart and clear highlights on click.
        Object.values(this.g).forEach(group => this.svg.appendChild(group));
        this.svg.addEventListener('click', () => Chart.clearChildren(this.g.hilites));
        // Write the axis titles.
        if (this.options.showAxisNames) {
            const fontColor: Color = Color.hex(this.options.colors.font);
            const yAxisText: string = (this.options.yAxis === 'hr') ? 'Humidity Ratio' : 'Dew Point';
            let xAxisLabel: SVGTextElement;
            let yAxisLabel: SVGTextElement;
            if (this.options.flipXY) {
                xAxisLabel = super.createLabel(yAxisText, { x: this.options.size.x / 2, y: 0 }, fontColor, TextAnchor.N, 0);
                yAxisLabel = super.createLabel('Dry Bulb', { x: 0, y: this.options.size.y / 2 }, fontColor, TextAnchor.N, -90);
            } else {
                xAxisLabel = super.createLabel('Dry Bulb', { x: this.options.size.x / 2, y: this.options.size.y }, fontColor, TextAnchor.S, 0);
                yAxisLabel = super.createLabel(yAxisText, { x: this.options.size.x, y: this.options.size.y / 2 }, fontColor, TextAnchor.N, 90);
            }
            this.g.text.append(xAxisLabel, yAxisLabel);
        }
        // Draw constant dry bulb vertical lines.
        Psychart.getRange(this.options.dbMin, this.options.dbMax, this.options.major.temp).forEach(db => {
            const data: PsyState[] = [];
            // The lower point is on the X-axis (rh = 0%)
            data.push(new PsyState({ db: db, other: 0, measurement: 'dbrh' }, this.options));
            // The upper point is on the saturation line (rh = 100%)
            data.push(new PsyState({ db: db, other: 1, measurement: 'dbrh' }, this.options));
            // Draw the axis and the label
            this.drawAxis(data);
            this.drawLabel(db + (this.options.showUnits.axis ? this.units.temp : ''), data[0], TextAnchor.N, 0, 'Dry Bulb' + (this.options.showUnits.tooltip ? ' [' + this.units.temp + ']' : ''));
        });
        switch (this.options.yAxis) {
            case ('dp'): {
                // Draw constant dew point horizontal lines.
                Psychart.getRange(0, this.options.dpMax, this.options.major.temp).forEach(dp => {
                    const data: PsyState[] = [];
                    // The left point is on the saturation line (db = dp)
                    data.push(new PsyState({ db: dp, other: dp, measurement: 'dbdp' }, this.options));
                    // The right point is at the maximum dry bulb temperature
                    data.push(new PsyState({ db: this.options.dbMax, other: dp, measurement: 'dbdp' }, this.options));
                    // Draw the axis and the label
                    this.drawAxis(data);
                    this.drawLabel(dp + (this.options.showUnits.axis ? this.units.temp : ''), data[1], TextAnchor.W, 0, 'Dew Point' + (this.options.showUnits.tooltip ? ' [' + this.units.temp + ']' : ''));
                });
                break;
            }
            case ('hr'): {
                // Draw constant humidity ratio horizontal lines.
                const maxHr: number = new PsyState({ db: this.options.dbMax, measurement: 'dbdp', other: this.options.dpMax }, this.options).hr,
                    step: number = this.options.major.humRat / this.scaleFactor.hr;
                Psychart.getRange(0, maxHr, step).forEach(hr => {
                    const data: PsyState[] = [];
                    // The right point is at the maximum dry bulb temperature
                    data.push(new PsyState({ db: this.options.dbMax, other: hr, measurement: 'dbhr' }, this.options));
                    // The left point is on the saturation line
                    const dp: number = data[data.length - 1].dp;
                    data.push(new PsyState({ db: dp, other: dp, measurement: 'dbdp' }, this.options));
                    // Draw the axis and the label
                    this.drawAxis(data);
                    this.drawLabel(SMath.round2(hr * this.scaleFactor.hr, 1) + (this.options.showUnits.axis ? this.units.hr : ''), data[0], TextAnchor.W, 0, 'Humidity Ratio' + (this.options.showUnits.tooltip ? ' [' + this.units.hr + ']' : ''));
                });
                break;
            }
            default: {
                throw new Error('Invalid y-axis type: ' + this.options.yAxis);
            }
        }
        switch (this.options.dAxis) {
            case ('wb'): {
                // Draw constant wet bulb diagonal lines.
                Psychart.getRange(this.options.dbMin, this.options.dpMax, this.options.major.temp).forEach(wb => {
                    const data: PsyState[] = [];
                    // Dry bulb is always equal or greater than wet bulb.
                    for (let db = wb; db <= this.options.dbMax; db += this.options.resolution) {
                        data.push(new PsyState({ db: db, other: wb, measurement: 'dbwb' }, this.options));
                    }
                    // Draw the axis and the label
                    this.drawAxis(data);
                    this.drawLabel(wb + (this.options.showUnits.axis ? this.units.temp : ''), data[0], TextAnchor.SE, 15, 'Wet Bulb' + (this.options.showUnits.tooltip ? ' [' + this.units.temp + ']' : ''));
                });
                break;
            }
            case ('h'): {
                // Calculate the minimum and maximum enthalpy bounds
                const minH: number = new PsyState({ db: this.options.dbMin, other: 0, measurement: 'dbrh' }, this.options).h;
                const maxH: number = new PsyState({ db: this.options.dpMax, other: 1, measurement: 'dbrh' }, this.options).h;
                // The first iteration is at the point (dbMin, 0%rh) which essentially is a single point at the lower-left of Psychart
                // We don't want the first iteration to be at (dbMin, 100%rh) because in that case we lose any possible enthalpy lines
                // generated lower than (dbMin, 100%rh). I'll probably forget why I did this, so try this with a high dbMin and 100%rh
                // and notice that a large chunk of the constant enthalpy lines are "missing". This is purely a visual decision.
                let first = true;
                // Draw constant enthalpy diagonal lines.
                Psychart.getRange(minH, maxH, this.options.major.enthalpy / this.scaleFactor.h).forEach(h => {
                    // Skip the first iteration
                    if (first) {
                        first = false;
                        return;
                    }
                    const data: PsyState[] = [];
                    // Calculate the dry bulb for dry air with the current enthalpy
                    const dbDry: number = SMath.clamp(PsyState.getDryBulbWithEnthalpy(h), this.options.dbMin, this.options.dbMax);
                    // Compute the diagonal line representing the current enthalpy axis
                    for (let db = dbDry; db >= this.options.dbMin; db -= this.options.resolution) {
                        try {
                            data.unshift(new PsyState({ db: db, other: h, measurement: 'dbh' }, this.options));
                        } catch {
                            // Stop computation when reaching saturation line, or when new PsyState fails
                        }
                    }
                    // Draw the axis and the label
                    this.drawAxis(data);
                    this.drawLabel(SMath.round2(h * this.scaleFactor.h, 0.1) + (this.options.showUnits.axis ? this.units.h : ''), data[0], TextAnchor.SE, 15, 'Enthalpy' + (this.options.showUnits.tooltip ? ' [' + this.units.h + ']' : ''));
                });
                break;
            }
            default: {
                throw new Error(`Invalid diagonal axis type: "${this.options.dAxis}"`);
            }
        }
        // Draw constant relative humidity lines.
        Psychart.getRange(0, 100, this.options.major.relHum).forEach(rh => {
            const data: PsyState[] = [];
            let preferredAnchor: TextAnchor = TextAnchor.NE;
            let rotation = 0;
            // Must iterate through all dry bulb temperatures to calculate each Y-coordinate
            for (let db = this.options.dbMin; db <= this.options.dbMax; db += this.options.resolution) {
                data.push(new PsyState({ db: db, other: rh / 100, measurement: 'dbrh' }, this.options));
                // Stop drawing when the line surpasses the bounds of the chart
                if (data[data.length - 1].dp >= this.options.dpMax) {
                    preferredAnchor = TextAnchor.SW;
                    rotation = -30;
                    break;
                }
            }
            // Draw the axis and the label
            this.drawAxis(data);
            if (rh > 0 && rh < 100) {
                this.drawLabel(rh + (this.options.showUnits.axis ? '%' : ''), data[data.length - 1], preferredAnchor, rotation, 'Relative Humidity' + (this.options.showUnits.tooltip ? ' [%]' : ''));
            }
        });
        // Draw any regions, if applicable
        let regionIndex = 0;
        Object.entries(regions)
            .filter(([name,]) => this.options.regions?.includes(name as Region))
            .forEach(([, region]) => {
                // Force region gradient to remain within subrange of full span to improve visual impact in light/dark themes
                const minRegion = 0 + -1, // -1 (arbitrary) Affects minimum span of region
                    maxRegion = this.options.regions.length - 1 + 4, // +4 (arbitrary) Affects maximum span of region
                    minSpan = (this.options.flipGradients) ? maxRegion : minRegion,
                    maxSpan = (this.options.flipGradients) ? minRegion : maxRegion,
                    data = Chart.deepCopy(region.data);
                if (this.options.unitSystem === 'IP') {
                    // Convert from SI to US units
                    data.forEach(datum => {
                        datum.db = Psychart.CtoF(datum.db);
                        if (datum.measurement === 'dbdp' || datum.measurement === 'dbwb') {
                            datum.other = Psychart.CtoF(datum.other);
                        }
                    });
                }
                this.drawRegion(data, Palette[this.options.colors.regionGradient].getColor(regionIndex, minSpan, maxSpan), region.tooltip);
                regionIndex++;
            });
    }
    /**
     * Interpolate between "corner" psychrometric states.
     */
    private interpolate(states: PsyState[], crop: boolean): PsyState[] {
        // Cannot interpolate with only 1 point!
        if (states.length < 2) {
            return states;
        }
        // Create array containing interpolated points, starting with the first state.
        const data: PsyState[] = [states[0]];
        for (let i = 1; i < states.length; i++) {
            // Determine the start and end states.
            const start: PsyState = states[i - 1];
            const end: PsyState = states[i];
            // Check if iso-rh, iso-wb, or iso-dp curved or straight lines
            if (start.state.measurement === end.state.measurement && SMath.approx(start.state.other, end.state.other)) {
                // Determine the dry bulb range
                const startDb: number = crop ? SMath.clamp(start.db, this.options.dbMin, this.options.dbMax) : start.db;
                const endDb: number = crop ? SMath.clamp(end.db, this.options.dbMin, this.options.dbMax) : end.db;
                const nPoints: number = Math.abs((startDb - endDb) / this.options.resolution) | 0;
                const dbRange: number[] = SMath.linspace(startDb, endDb, nPoints);
                // Compute several intermediate states with a step of `resolution`
                for (const db of dbRange) {
                    data.push(new PsyState({ db: db, other: start.state.other, measurement: start.state.measurement }, this.options));
                    // Stop generating if dew point exceeds maximum
                    if (crop && data[data.length - 1].dp > this.options.dpMax) {
                        break;
                    }
                }
            } else {
                data.push(end);
            }
        }
        return data;
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
     * Create an SVG circle element.
     */
    private createCircle(color: Color, location: PsyState, radius: number): SVGCircleElement {
        const circle: SVGCircleElement = document.createElementNS(this.NS, 'circle');
        const point = location.toXY();
        circle.setAttribute('fill', color.toString());
        circle.setAttribute('cx', `${point.x}px`);
        circle.setAttribute('cy', `${point.y}px`);
        circle.setAttribute('r', `${radius}px`);
        return circle;
    }
    /**
     * Draw an axis line given an array of psychrometric states.
     */
    private drawAxis(data: PsyState[]): void {
        this.g.axes.appendChild(this.createLine(data, Color.hex(this.options.colors.axis), 1.0));
    }
    /**
     * Create a line to append onto a parent element.
     */
    private createLine(data: PsyState[], color: Color, weight: number): SVGPathElement {
        const line = document.createElementNS(this.NS, 'path');
        line.setAttribute('fill', 'none');
        line.setAttribute('stroke', color.toString());
        line.setAttribute('stroke-width', weight + 'px');
        line.setAttribute('stroke-linecap', 'round');
        line.setAttribute('vector-effect', 'non-scaling-stroke');
        // Convert the array of psychrometric states into an array of (x,y) points.
        this.setPathData(line, data, false);
        return line;
    }
    /**
     * Draw an axis label.
     */
    private drawLabel(text: string, location: PsyState, anchor: TextAnchor, rotation: number, tooltip?: string): void {
        // Determine if anchor needs to be mirrored
        if (this.options.flipXY) {
            switch (anchor) {
                case (TextAnchor.E): {
                    anchor = TextAnchor.N;
                    break;
                }
                case (TextAnchor.N): {
                    anchor = TextAnchor.E;
                    break;
                }
                case (TextAnchor.NW): {
                    anchor = TextAnchor.SE;
                    break;
                }
                case (TextAnchor.SE): {
                    anchor = TextAnchor.NW;
                    break;
                }
                case (TextAnchor.S): {
                    anchor = TextAnchor.W;
                    break;
                }
                case (TextAnchor.W): {
                    anchor = TextAnchor.S;
                    break;
                }
            }
        }
        const fontColor: Color = Color.hex(this.options.colors.font);
        const label: SVGTextElement = this.createLabel(text, location.toXY(), fontColor, anchor, rotation);
        this.g.text.appendChild(label);
        if (tooltip) {
            label.addEventListener('mouseover', e => this.drawTooltip(tooltip, { x: e.offsetX, y: e.offsetY }, fontColor, this.g.tooltips));
            label.addEventListener('mouseleave', () => Chart.clearChildren(this.g.tooltips));
        }
    }
    /**
     * Add a line to the legend.
     */
    private addToLegend(seriesName: string, color?: Color, gradient?: PaletteName): void {
        this.legend.setAttribute('viewBox', '0 0 ' + this.options.size.x + ' ' + this.getLegendHeight());
        this.legend.setAttribute('height', this.getLegendHeight() + 'px');
        const g: SVGGElement = document.createElementNS(this.NS, 'g'),
            icon: SVGRectElement = document.createElementNS(this.NS, 'rect');
        g.setAttribute('cursor', 'pointer');
        icon.setAttribute('x', (this.options.font.size / 2).toString());
        icon.setAttribute('y', (this.getLegendHeight() - this.options.font.size * 1.5).toString());
        icon.setAttribute('width', this.options.font.size.toString());
        icon.setAttribute('height', this.options.font.size.toString());
        icon.setAttribute('rx', (this.options.font.size * 0.20).toString());
        if (color) {
            icon.setAttribute('fill', color.toString());
        } else if (gradient) {
            const uniqueGradientID: string = 'psy_' + this.id + '_grad_' + this.legendDefs.children.length;
            this.legendDefs.appendChild(Palette[gradient].toSVG(uniqueGradientID));
            icon.setAttribute('fill', 'url(#' + uniqueGradientID + ')');
        } else {
            throw new Error('Error in ' + seriesName + '. Must have color or gradient defined.');
        }
        const fontColor: Color = Color.hex(this.options.colors.font);
        const legendText: SVGTextElement = this.createLabel(seriesName, { x: this.options.font.size * 1.5, y: this.getLegendHeight() - this.options.font.size }, fontColor, TextAnchor.W, 0);
        g.addEventListener('click', () => {
            this.series[seriesName].hidden = !this.series[seriesName].hidden;
            if (this.series[seriesName].hidden) {
                g.setAttribute('opacity', '0.5');
                legendText.setAttribute('text-decoration', 'line-through');
                // Remove elements of this series from Psychart
                this.g.points.removeChild(this.series[seriesName].pointGroup);
                this.g.trends.removeChild(this.series[seriesName].lineGroup);
            } else {
                g.removeAttribute('opacity');
                legendText.removeAttribute('text-decoration');
                // Re-add elements of this series to Psychart
                this.g.points.appendChild(this.series[seriesName].pointGroup);
                this.g.trends.appendChild(this.series[seriesName].lineGroup);
            }
        });
        g.append(icon, legendText);
        this.legendg.appendChild(g);
    }
    /**
     * Compute the height of the legend, in pixels.
     */
    private getLegendHeight(): number {
        return (this.legendg.children.length + 2.5) * this.options.font.size * this.options.lineHeight;
    }
    /**
     * Plot one psychrometric state onto the psychrometric chart.
     */
    public plot(state: State, config: Partial<DataOptions> = {}): void {
        // Skip series that are missing a measurement point.
        if (!Number.isFinite(state.db) || !Number.isFinite(state.other)) {
            return;
        }
        // Set default data options.
        const options: DataOptions = Chart.setDefaults(config, defaultDataOptions);
        // Determine whether this is time-dependent.
        const hasTimeStamp: boolean = Number.isFinite(options.time.now),
            timeSeries: boolean = hasTimeStamp && Number.isFinite(options.time.end) && Number.isFinite(options.time.start);
        // Divide by 100 if relHumType is set to 'percent'
        if (state.measurement === 'dbrh' && options.relHumType === 'percent') {
            state.other /= 100;
        }
        const currentState = new PsyState(state, this.options),
            location = currentState.toXY();
        // Compute the current color to plot
        const tMin: number = (this.options.flipGradients) ? options.time.end : options.time.start,
            tMax: number = (this.options.flipGradients) ? options.time.start : options.time.end,
            tNow: number = options.time.now,
            color: Color = timeSeries ? Palette[options.gradient].getColor(tNow, tMin, tMax) : Color.hex(options.color);
        // Define a circle element and assign its attributes.
        const point: SVGCircleElement = this.createCircle(color, currentState, options.pointRadius);
        // Determine whether to draw a line from another point.
        let lineFrom: PsyState | null = null;
        // Options for data series:
        const seriesName: string = options.showId ? `[#${++this.pointId}] ${options.name}` : options.name;
        if (options.name) {
            // Add an item in the legend, if not previously added.
            if (!this.series[seriesName]) {
                this.series[seriesName] = {
                    lastState: currentState,
                    hidden: false,
                    pointGroup: document.createElementNS(this.NS, 'g'),
                    lineGroup: document.createElementNS(this.NS, 'g'),
                }
                // Add the series-level group elements onto the main groups.
                this.g.points.appendChild(this.series[seriesName].pointGroup);
                this.g.trends.appendChild(this.series[seriesName].lineGroup);
                if (options.legend) {
                    this.addToLegend(seriesName, timeSeries ? undefined : color, timeSeries ? options.gradient : undefined);
                }
            } else if (options.line === true) {
                // Determine whether to connect the states with a line
                lineFrom = this.series[seriesName].lastState;
            }
            // Store the last state in order to draw a line.
            this.series[seriesName].lastState = currentState;
            // Plot the new data point onto the series group element.
            this.series[seriesName].pointGroup.appendChild(point);
            // Create an ID label for the point if the ID has been assigned.
            if (options.showId) {
                const anchors: Record<DataOptions['idPlacement'], TextAnchor> = {
                    I: TextAnchor.SW,
                    II: TextAnchor.SE,
                    III: TextAnchor.NE,
                    IV: TextAnchor.NW,
                };
                const idLabel: SVGTextElement = super.createLabel(this.pointId.toString(), location, color, anchors[options.idPlacement], 0);
                this.series[seriesName].pointGroup.appendChild(idLabel);
            }

        } else {
            // Plot the new data point onto the base group element.
            this.g.points.appendChild(point);
        }
        // Check for arbitrary origin point to draw a line.
        if (typeof options.line === 'object') {
            // Divide by 100 if relHumType is set to 'percent'
            if (options.line.measurement === 'dbrh' && options.relHumType === 'percent') {
                options.line.other /= 100;
            }
            lineFrom = new PsyState(options.line, this.options);
        }
        // Draw a line.
        if (lineFrom) {
            const line: SVGPathElement = this.createLine(this.interpolate([lineFrom, currentState], true), color, options.pointRadius / 2);
            if (seriesName) {
                this.series[seriesName].lineGroup.appendChild(line);
            } else {
                this.g.trends.appendChild(line);
            }
        }
        // Generate the text to display on mouse hover.
        const tooltipString: string = (options.name ? options.name + '\n' : '') +
            (hasTimeStamp ? new Date(tNow).toLocaleString() + '\n' : '') +
            currentState.db.toFixed(1) + this.units.temp + ' Dry Bulb\n' +
            (currentState.rh * 100).toFixed() + '% Rel. Hum.\n' +
            currentState.wb.toFixed(1) + this.units.temp + ' Wet Bulb\n' +
            currentState.dp.toFixed(1) + this.units.temp + ' Dew Point' +
            (options.advanced ? '\n' +
                (currentState.hr * this.scaleFactor.hr).toFixed(2) + ' ' + this.units.hr + ' Hum. Ratio\n' +
                currentState.vp.toFixed(1) + ' ' + this.units.vp + ' Vap. Press.\n' +
                (currentState.h * this.scaleFactor.h).toFixed(1) + ' ' + this.units.h + ' Enthalpy\n' +
                currentState.v.toFixed(2) + ' ' + this.units.v + ' Volume\n' +
                (currentState.s * 100).toFixed() + '% Saturation' : '');
        // Set the behavior when the user interacts with this point
        point.addEventListener('mouseover', e => this.drawTooltip(tooltipString, { x: e.offsetX, y: e.offsetY }, color, this.g.tooltips));
        point.addEventListener('mouseleave', () => Chart.clearChildren(this.g.tooltips));
        point.addEventListener('click', e => {
            e.stopPropagation(); // Stop the base <svg> from capturing this event
            const highlightColor: Color = Color.hex(this.options.colors.highlight)
            const highlight: SVGCircleElement = this.createCircle(highlightColor, currentState, options.pointRadius * 2);
            this.g.hilites.appendChild(highlight);
        });
    }
    /**
     * Draw a shaded region on Psychart.
     */
    private drawRegion(data: State[], color: Color, tooltip?: string): void {
        // Interpolate to get a set of psychrometric states that make the border of the region
        const states: PsyState[] = this.interpolate(data.map(datum => new PsyState(datum, this.options)), false);
        // Create the SVG element to render the shaded region
        const region = document.createElementNS(this.NS, 'path');
        region.setAttribute('fill', color.toString());
        this.setPathData(region, states, true);
        this.g.regions.appendChild(region);
        // Optionally render a tooltip on mouse hover
        if (tooltip) {
            region.addEventListener('mouseover', e => this.drawTooltip(tooltip, { x: e.offsetX, y: e.offsetY }, color, this.g.tooltips));
            region.addEventListener('mouseleave', () => Chart.clearChildren(this.g.tooltips));
        }
    }
    /**
     * Clear all plotted data from Psychart.
     */
    public clearData(): void {
        this.pointId = 0;
        this.series = {};
        Chart.clearChildren(this.g.points);
        Chart.clearChildren(this.g.trends);
        Chart.clearChildren(this.g.hilites);
        Chart.clearChildren(this.legendDefs);
        Chart.clearChildren(this.legendg);
    }
    /**
     * Calculate the (x,y) coordinates for any state.
     * Note: Relative humidity must be in range [0.0-1.0]
     */
    public getXY(state: State) {
        return new PsyState(state, this.options).toXY();
    }
}
