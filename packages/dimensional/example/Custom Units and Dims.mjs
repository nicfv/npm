import { Dimension, dimensions, Prefix, prefixes, Quantity, Unit, units } from 'dimensional';

// Create a new dimension representing digital storage
// and use a bolded Greek letter "beta" as its symbol
const digitalData = new Dimension('\\boldsymbol{\\beta}');

// We can also create derived dimensions
const transferRate = digitalData.over(dimensions.Time);

// Create a "base" unit for this dimension, in
// which all other units are derived from
const byte = new Unit('B', digitalData);

// Create a new "relative" unit using a
// conversion factor (1/8) of our base unit
const bit = new Unit('b', byte, 1 / 8);

// We can also create units from compounds of other units
const bitsPerSec = new Unit('bps', bit.over(units.second));

// Create entirely new prefixes with their
// corresponding magnitude conversion factors
const kibi = new Prefix('Ki', 2 ** 10),
    mebi = new Prefix('Mi', 2 ** 20),
    gibi = new Prefix('Gi', 2 ** 30),
    tebi = new Prefix('Ti', 2 ** 40);

// We can now create prefixed units
const kibibyte = byte.prefix(kibi),
    mebibyte = byte.prefix(mebi),
    gibibyte = byte.prefix(gibi),
    tebibyte = byte.prefix(tebi);

// The default prefixes are always accessible
const kbps = bitsPerSec.prefix(prefixes.kilo),
    mbps = bitsPerSec.prefix(prefixes.mega),
    gbps = bitsPerSec.prefix(prefixes.giga),
    tbps = bitsPerSec.prefix(prefixes.tera);

// Solve the problem from the example
const file_size = new Quantity(2.38, gibibyte)
    .plus(new Quantity(1.75, mebibyte));
const download_time = new Quantity(2, units.minute)
    .plus(new Quantity(30, units.second));
console.log(file_size.toString() + ' \\div ' + download_time.toString());

// We can determine the resultant dimensions
const resultant_dims = file_size.units.dimensions
    .over(download_time.units.dimensions);
console.log(resultant_dims.toString());

// Also, we can verify that it matches our
// transfer rate dimension from above
console.log('Matches transfer rate? ', resultant_dims.is(transferRate));

// Perform the simple math equation
const download_speed = file_size.over(download_time);
console.log(download_speed.toString());

// While technically accurate, the units on
// this quantity are useless. Let's convert to
// a unit more widely used in data transmission
const download_speed_mbps = download_speed.as(mbps);
console.log(download_speed_mbps.toString());