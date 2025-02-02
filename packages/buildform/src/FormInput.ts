/**
 * Represents a generic form control element.
 */
export abstract class FormInput {
    /**
     * Parent container for any input.
     */
    private readonly element: Element;
    /**
     * A unique serial number for each input.
     */
    private static serial: number;
    /**
     * Initialize a new form input.
     */
    constructor(children: Array<Element>) {
        FormInput.serial++;
        this.element = document.createElement('div');
        children.forEach(child => this.element.append(child));
    }
    /**
     * Get a unique identifier for a form control.
     */
    protected getId(): string {
        return FormInput.toString() + FormInput.serial;
    }
    /**
     * Return the parent element to append onto the form.
     */
    public getElement(): Element {
        return this.element;
    }
}
