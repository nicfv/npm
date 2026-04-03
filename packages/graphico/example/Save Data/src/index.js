import { Canvas } from 'graphico';

class Text {
    #text;
    #x;
    #y;
    #size;
    #color;
    #align;
    #baseline;
    constructor(x = 0, y = 0, size = 12, color = 'black', align = 'center', baseline = 'middle') {
        this.#x = x;
        this.#y = y;
        this.#size = size;
        this.#color = color;
        this.#align = align;
        this.#baseline = baseline;
    }
    setText(text = '') {
        this.#text = text;
    }
    draw(graphics) {
        graphics.fillStyle = this.#color;
        graphics.font = `bold ${this.#size}px monospace`;
        graphics.textAlign = this.#align;
        graphics.textBaseline = this.#baseline;
        this.#text.split('\n').forEach((line, num) => {
            graphics.fillText(line, this.#x, this.#y + num * this.#size * 1.5);
        });
    }
}

// Define the signed-in user and their data
let user = 'none';
let data = {};

// Create text elements
const profile = new Text(10, 10, 24, 'black', 'left', 'top');
const action = new Text(10, 50, 20, 'gray', 'left', 'top');
const instruct = new Text(10, 100, 20, 'orange', 'left', 'top');
const raw = new Text(300, 350);

// Set static text for action and instructions
action.setText('No action taken');
instruct.setText(`Instructions:
1-9 = Load user profile.
0 = Log out.
s = Save data.
x = Clear data for current profile.
<any key> = Count # of times pressed.`);

const canv = new Canvas({
    border: 'black',
    borderBlur: 'lightgray',
    width: 600,
    height: 400,
    keydown(key) {
        if (/[1-9]/.test(key)) {
            // Pull up a user's profile
            user = `user${key}`;
            data = canv.loadData(user) ?? {}; // loadData may be undefined, so default to empty object
            action.setText(`Loaded data for ${user}!`);
        } else if (key === '0') {
            // Log out of the current user
            user = 'none';
            data = {};
            action.setText('Logged out.');
        } else if (key === 's' && user !== 'none') {
            // Save user data
            canv.saveData(data, user);
            action.setText(`Saved data for ${user}!`);
        } else if (key === 'x') {
            // Clear user data
            data = {};
            canv.clearData(user);
            action.setText('Cleared all data.');
        } else if (user !== 'none') {
            // Count up the number of times pressed
            if (typeof data[key] === 'number') {
                data[key]++;
            } else {
                data[key] = 1;
            }
            action.setText(`Pressed key: ${key}. Total = ${data[key]}`);
        }
    },
    loop(dt) {
        profile.setText(`Current profile: ${user}.`);
        raw.setText(JSON.stringify(data));
        canv.clear();
        canv.draw(profile);
        canv.draw(action);
        canv.draw(instruct);
        canv.draw(raw);
    },
});
