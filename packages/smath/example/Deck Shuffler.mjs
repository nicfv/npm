import { SMath } from 'smath';

// Define the suits and values of cards in the deck
const suits = ['clubs', 'diamonds', 'spades', 'hearts'],
    values = ['ace', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king'],
    cards = [];

// Generate the deck of cards
suits.forEach(suit => values.forEach(value => cards.push(value + ' of ' + suit)));

// Shuffle the deck
const shuffled = SMath.shuffle(cards);

// Draw the top 5 cards
for (let i = 0; i < 5; i++) {
    console.log(shuffled[i]);
}