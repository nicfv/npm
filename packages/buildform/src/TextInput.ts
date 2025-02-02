import { FormInput } from './FormInput';

export interface TextOptions {
    readonly title?: string;
    readonly label?: string;
    readonly placeholder?: string;
    readonly maxLength?: number;
}

export class TextInput extends FormInput {
    private readonly inputHandle: HTMLInputElement;
    private value: string = '';
    constructor(options: TextOptions) {
        const input: HTMLInputElement = document.createElement('input'),
            label: HTMLLabelElement = document.createElement('label');
        super([input, label]);
        this.inputHandle = input;
        input.setAttribute('id', this.getId());
        label.setAttribute('for', this.getId());
        input.setAttribute('title', options.title ?? '');
        label.setAttribute('title', options.title ?? '');
        label.textContent = options.label ?? '';
        label.setAttribute('placeholder', options.placeholder ?? '');
        label.setAttribute('maxlength', (options.maxLength ?? 0).toFixed());
        input.addEventListener('input', () => this.value = input.value);
    }

    public setReadonly(readonly: boolean): void {
        if (readonly) {
            this.inputHandle.setAttribute('readonly', 'true');
        } else {
            this.inputHandle.removeAttribute('readonly');
        }
    }

    public setValue(value: string): void {
        this.inputHandle.value = value;
    }

    public getValue(): string {
        return this.value;
    }
}
