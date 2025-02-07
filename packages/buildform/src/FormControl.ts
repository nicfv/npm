/**
 * Options for a generic form input.
 * All of them have default values.
 */
export interface FormControlOptions {
    /**
     * Determine if the label should appear before the control.
     */
    readonly labelFirst?: boolean;
    /**
     * Display a tooltip when the mouse is hovering over the control.
     */
    readonly title?: string;
    /**
     * Set an initial label text. This can be overwritten.
     */
    readonly label?: string;
}
/**
 * Represents a generic form control element.
 */
export abstract class FormControl<T extends keyof HTMLElementTagNameMap> {
    /**
     * A unique serial number for each input.
     */
    private static serial: number;
    /**
     * Parent container for any input.
     */
    private readonly container: HTMLDivElement;
    /**
     * Label for the associated control.
     */
    private readonly label: HTMLLabelElement;
    /**
     * The form control element.
     */
    protected readonly control: HTMLElementTagNameMap[T];
    /**
     * Initialize a new form input.
     * @param control Create a new HTML element to use as the form control element.
     * @param options Data options for this form input.
     */
    constructor(controlType: T, options?: FormControlOptions) {
        FormControl.serial++;
        this.container = document.createElement('div');
        this.label = document.createElement('label');
        this.control = document.createElement(controlType);
        this.container.setAttribute('id', this.getId('container'));
        this.container.setAttribute('title', options?.title ?? '');
        this.label.setAttribute('for', this.getId('control'));
        this.label.setAttribute('id', this.getId('label'));
        this.control.setAttribute('id', this.getId('control'));
        if (options?.labelFirst) {
            this.container.append(this.label);
            this.container.append(this.control);
        } else {
            this.container.append(this.control);
            this.container.append(this.label);
        }
        this.setLabelText(options?.label ?? '');
    }
    /**
     * Get a unique identifier for a form control.
     * @param prefix The prefix before the serial number
     * @returns The unique ID for this control
     */
    private getId(prefix: string): string {
        return prefix + '_' + FormControl.serial;
    }
    /**
     * Set the text of the associated label.
     * @param value The new text value
     */
    public setLabelText(text: string): void {
        this.label.innerText = text;
    }
    /**
     * Get the text of the associated label.
     * @returns The current text value
     */
    public getLabelText(): string {
        return this.label.innerText;
    }
    /**
     * Add an event listener to the control element.
     * @param type The type of event listener
     * @param listener A function to callback every time the event is raised
     */
    public addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: () => void) {
        this.control.addEventListener(type, listener);
    }
    /**
     * Get the parent element to append onto the form.
     * @returns The container `<div>` element
     */
    public getElement(): HTMLDivElement {
        return this.container;
    }
}
