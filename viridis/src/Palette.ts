import { Color } from './Color';
import { Gradient } from './Gradient';

/**
 * Contains builtin color palettes.
 * 
 * Credits:
 * - Viridis Color Palette Generator: https://waldyrious.net/viridis-palette-generator/
 * - Loading Colors: https://loading.io/color/feature/
 * - Carto Colors: https://carto.com/carto-colors/
 */
export const Palette = {
    // https://waldyrious.net/viridis-palette-generator/
    Viridis: new Gradient([
        Color.from('#fde725'),
        Color.from('#7ad151'),
        Color.from('#22a884'),
        Color.from('#2a788e'),
        Color.from('#414487'),
        Color.from('#440154'),
    ]),
    Inferno: new Gradient([
        Color.from('#fcffa4'),
        Color.from('#fca50a'),
        Color.from('#dd513a'),
        Color.from('#932667'),
        Color.from('#420a68'),
        Color.from('#000004'),
    ]),
    Magma: new Gradient([
        Color.from('#fcfdbf'),
        Color.from('#fe9f6d'),
        Color.from('#de4968'),
        Color.from('#8c2981'),
        Color.from('#3b0f70'),
        Color.from('#000004'),
    ]),
    Plasma: new Gradient([
        Color.from('#f0f921'),
        Color.from('#fca636'),
        Color.from('#e16462'),
        Color.from('#b12a90'),
        Color.from('#6a00a8'),
        Color.from('#0d0887'),
    ]),
    // https://carto.com/carto-colors/
    Grayscale: new Gradient([
        Color.from('#f7f7f7'),
        Color.from('#252525'),
    ]),
    // BluYl
    Parula: new Gradient([
        Color.from('#f7feae'),
        Color.from('#b7e6a5'),
        Color.from('#7ccba2'),
        Color.from('#46aea0'),
        Color.from('#089099'),
        Color.from('#00718b'),
        Color.from('#045275'),
    ]),
    Emerald: new Gradient([
        Color.from('#d3f2a3'),
        Color.from('#97e196'),
        Color.from('#6cc08b'),
        Color.from('#4c9b82'),
        Color.from('#217a79'),
        Color.from('#105965'),
        Color.from('#074050'),
    ]),
    Mint: new Gradient([
        Color.from('#e4f1e1'),
        Color.from('#b4d9cc'),
        Color.from('#89c0b6'),
        Color.from('#63a6a0'),
        Color.from('#448c8a'),
        Color.from('#287274'),
        Color.from('#0d585f'),
    ]),
    Sunset: new Gradient([
        Color.from('#f3e79b'),
        Color.from('#fac484'),
        Color.from('#f8a07e'),
        Color.from('#eb7f86'),
        Color.from('#ce6693'),
        Color.from('#a059a0'),
        Color.from('#5c53a5'),
    ]),
    // SunsetDark
    Dusk: new Gradient([
        Color.from('#fcde9c'),
        Color.from('#faa476'),
        Color.from('#f0746e'),
        Color.from('#e34f6f'),
        Color.from('#dc3977'),
        Color.from('#b9257a'),
        Color.from('#7c1d6f'),
    ]),
    // https://loading.io/color/feature/
    // HCL
    Chroma: new Gradient([
        Color.from('#e6f972'),
        Color.from('#6fda97'),
        Color.from('#38acaf'),
        Color.from('#617899'),
        Color.from('#6c4760'),
        Color.from('#4d2527'),
    ]),
    Spectral: new Gradient([
        Color.from('#d53e4f'),
        Color.from('#fc8d59'),
        Color.from('#fee08b'),
        Color.from('#e6f598'),
        Color.from('#99d594'),
        Color.from('#3288bd'),
    ]),
    Cool: new Gradient([
        Color.from('#7ff658'),
        Color.from('#21e499'),
        Color.from('#2a9fde'),
        Color.from('#6252c5'),
    ]),
    Warm: new Gradient([
        Color.from('#c6d63c'),
        Color.from('#ff803f'),
        Color.from('#f5468e'),
        Color.from('#923db3'),
    ]),
    Turquoise: new Gradient([
        Color.from('#e8f2d1'),
        Color.from('#b0c7a2'),
        Color.from('#7aab92'),
        Color.from('#437f79'),
        Color.from('#1d5167'),
    ]),
    Purplish: new Gradient([
        Color.from('#e8faff'),
        Color.from('#b0d6f9'),
        Color.from('#708adc'),
        Color.from('#5a3faa'),
        Color.from('#420457'),
    ]),
    Dirt: new Gradient([
        Color.from('#f1d75c'),
        Color.from('#cfa949'),
        Color.from('#a97e39'),
        Color.from('#81572a'),
        Color.from('#56341b'),
        Color.from('#2c160a'),
    ]),
    Lime: new Gradient([
        Color.from('#f3f86e'),
        Color.from('#a9d066'),
        Color.from('#6ca55e'),
        Color.from('#3d7a52'),
        Color.from('#1b4f3e'),
        Color.from('#072824'),
    ]),
    Teal: new Gradient([
        Color.from('#8df9a2'),
        Color.from('#55c89d'),
        Color.from('#309d8e'),
        Color.from('#247074'),
        Color.from('#204651'),
        Color.from('#15212b'),
    ]),
    Bee: new Gradient([
        Color.from('#f8f7de'),
        Color.from('#f7ea87'),
        Color.from('#d29d30'),
        Color.from('#854d0d'),
        Color.from('#3a200c'),
    ]),
};