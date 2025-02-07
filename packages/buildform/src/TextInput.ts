import { FormInput, FormInputOptions } from './FormInput';

export interface TextOptions extends FormInputOptions {
    readonly placeholder?: string;
    readonly maxLength?: number;
    readonly onInput?: (value: string) => void;
}

export class TextInput extends FormInput<'input'> {
    constructor(options?: TextOptions) {
        super('input', options);
        this.control.setAttribute('type', 'text');
        this.control.setAttribute('maxlength', (options?.maxLength ?? 0).toFixed());
        this.control.setAttribute('placeholder', options?.placeholder ?? '');
        if (options?.onInput) {
            this.control.addEventListener('input', () => options.onInput!(this.getValue()));
        }
    }

    public setReadonly(readonly: boolean): void {
        if (readonly) {
            this.control.setAttribute('readonly', 'true');
        } else {
            this.control.removeAttribute('readonly');
        }
    }

    public setValue(value: string): void {
        this.control.value = value;
    }

    public getValue(): string {
        return this.control.value;
    }
}
