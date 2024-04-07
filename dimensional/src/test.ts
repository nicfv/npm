import { Dimension } from './dimension';
import { Unit } from './unit';

const V = new Dimension({});
const speed = new Dimension({ 'time': -1, 'length': -1 })
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