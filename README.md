# QuickNotes

A simple, fast note-taking web app that runs entirely in the browser. QuickNotes lets you capture short notes, organise them by category (Personal, Work or Study), search through them, and keep them safe across page refreshes using `localStorage`. It is built with vanilla HTML, CSS and JavaScript — no frameworks, no build step.

## Features

- **Add notes** with a category (Personal, Work, Study)
- **Delete individual notes** with a per-note Delete button
- **Search notes** live as you type — case-insensitive, matches any part of the text
- **Automatic count** — "You have no notes yet.", "You have 1 note." or "You have N notes."
- **Validation** — empty notes and notes over 200 characters show a clear error
- **Persistence** — notes are saved to `localStorage` and restored when you reopen the page
- **Clear all** — one button to wipe every note (with confirmation)
- **Responsive layout** — the form stacks vertically on phones
- **Category colour coding** — each note has a coloured left border and label based on its category

## How to run locally

1. Clone the repository:

   ```bash
   git clone https://github.com/kellywanjiruu/quicknotes-app.git
