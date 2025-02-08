import { FormControl, FormControlOptions } from './FormControl';
/**
 * Options for a text input control.
 */
export interface TextInputOptions extends FormControlOptions {
    /**
     * The maximum length of the text.
     */
    readonly maxLength: number;
    /**
     * Text that appears in the form control when it has no value set.
     */
    readonly placeholder: string;
}
/**
 * A text input element for an HTML form.
 */
export class TextInput extends FormControl<'input', TextInputOptions> {
    constructor(options?: TextInputOptions) {
        super('input', options);
        this.control.setAttribute('type', 'text');
        this.control.setAttribute('placeholder', options?.placeholder ?? '');
        if (typeof options?.maxLength === 'number') {
            this.control.setAttribute('maxlength', options.maxLength.toFixed());
        }
    }
    /**
     * Set the value of this input.
     * @param value The new value
     */
    public setValue(value: string): void {
        this.control.value = value;
    }
    /**
     * Get the value of this input.
     * @returns The current value
     */
    public getValue(): string {
        return this.control.value;
    }
}
