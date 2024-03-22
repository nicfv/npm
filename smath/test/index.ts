import { SMath } from '../src/index';
import { xpt } from 'xpt';

xpt.is(SMath.approx(1 + 2, 3), false);