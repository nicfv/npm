
/**
 * Contains definitions for metric prefixes.
 */
export type Prefix = 'quetta' | 'ronna' | 'yotta' | 'zetta' | 'exa' | 'peta' | 'tera' | 'giga' | 'mega' | 'kilo' | 'hecto' | 'deca' | 'deci' | 'centi' | 'milli' | 'micro' | 'nano' | 'pico' | 'femto' | 'atto' | 'zepto' | 'yocto' | 'ronto' | 'quecto';
/**
 * Contains information for a metric prefix.
 */
interface Data {
    /**
     * The LaTeX representation of this metric prefix.
     */
    readonly LaTeX: string;
    /**
     * The scale of this metric prefix.
     */
    readonly scale: number;
}
/**
 * Contains information for all metric prefixes.
 */
export const prefixTable: { [index in Prefix]: Data } = {
    quetta: { LaTeX: '\\text{Q}', scale: 1e30 },
    ronna: { LaTeX: '\\text{R}', scale: 1e27 },
    yotta: { LaTeX: '\\text{Y}', scale: 1e24 },
    zetta: { LaTeX: '\\text{Z}', scale: 1e21 },
    exa: { LaTeX: '\\text{E}', scale: 1e18 },
    peta: { LaTeX: '\\text{P}', scale: 1e15 },
    tera: { LaTeX: '\\text{T}', scale: 1e12 },
    giga: { LaTeX: '\\text{G}', scale: 1e9 },
    mega: { LaTeX: '\\text{M}', scale: 1e6 },
    kilo: { LaTeX: '\\text{k}', scale: 1e3 },
    hecto: { LaTeX: '\\text{h}', scale: 1e2 },
    deca: { LaTeX: '\\text{da}', scale: 1e1 },
    deci: { LaTeX: '\\text{d}', scale: 1e-1 },
    centi: { LaTeX: '\\text{c}', scale: 1e-2 },
    milli: { LaTeX: '\\text{m}', scale: 1e-3 },
    micro: { LaTeX: '\\mu', scale: 1e-6 },
    nano: { LaTeX: '\\text{n}', scale: 1e-9 },
    pico: { LaTeX: '\\text{p}', scale: 1e-12 },
    femto: { LaTeX: '\\text{f}', scale: 1e-15 },
    atto: { LaTeX: '\\text{a}', scale: 1e-18 },
    zepto: { LaTeX: '\\text{z}', scale: 1e-21 },
    yocto: { LaTeX: '\\text{y}', scale: 1e-24 },
    ronto: { LaTeX: '\\text{r}', scale: 1e-27 },
    quecto: { LaTeX: '\\text{q}', scale: 1e-30 },
};