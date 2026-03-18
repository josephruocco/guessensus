# Mouse Cookies

A Chrome extension that injects a tiny mouse hole at the bottom of every page. When you click a likely cookie-consent accept button, it spawns draggable cookie treats. Drag one into the mouse hole and the mouse pops a heart animation, then ducks away for a moment.

## Load it in Chrome

1. Open `chrome://extensions`.
2. Turn on Developer mode.
3. Click Load unpacked.
4. Select this folder: `/Users/josephruocco/guessensus/mouse-cookies`.

## Current behavior

- Watches for clicks on likely cookie-consent accept buttons.
- Spawns one or two draggable cookies near the clicked button.
- Shows a mouse semicircle anchored to the bottom center of the page.
- Feeding the mouse triggers hearts and clears the dragged cookie.
