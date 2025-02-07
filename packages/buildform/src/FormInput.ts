import { FormControl, FormControlOptions } from './FormControl';

export interface FormInputOptions extends FormControlOptions {
    /**
     * Type of form control
     */
    readonly type?: string;
    /**
     * Name of the form control. Submitted with the form as part of a name/value pair
     */
    readonly name?: string;
    /**
     * Associates the control with a form element
     */
    readonly form?: string;
    /**
     * Whether the form control is disabled
     */
    readonly disabled?: boolean;
}

export abstract class FormInput extends FormControl<'input'> {
    constructor(options?: FormInputOptions) {
        super('input', options);
        this.control.setAttribute('type', options?.type ?? 'text');
        this.control.setAttribute('name', options?.name ?? '');
        this.control.setAttribute('form', options?.form ?? '');
        if (options?.disabled) {
            this.control.setAttribute('disabled', 'true');
        }
    }

    public addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: () => void) {
        this.control.addEventListener(type, listener);
    }

    public setValue(value: string): void {
        this.control.value = value;
    }

    public getValue(): string {
        return this.control.value;
    }
}
