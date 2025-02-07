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
function showValue() {
    document.getElementById('selectedAge').textContent = 'Age is ' + numberInput.getValue();
}

// Attach the event listener.
numberInput.addEventListener('input', showValue);

// Append this onto the HTML parent element.
window.addEventListener('load', () => {
    document.body.append(numberInput.getElement());
});