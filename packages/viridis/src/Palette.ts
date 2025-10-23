import { Color } from './Color';
import { Gradient } from './Gradient';

/**
 * Defines the list of valid builtin palette names.
 */
export type PaletteName = 'Viridis' | 'Inferno' | 'Magma' | 'Plasma' | 'Grayscale' | 'Parula' | 'Emerald' | 'Mint' | 'Sunset' | 'Dusk' | 'Chroma' | 'Spectral' | 'Cool' | 'Warm' | 'Turquoise' | 'Purplish' | 'Dirt' | 'Lime' | 'Teal' | 'Bee';

/**
 * Contains builtin color palettes.
 * 
 * Credits:
 * - Viridis Color Palette Generator: https://waldyrious.net/viridis-palette-generator/
 * - Loading Colors: https://loading.io/color/feature/
 * - Carto Colors: https://carto.com/carto-colors/
 */
export const Palette: Record<PaletteName, Gradient> = {
    // https://waldyrious.net/viridis-palette-generator/
    Viridis: new Gradient([
        Color.hex('#fde725'),
        Color.hex('#7ad151'),
        Color.hex('#22a884'),
        Color.hex('#2a788e'),
        Color.hex('#414487'),
        Color.hex('#440154'),
    ]),
    Inferno: new Gradient([
        Color.hex('#fcffa4'),
        Color.hex('#fca50a'),
        Color.hex('#dd513a'),
        Color.hex('#932667'),
        Color.hex('#420a68'),
        Color.hex('#000004'),
    ]),
    Magma: new Gradient([
        Color.hex('#fcfdbf'),
        Color.hex('#fe9f6d'),
        Color.hex('#de4968'),
        Color.hex('#8c2981'),
        Color.hex('#3b0f70'),
        Color.hex('#000004'),
    ]),
    Plasma: new Gradient([
        Color.hex('#f0f921'),
        Color.hex('#fca636'),
        Color.hex('#e16462'),
        Color.hex('#b12a90'),
        Color.hex('#6a00a8'),
        Color.hex('#0d0887'),
    ]),
    // https://carto.com/carto-colors/
    Grayscale: new Gradient([
        Color.hex('#f7f7f7'),
        Color.hex('#252525'),
    ]),
    // BluYl
    Parula: new Gradient([
        Color.hex('#f7feae'),
        Color.hex('#b7e6a5'),
        Color.hex('#7ccba2'),
        Color.hex('#46aea0'),
        Color.hex('#089099'),
        Color.hex('#00718b'),
        Color.hex('#045275'),
    ]),
    Emerald: new Gradient([
        Color.hex('#d3f2a3'),
        Color.hex('#97e196'),
        Color.hex('#6cc08b'),
        Color.hex('#4c9b82'),
        Color.hex('#217a79'),
        Color.hex('#105965'),
        Color.hex('#074050'),
    ]),
    Mint: new Gradient([
        Color.hex('#e4f1e1'),
        Color.hex('#b4d9cc'),
        Color.hex('#89c0b6'),
        Color.hex('#63a6a0'),
        Color.hex('#448c8a'),
        Color.hex('#287274'),
        Color.hex('#0d585f'),
    ]),
    Sunset: new Gradient([
        Color.hex('#f3e79b'),
        Color.hex('#fac484'),
        Color.hex('#f8a07e'),
        Color.hex('#eb7f86'),
        Color.hex('#ce6693'),
        Color.hex('#a059a0'),
        Color.hex('#5c53a5'),
    ]),
    // SunsetDark
    Dusk: new Gradient([
        Color.hex('#fcde9c'),
        Color.hex('#faa476'),
        Color.hex('#f0746e'),
        Color.hex('#e34f6f'),
        Color.hex('#dc3977'),
        Color.hex('#b9257a'),
        Color.hex('#7c1d6f'),
    ]),
    // https://loading.io/color/feature/
    // HCL
    Chroma: new Gradient([
        Color.hex('#e6f972'),
        Color.hex('#6fda97'),
        Color.hex('#38acaf'),
        Color.hex('#617899'),
        Color.hex('#6c4760'),
        Color.hex('#4d2527'),
    ]),
    Spectral: new Gradient([
        Color.hex('#d53e4f'),
        Color.hex('#fc8d59'),
        Color.hex('#fee08b'),
        Color.hex('#e6f598'),
        Color.hex('#99d594'),
        Color.hex('#3288bd'),
    ]),
    Cool: new Gradient([
        Color.hex('#7ff658'),
        Color.hex('#21e499'),
        Color.hex('#2a9fde'),
        Color.hex('#6252c5'),
    ]),
    Warm: new Gradient([
        Color.hex('#c6d63c'),
        Color.hex('#ff803f'),
        Color.hex('#f5468e'),
        Color.hex('#923db3'),
    ]),
    Turquoise: new Gradient([
        Color.hex('#e8f2d1'),
        Color.hex('#b0c7a2'),
        Color.hex('#7aab92'),
        Color.hex('#437f79'),
        Color.hex('#1d5167'),
    ]),
    Purplish: new Gradient([
        Color.hex('#e8faff'),
        Color.hex('#b0d6f9'),
        Color.hex('#708adc'),
        Color.hex('#5a3faa'),
        Color.hex('#420457'),
    ]),
    Dirt: new Gradient([
        Color.hex('#f1d75c'),
        Color.hex('#cfa949'),
        Color.hex('#a97e39'),
        Color.hex('#81572a'),
        Color.hex('#56341b'),
        Color.hex('#2c160a'),
    ]),
    Lime: new Gradient([
        Color.hex('#f3f86e'),
        Color.hex('#a9d066'),
        Color.hex('#6ca55e'),
        Color.hex('#3d7a52'),
        Color.hex('#1b4f3e'),
        Color.hex('#072824'),
    ]),
    Teal: new Gradient([
        Color.hex('#8df9a2'),
        Color.hex('#55c89d'),
        Color.hex('#309d8e'),
        Color.hex('#247074'),
        Color.hex('#204651'),
        Color.hex('#15212b'),
    ]),
    Bee: new Gradient([
        Color.hex('#f8f7de'),
        Color.hex('#f7ea87'),
        Color.hex('#d29d30'),
        Color.hex('#854d0d'),
        Color.hex('#3a200c'),
    ]),
};