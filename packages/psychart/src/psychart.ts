import { Color, Palette, PaletteName } from 'viridis';
import { PsyState } from './psystate';
import { SMath } from 'smath';
import { PsychartOptions, Datum, Point, RegionName, DataOptions } from './types';
import { deepCopy, defaultDataOptions, defaultPsychartOptions, regions, setDefaults } from './defaults';

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
    private readonly base: HTMLDivElement = document.createElement('div');
    /**
     * This is the base SVG where Psychart is rendered.
     */
    private readonly svg: SVGSVGElement = document.createElementNS(NS, 'svg');
    /**
     * Represents the legend for Psychart.
     */
    private readonly legend: SVGSVGElement = document.createElementNS(NS, 'svg');
    /**
     * Legend definitions, which contains linear gradients.
     */
    private readonly legendDefs: SVGDefsElement = document.createElementNS(NS, 'defs');
    /**
     * The base element for adding lines in the legend.
     */
    private readonly legendg: SVGGElement = document.createElementNS(NS, 'g');
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
     * The data series plotted on Psychart with each of their last states and visibility toggles.
     */
    private series: {
        [legend: string]: {
            lastState: PsyState,
            hidden: boolean,
            pointGroup: SVGGElement,
            lineGroup: SVGGElement,
        }
    } = {};
    /**
     * Helper function to return an array of region names and their corresponding tooltips.
     */
    public static getRegionNamesAndTips(): Array<[RegionName, string]> {
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
            range: Array<number> = [];
        for (let i = stepMin; i <= stepMax; i += step) {
            range.push(i);
        }
        return [min, ...range, max];
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
        this.svg.setAttribute('viewBox', '0 0 ' + this.config.size.x + ' ' + this.config.size.y);
        this.svg.setAttribute('width', this.config.size.x + 'px');
        this.svg.setAttribute('height', this.config.size.y + 'px');
        // Set the legend's viewport size.
        this.legend.setAttribute('viewBox', '0 0 ' + this.config.size.x + ' ' + this.getLegendHeight());
        this.legend.setAttribute('width', this.config.size.x + 'px');
        this.legend.setAttribute('height', this.getLegendHeight() + 'px');
        this.legend.appendChild(this.legendDefs);
        this.legend.appendChild(this.createLabel('Legend', { x: 0, y: 0 }, Color.from(this.config.colors.font), TextAnchor.NW));
        this.legend.appendChild(this.legendg);
        // Attach elements to the base element.
        const legendContainer: HTMLDivElement = document.createElement('div');
        legendContainer.setAttribute('title', 'Click to toggle data series visibility.');
        legendContainer.style.position = 'absolute';
        legendContainer.style.left = (this.config.flipXY ? (this.config.size.x - this.config.legend.size.x - this.config.legend.margin.x) : this.config.legend.margin.x) + 'px';
        legendContainer.style.top = (this.config.flipXY ? (this.config.size.y - this.config.legend.size.y - this.config.legend.margin.y) : this.config.legend.margin.y) + 'px';
        legendContainer.style.width = this.config.legend.size.x + 'px';
        legendContainer.style.height = this.config.legend.size.y + 'px';
        legendContainer.style.overflowX = 'hidden';
        legendContainer.style.overflowY = 'auto';
        legendContainer.style.border = '1px solid ' + this.config.colors.axis;
        legendContainer.appendChild(this.legend);
        this.base.style.position = 'relative';
        this.base.appendChild(this.svg);
        this.base.appendChild(legendContainer);
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
        Object.values(this.g).forEach(group => this.svg.appendChild(group));
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
        Object.entries(regions)
            .filter(([name,]) => this.config.regions?.includes(name as RegionName))
            .forEach(([, region]) => {
                // Force region gradient to remain within subrange of full span to improve visual impact in light/dark themes
                const minRegion = 0 + -1, // -1 (arbitrary) Affects minimum span of region
                    maxRegion = this.config.regions.length - 1 + 4, // +4 (arbitrary) Affects maximum span of region
                    minSpan = (this.config.flipGradients) ? maxRegion : minRegion,
                    maxSpan = (this.config.flipGradients) ? minRegion : maxRegion,
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
                this.drawRegion(data, Palette[this.config.colors.regionGradient].getColor(regionIndex, minSpan, maxSpan), region.tooltip);
                regionIndex++;
            });
    }
    /**
     * Interpolate between "corner" psychrometric states.
     */
    private interpolate(states: PsyState[]): PsyState[] {
        const data: PsyState[] = [states[0]];
        for (let i = 1; i < states.length; i++) {
            // Determine the start and end states.
            const start: PsyState = states[i];
            const end: PsyState = states[i - 1];
            // Check if iso-rh, iso-wb, or iso-dp curved or straight lines
            if (start.state.measurement === end.state.measurement && SMath.approx(start.state.other, end.state.other)) {
                // Determine the number of intermediate values to generate
                const nPoints: number = (Math.abs(end.db - start.db) / this.config.resolution) | 0;
                // Compute several intermediate states with a step of `resolution`
                SMath.linspace(start.db, end.db, nPoints).forEach(db => {
                    data.push(new PsyState({ db: db, other: start.state.other, measurement: start.state.measurement }));
                    // Stop generating if dew point exceeds maximum
                    if (data[data.length - 1].dp > this.config.dpMax) {
                        return;
                    }
                });
            } else {
                data.push(start);
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
    private drawAxis(states: PsyState[]): void {
        this.g.axes.appendChild(this.createLine(this.interpolate(states), Color.from(this.config.colors.axis), 1.0));
    }
    /**
     * Create a line to append onto a parent element.
     */
    private createLine(data: PsyState[], color: Color, weight: number): SVGPathElement {
        const line = document.createElementNS(NS, 'path');
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
        const fontColor: Color = Color.from(this.config.colors.font),
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
            padding = this.config.font.size * 0.80,
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
     * Add a line to the legend.
     */
    private addToLegend(seriesName: string, color?: Color, gradient?: PaletteName): void {
        this.legend.setAttribute('viewBox', '0 0 ' + this.config.size.x + ' ' + this.getLegendHeight());
        this.legend.setAttribute('height', this.getLegendHeight() + 'px');
        const g: SVGGElement = document.createElementNS(NS, 'g'),
            icon: SVGRectElement = document.createElementNS(NS, 'rect');
        g.setAttribute('cursor', 'pointer');
        icon.setAttribute('x', (this.config.font.size / 2).toString());
        icon.setAttribute('y', (this.getLegendHeight() - this.config.font.size * 1.5).toString());
        icon.setAttribute('width', this.config.font.size.toString());
        icon.setAttribute('height', this.config.font.size.toString());
        icon.setAttribute('rx', (this.config.font.size * 0.20).toString());
        if (color) {
            icon.setAttribute('fill', color.toString());
        } else if (gradient) {
            const uniqueGradientID: string = 'grad_' + this.legendDefs.children.length;
            this.legendDefs.appendChild(Palette[gradient].toSVG(uniqueGradientID));
            icon.setAttribute('fill', 'url(#' + uniqueGradientID + ')');
        } else {
            throw new Error('Error in ' + seriesName + '. Must have color or gradient defined.');
        }
        const fontColor: Color = Color.from(this.config.colors.font),
            legendText: SVGTextElement = this.createLabel(seriesName, { x: this.config.font.size * 1.5, y: this.getLegendHeight() - this.config.font.size }, fontColor, TextAnchor.W);
        g.addEventListener('click', () => {
            this.series[seriesName].hidden = !this.series[seriesName].hidden;
            if (this.series[seriesName].hidden) {
                g.setAttribute('opacity', '0.5');
                legendText.setAttribute('text-decoration', 'line-through');
                this.series[seriesName].pointGroup.setAttribute('visibility', 'hidden');
                this.series[seriesName].lineGroup.setAttribute('visibility', 'hidden');
            } else {
                g.removeAttribute('opacity');
                legendText.removeAttribute('text-decoration');
                this.series[seriesName].pointGroup.removeAttribute('visibility');
                this.series[seriesName].lineGroup.removeAttribute('visibility');
            }
        });
        g.append(icon, legendText);
        this.legendg.appendChild(g);
    }
    /**
     * Compute the height of the legend, in pixels.
     */
    private getLegendHeight(): number {
        return (this.legendg.children.length + 2.5) * this.config.font.size * this.config.lineHeight;
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
     * Plot one psychrometric state onto the psychrometric chart.
     */
    public plot(state: Datum, config: Partial<DataOptions> = {}): void {
        // Skip series that are missing a measurement point.
        if (!Number.isFinite(state.db) || !Number.isFinite(state.other)) {
            return;
        }
        // Set default data options.
        const options: DataOptions = setDefaults(config, defaultDataOptions);
        // Determine whether this is time-dependent.
        const hasTimeStamp: boolean = Number.isFinite(options.time.now),
            timeSeries: boolean = hasTimeStamp && Number.isFinite(options.time.end) && Number.isFinite(options.time.start);
        // Divide by 100 if relHumType is set to 'percent'
        if (state.measurement === 'dbrh' && options.relHumType === 'percent') {
            state.other /= 100;
        }
        const currentState = new PsyState(state),
            location = currentState.toXY();
        // Compute the current color to plot
        const tMin: number = (this.config.flipGradients) ? options.time.end : options.time.start,
            tMax: number = (this.config.flipGradients) ? options.time.start : options.time.end,
            tNow: number = options.time.now,
            color: Color = timeSeries ? Palette[options.gradient].getColor(tNow, tMin, tMax) : Color.from(options.color);
        // Define a 0-length path element and assign its attributes.
        const point = document.createElementNS(NS, 'path');
        point.setAttribute('fill', 'none');
        point.setAttribute('stroke', color.toString());
        point.setAttribute('stroke-width', +options.pointRadius + 'px');
        point.setAttribute('stroke-linecap', 'round');
        point.setAttribute('vector-effect', 'non-scaling-stroke');
        point.setAttribute('d', 'M ' + location.x + ',' + location.y + ' h 0');
        // Options for data series:
        if (options.name) {
            // Add an item in the legend, if not previously added.
            if (!this.series[options.name]) {
                this.series[options.name] = {
                    lastState: currentState,
                    hidden: false,
                    pointGroup: document.createElementNS(NS, 'g'),
                    lineGroup: document.createElementNS(NS, 'g'),
                }
                // Add the series-level group elements onto the main groups.
                this.g.points.appendChild(this.series[options.name].pointGroup);
                this.g.trends.appendChild(this.series[options.name].lineGroup);
                if (options.legend) {
                    this.addToLegend(options.name, timeSeries ? undefined : color, timeSeries ? options.gradient : undefined);
                }
            } else if (options.line) {
                // Determine whether to connect the states with a line
                this.series[options.name].lineGroup.appendChild(this.createLine([this.series[options.name].lastState, currentState], color, 1));
            }
            // Store the last state in order to draw a line.
            this.series[options.name].lastState = currentState;
            // Plot the new data point onto the series group element.
            this.series[options.name].pointGroup.appendChild(point);
        } else {
            // Plot the new data point onto the base group element.
            this.g.points.appendChild(point);
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
        point.addEventListener('mouseover', e => this.drawTooltip(tooltipString, { x: e.offsetX, y: e.offsetY }, color));
        point.addEventListener('mouseleave', () => this.clearChildren(this.g.tooltips));
    }
    /**
     * Draw a shaded region on Psychart.
     */
    private drawRegion(data: Datum[], color: Color, tooltip?: string): void {
        // Create the SVG element to render the shaded region
        const region = document.createElementNS(NS, 'path');
        region.setAttribute('fill', color.toString());
        this.setPathData(region, this.interpolate(data.map(datum => new PsyState(datum))), true);
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
        this.series = {};
        this.clearChildren(this.g.points);
        this.clearChildren(this.g.trends);
        this.clearChildren(this.legendDefs);
        this.clearChildren(this.legendg);
    }
    /**
     * Return the HTML element to append on the parent.
     */
    public getElement(): HTMLDivElement {
        return this.base;
    }
}

/**
 * Represents where the origin is in relation to the text.
 */
const enum TextAnchor {
    NW, N, NE, E, SE, S, SW, W, C
}