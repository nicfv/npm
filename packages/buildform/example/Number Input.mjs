import { NumberInput } from 'buildform';

// Define a new NumberInput element.
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

// Append this onto the HTML parent element.
numberInput.getElement();