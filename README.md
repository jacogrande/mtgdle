## MTGdle

Speedrun wordle-type game for guessing MTG card names (based on [Lookdle](https://lookdle.com/)).

### Setup

- Make sure you have [Bun](https://bun.sh/) installed.
- Clone the repo and run `bun install` to install dependencies.
- Run `bun run dev` to start the development server.

### Gameplay

- The game will randomly select a card from the [Scryfall API](https://scryfall.com/docs/api/cards/random).
- A low resolution, pixelated version of the card will be displayed on the screen.
- Each guess you make will increase the resolution of the card
- If you guess correctly or run out of guesses, the game will reveal the card.
