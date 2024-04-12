/**
 * Contains definitions for metric prefixes.
 */
export type Prefixes = 'quetta' | 'ronna' | 'yotta' | 'zetta' | 'exa' | 'peta' | 'tera' | 'giga' | 'mega' | 'kilo' | 'hecto' | 'deca' | 'base' | 'deci' | 'centi' | 'milli' | 'micro' | 'nano' | 'pico' | 'femto' | 'atto' | 'zepto' | 'yocto' | 'ronto' | 'quecto';
/**
 * Contains information for a metric prefix.
 */
interface PrefixData {
    /**
     * The LaTeX representation of this metric prefix.
     */
    readonly latex: string;
    /**
     * The scale of this metric prefix.
     */
    readonly scale: number;
}
/**
 * Contains information for all metric prefixes.
 */
export const Prefix: { [index in Prefixes]: PrefixData } = {
    quetta: { latex: '\\text{Q}', scale: 1e30 },
    ronna: { latex: '\\text{R}', scale: 1e27 },
    yotta: { latex: '\\text{Y}', scale: 1e24 },
    zetta: { latex: '\\text{Z}', scale: 1e21 },
    exa: { latex: '\\text{E}', scale: 1e18 },
    peta: { latex: '\\text{P}', scale: 1e15 },
    tera: { latex: '\\text{T}', scale: 1e12 },
    giga: { latex: '\\text{G}', scale: 1e9 },
    mega: { latex: '\\text{M}', scale: 1e6 },
    kilo: { latex: '\\text{k}', scale: 1e3 },
    hecto: { latex: '\\text{h}', scale: 1e2 },
    deca: { latex: '\\text{da}', scale: 1e1 },
    base: { latex: '', scale: 1 },
    deci: { latex: '\\text{d}', scale: 1e-1 },
    centi: { latex: '\\text{c}', scale: 1e-2 },
    milli: { latex: '\\text{m}', scale: 1e-3 },
    micro: { latex: '\\mu', scale: 1e-6 },
    nano: { latex: '\\text{n}', scale: 1e-9 },
    pico: { latex: '\\text{p}', scale: 1e-12 },
    femto: { latex: '\\text{f}', scale: 1e-15 },
    atto: { latex: '\\text{a}', scale: 1e-18 },
    zepto: { latex: '\\text{z}', scale: 1e-21 },
    yocto: { latex: '\\text{y}', scale: 1e-24 },
    ronto: { latex: '\\text{r}', scale: 1e-27 },
    quecto: { latex: '\\text{q}', scale: 1e-30 },
};