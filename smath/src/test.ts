import { SMath } from './index';
import { X } from 'exray';

X.true(SMath.approx(0.1 + 0.2, 0.3));
X.true(SMath.approx(0.3 - 0.1, 0.2));
X.true(SMath.approx(1 + 1e-7, 1));
X.true(SMath.approx(1 - 1e-7, 1));
X.false(SMath.approx(1 + 1e-5, 1));
X.false(SMath.approx(1 - 1e-5, 1));
X.false(SMath.approx(1 + 1e-7, 1, 1e-8));
X.false(SMath.approx(1 - 1e-7, 1, 1e-8));
X.true(SMath.approx(1 + 1e-5, 1, 1e-4));
X.true(SMath.approx(1 - 1e-5, 1, 1e-4));

X.eq(SMath.avg(1), 1);
X.eq(SMath.avg(1, 3), 2);
X.eq(SMath.avg(1, 2, 3), 2);

X.eq(SMath.clamp(4, 2, 6), 4);
X.eq(SMath.clamp(1, 2, 6), 2);
X.eq(SMath.clamp(7, 2, 6), 6);

X.eq(SMath.expand(-1, 4, 8), 0);
X.eq(SMath.expand(0, 4, 8), 4);
X.eq(SMath.expand(0.5, 4, 8), 6);
X.eq(SMath.expand(1, 4, 8), 8);
X.eq(SMath.expand(2, 4, 8), 12);

X.eq(SMath.normalize(8, 10, 12), -1);
X.eq(SMath.normalize(10, 10, 12), 0);
X.eq(SMath.normalize(11, 10, 12), 0.5);
X.eq(SMath.normalize(12, 10, 12), 1);
X.eq(SMath.normalize(14, 10, 12), 2);

X.eq(SMath.translate(20, 0, 100, 32, 212), 68);
X.eq(SMath.translate(-40, 0, 100, 32, 212), -40);
X.eq(SMath.translate(68, 32, 212, 0, 100), 20);
X.eq(SMath.translate(-40, 32, 212, 0, 100), -40);

X.is(SMath.linspace(1, 5, 6).join(), '1,1.8,2.6,3.4,4.2,5');
X.is(SMath.linspace(10, 20, 3).join(), '10,15,20');
X.is(SMath.linspace(3, -3, 5).join(), '3,1.5,0,-1.5,-3');
X.is(SMath.linspace(0, 0, -1).join(), '');

X.gt(SMath.logspace(0, 2, 5)[3], 31.622); // Approx 31.6227766...
X.lt(SMath.logspace(0, 2, 5)[3], 31.623);
X.is(SMath.logspace(2, -2, 5).join(), '100,10,1,0.1,0.01');
X.is(SMath.logspace(0, 0, -1).join(), '');

X.eq(SMath.error(9, 10), -0.1);
X.eq(SMath.error(11, 10), 0.1);
X.eq(SMath.error(-1, 2), -1.5);
X.eq(SMath.error(2.5, 2), 0.25);