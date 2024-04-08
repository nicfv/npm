import { Dimension } from './dimension';
import { Quantity } from './quantity';
import { Unit } from './unit';

const V = new Dimension({});
const speed = new Dimension({ 'time': -1, 'length': 1, 'temperature': 0.5 })
console.log(V.toString(), speed.toString(), V.is(speed), V.getExponent('amount'), V.getExponent('time'));

const hz = new Unit({ 'seconds': -1 });
console.log(hz.toString());

class Parent {
    public func(): void {
        console.log('hello!');
    }
}

class Child extends Parent {
    public func(): void {
        super.func();
        console.log('world!');
    }
}

const c = new Child();
c.func();

const q1 = new Quantity(1, new Unit({ 'hours': 2 }));
console.log(q1.toString());
console.log(q1.as(new Unit({ 'minutes': 2 })).toString());

const q2 = new Quantity(60, new Unit({ miles: 1, hours: -1 }));
console.log(q2.toString());
console.log(q2.as(new Unit({ meters: 1, seconds: -1 })).toString());