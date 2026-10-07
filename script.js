// ============================================
// QuickNotes — script.js
// ============================================

// ---------- Select elements ----------
const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const list = document.querySelector("#notes-list");

// ---------- Data ----------
let notes = [];

// ---------- Render ----------
function render() {
  list.innerHTML = "";

  notes.forEach((note) => {
    const li = document.createElement("li");
    li.classList.add("note", `category-${note.category}`);

    const text = document.createElement("p");
    text.classList.add("note-text");
    text.textContent = note.text;

    const meta = document.createElement("p");
    meta.classList.add("note-meta");

    const catLabel = document.createElement("span");
    catLabel.classList.add("note-category");
    catLabel.textContent = note.category;

    const date = document.createElement("span");
    date.classList.add("note-date");
    date.textContent = note.createdAt;

    meta.appendChild(catLabel);
    meta.appendChild(date);

    const del = document.createElement("button");
    del.type = "button";
    del.classList.add("delete-btn");
    del.textContent = "Delete";

    li.appendChild(text);
    li.appendChild(meta);
    li.appendChild(del);
    list.appendChild(li);
  });
}

// ---------- Add note ----------
function addNote(text, category) {
  notes.push({
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString(),
  });
  render();
}

// ---------- Form submit ----------
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  addNote(text, categorySelect.value);
  input.value = "";
  input.focus();
});

// ---------- Initial render ----------
render();
