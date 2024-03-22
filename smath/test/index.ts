import { SMath } from '../src/index';
import { xpt } from 'xpt';

xpt.true(SMath.approx(0.1 + 0.2, 0.3));
xpt.true(SMath.approx(0.3 - 0.1, 0.2));
xpt.true(SMath.approx(1 + 1e-7, 1));
xpt.true(SMath.approx(1 - 1e-7, 1));
xpt.false(SMath.approx(1 + 1e-5, 1));
xpt.false(SMath.approx(1 - 1e-5, 1));

xpt.eq(SMath.avg(1), 1);
xpt.eq(SMath.avg(1, 3), 2);
xpt.eq(SMath.avg(1, 2, 3), 2);

xpt.eq(SMath.clamp(4, 2, 6), 4);
xpt.eq(SMath.clamp(1, 2, 6), 2);
xpt.eq(SMath.clamp(7, 2, 6), 6);

xpt.eq(SMath.expand(-1, 4, 8), 0);
xpt.eq(SMath.expand(0, 4, 8), 4);
xpt.eq(SMath.expand(0.5, 4, 8), 6);
xpt.eq(SMath.expand(1, 4, 8), 8);
xpt.eq(SMath.expand(2, 4, 8), 12);