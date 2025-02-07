import { SMath } from 'smath';
import { FormInput, FormInputOptions } from './FormInput';

export interface NumberInputOptions extends FormInputOptions {
    readonly min?: number;
    readonly max?: number;
    readonly step?: number;
    readonly placeholder?: string;
}

export class NumberInput extends FormInput<NumberInputOptions> {
    constructor(options?: NumberInputOptions) {
        super({ ...options, type: 'number' });
        this.control.setAttribute('placeholder', options?.placeholder ?? '');
        if (typeof options?.min === 'number') {
            this.control.setAttribute('min', options?.min.toFixed())
        }
        if (typeof options?.max === 'number') {
            this.control.setAttribute('max', options?.max.toFixed())
        }
        if (typeof options?.step === 'number') {
            this.control.setAttribute('step', options?.step.toFixed())
        }
    }

    public getValue(): number {
        return SMath.clamp(SMath.round2(+this.control.value, this.options?.step ?? 0), this.options?.min ?? -Infinity, this.options?.max ?? Infinity);
    }
}