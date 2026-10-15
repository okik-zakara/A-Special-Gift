# Valentine Doors

Two arched doors swing open, a gift pops out, and tapping it reveals a fixed letter.

## Files

- `index.html` – the page structure (doors, gift, letter)
- `style.css` – all colors, layout and animation
- `script.js` – the open/pop/unwrap sequence, the heart burst, and the floating background hearts

Keep the three files in the same folder.

## Run it

Open `index.html` in a browser, or in VS Code use the Live Server extension (right-click `index.html`, then "Open with Live Server").

The fonts (Bodoni Moda, Jost, Pinyon Script) load from Google Fonts, so you need an internet connection to see them. Offline, the page falls back to Georgia, Arial and a cursive font.

## Change the letter

The letter is fixed, with no editing on the page. To change its words, open `index.html` and edit the text inside the `letter` section:

- the name after "To" (currently `my Valentine`)
- the message in `<p class="letter-body">` (currently `You make ordinary days...`)
- the sign-off name in `<span class="sig">` (currently `Someone who adores you`)

## Other tweaks

- Colors are the variables at the top of `style.css` (`--rose`, `--gold`, `--wine`, `--violet`, and so on).
- Door timing is the `1.5s` in `.door` in `style.css`. If you change it, also change the `1500` in the doors click handler in `script.js`.
