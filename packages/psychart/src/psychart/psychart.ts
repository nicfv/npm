import { Color, Palette, PaletteName } from 'viridis';
import { PsyState } from './psystate';
import * as SMath from 'smath';
import { PsychartOptions, Datum, RegionName, DataOptions } from './types';
import { defaultDataOptions, defaultPsychartOptions, regions } from './defaults';
import { Chart } from '../chart';
import { TextAnchor } from '../types';

/**
 * Generates an interactive psychrometric chart with plotting capabilities.
 */
export class Psychart extends Chart<PsychartOptions> {
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
     * Helper function to return an array of region names and their corresponding tooltips.
     */
    public static getRegionNamesAndTips(): [RegionName, string][] {
        return Object.entries(regions).map(([name, region]) => [name as RegionName, region.tooltip]);
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
        const stepMin: number = SMath.round2(min + step * 1.1, step),
            stepMax: number = SMath.round2(max - step * 1.1, step),
            range: number[] = [];
        for (let i = stepMin; i <= stepMax; i += step) {
            range.push(i);
        }
        return [min, ...range, max];
    }
    /**
     * Construct a new instance of `Psychart` given various configuration properties.
     */
    constructor(options: Partial<PsychartOptions> = {}) {
        super(options, defaultPsychartOptions);
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
            this.legend.appendChild(this.createLabel(this.options.legend.title, { x: 0, y: 0 }, Color.hex(this.options.colors.font), TextAnchor.NW));
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
        // Create new SVG groups, and append all the
        // layers into the chart.
        Object.values(this.g).forEach(group => this.svg.appendChild(group));
        // Draw constant dry bulb vertical lines.
        Psychart.getRange(this.options.dbMin, this.options.dbMax, this.options.major.temp).forEach(db => {
            const data: PsyState[] = [];
            // The lower point is on the X-axis (rh = 0%)
            data.push(new PsyState({ db: db, other: 0, measurement: 'dbrh' }, this.options));
            // The upper point is on the saturation line (rh = 100%)
            data.push(new PsyState({ db: db, other: 1, measurement: 'dbrh' }, this.options));
            // Draw the axis and the label
            this.drawAxis(data);
            this.drawLabel(db + (this.options.showUnits.axis ? this.units.temp : ''), data[0], TextAnchor.N, 'Dry Bulb' + (this.options.showUnits.tooltip ? ' [' + this.units.temp + ']' : ''));
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
                    this.drawLabel(dp + (this.options.showUnits.axis ? this.units.temp : ''), data[1], TextAnchor.W, 'Dew Point' + (this.options.showUnits.tooltip ? ' [' + this.units.temp + ']' : ''));
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
                    this.drawLabel(SMath.round2(hr * this.scaleFactor.hr, 1) + (this.options.showUnits.axis ? this.units.hr : ''), data[0], TextAnchor.W, 'Humidity Ratio' + (this.options.showUnits.tooltip ? ' [' + this.units.hr + ']' : ''));
                });
                break;
            }
            default: {
                throw new Error('Invalid y-axis type: ' + this.options.yAxis);
            }
        }
        // Draw constant wet bulb diagonal lines.
        Psychart.getRange(this.options.dbMin, this.options.dpMax, this.options.major.temp).forEach(wb => {
            const data: PsyState[] = [];
            // Dry bulb is always equal or greater than wet bulb.
            for (let db = wb; db <= this.options.dbMax; db += this.options.resolution) {
                data.push(new PsyState({ db: db, other: wb, measurement: 'dbwb' }, this.options));
            }
            // Draw the axis and the label
            this.drawAxis(data);
            this.drawLabel(wb + (this.options.showUnits.axis ? this.units.temp : ''), data[0], TextAnchor.SE, 'Wet Bulb' + (this.options.showUnits.tooltip ? ' [' + this.units.temp + ']' : ''));
        });
        // Draw constant relative humidity lines.
        Psychart.getRange(0, 100, this.options.major.relHum).forEach(rh => {
            const data: PsyState[] = [];
            let preferredAnchor: TextAnchor = TextAnchor.NE;
            // Must iterate through all dry bulb temperatures to calculate each Y-coordinate
            for (let db = this.options.dbMin; db <= this.options.dbMax; db += this.options.resolution) {
                data.push(new PsyState({ db: db, other: rh / 100, measurement: 'dbrh' }, this.options));
                // Stop drawing when the line surpasses the bounds of the chart
                if (data[data.length - 1].dp >= this.options.dpMax) {
                    preferredAnchor = TextAnchor.S;
                    break;
                }
            }
            // Draw the axis and the label
            this.drawAxis(data);
            if (rh > 0 && rh < 100) {
                this.drawLabel(rh + (this.options.showUnits.axis ? '%' : ''), data[data.length - 1], preferredAnchor, 'Relative Humidity' + (this.options.showUnits.tooltip ? ' [%]' : ''));
            }
        });
        // Draw any regions, if applicable
        let regionIndex = 0;
        Object.entries(regions)
            .filter(([name,]) => this.options.regions?.includes(name as RegionName))
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
    private drawLabel(text: string, location: PsyState, anchor: TextAnchor, tooltip?: string): void {
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
        const fontColor: Color = Color.hex(this.options.colors.font),
            label = this.createLabel(text, location.toXY(), fontColor, anchor);
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
        const fontColor: Color = Color.hex(this.options.colors.font),
            legendText: SVGTextElement = this.createLabel(seriesName, { x: this.options.font.size * 1.5, y: this.getLegendHeight() - this.options.font.size }, fontColor, TextAnchor.W);
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
    public plot(state: Datum, config: Partial<DataOptions> = {}): void {
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
        // Define a 0-length path element and assign its attributes.
        const point = document.createElementNS(this.NS, 'path');
        point.setAttribute('fill', 'none');
        point.setAttribute('stroke', color.toString());
        point.setAttribute('stroke-width', +options.pointRadius + 'px');
        point.setAttribute('stroke-linecap', 'round');
        point.setAttribute('vector-effect', 'non-scaling-stroke');
        point.setAttribute('d', 'M ' + location.x + ',' + location.y + ' h 0');
        // Determine whether to draw a line from another point.
        let lineFrom: PsyState | null = null;
        // Options for data series:
        if (options.name) {
            // Add an item in the legend, if not previously added.
            if (!this.series[options.name]) {
                this.series[options.name] = {
                    lastState: currentState,
                    hidden: false,
                    pointGroup: document.createElementNS(this.NS, 'g'),
                    lineGroup: document.createElementNS(this.NS, 'g'),
                }
                // Add the series-level group elements onto the main groups.
                this.g.points.appendChild(this.series[options.name].pointGroup);
                this.g.trends.appendChild(this.series[options.name].lineGroup);
                if (options.legend) {
                    this.addToLegend(options.name, timeSeries ? undefined : color, timeSeries ? options.gradient : undefined);
                }
            } else if (options.line === true) {
                // Determine whether to connect the states with a line
                lineFrom = this.series[options.name].lastState;
            }
            // Store the last state in order to draw a line.
            this.series[options.name].lastState = currentState;
            // Plot the new data point onto the series group element.
            this.series[options.name].pointGroup.appendChild(point);
        } else {
            // Plot the new data point onto the base group element.
            this.g.points.appendChild(point);
        }
        // Check for arbitrary origin point to draw a line.
        if (typeof options.line === 'object') {
            lineFrom = new PsyState(options.line, this.options);
        }
        // Draw a line.
        if (lineFrom) {
            const line: SVGPathElement = this.createLine(this.interpolate([lineFrom, currentState], true), color, options.pointRadius / 2);
            if (options.name) {
                this.series[options.name].lineGroup.appendChild(line);
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
    }
    /**
     * Draw a shaded region on Psychart.
     */
    private drawRegion(data: Datum[], color: Color, tooltip?: string): void {
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
        this.series = {};
        Chart.clearChildren(this.g.points);
        Chart.clearChildren(this.g.trends);
        Chart.clearChildren(this.legendDefs);
        Chart.clearChildren(this.legendg);
    }
}
