import { NumberInput } from 'buildform';

const numberInput = new NumberInput({
    label: 'Enter your age:',
    labelFirst: true,
    title: 'Age input',
    placeholder: 'Age',
    min: 13,
    max: 100,
    step: 1,
});

// Define a function to use for the event listener.
function printValue() {
    console.log(numberInput.getValue());
}

// Attach an event listener.
numberInput.addEventListener('input', printValue);

window.addEventListener('load', () => {
    document.body.append(numberInput.getElement());
});

// Append this onto the HTML parent element.
numberInput.getElement();