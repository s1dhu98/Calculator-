# Calculator

A simple, responsive calculator web app built with HTML, CSS and JavaScript.

It lives in this folder and works without a server — open `index.html` in your browser to use it.

## Features

- Clickable buttons for digits, decimal point, operators and equals.
- Keyboard input support (digits, ., +, -, *, /, Enter for equals, Backspace to delete, Escape to clear).
- Responsive design: buttons wrap and resize on smaller screens.
- Clean, modern UI with glassy card, gradients and hover/press states.

## Files

- `index.html` — the app markup.
- `styles.css` — visual styling (flexbox layout, gradients, responsive rules).
- `script.js` — calculator logic, click and keyboard handling, expression evaluation.

## How to run

1. Open the project folder in your file explorer.
2. Double-click `index.html`, or open it from your browser (File → Open File...).

No build step or package install required.

## Keyboard shortcuts

- 0–9: type numbers
- `.`: decimal point
- `+ - * /`: operators
- `Enter` (or `=`): evaluate expression
- `Backspace`: delete last character
- `Escape`: clear the current expression

## Notes & Security

The app sanitizes input and uses a simple JS evaluation step for local/demo use. For any production use or where untrusted input is possible, replace the evaluator with a proper expression parser.

## Next steps (optional)

- Add calculation history and copy-to-clipboard.
- Replace evaluator with a parser library for safer evaluation.
- Add tests for the expression evaluator.

---

Created by you — feel free to edit or ask me to add more docs or features.