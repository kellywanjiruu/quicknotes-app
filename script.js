// ============================================
// QuickNotes — script.js
// ============================================

// ---------- Select elements ----------
const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const list = document.querySelector("#notes-list");
const count = document.querySelector("#note-count");

// ---------- Constants ----------
const MAX_LENGTH = 200;

// ---------- Data ----------
let notes = [];

// ---------- Render ----------
function render() {
  list.innerHTML = "";

  if (notes.length === 0) {
    const li = document.createElement("li");
    li.classList.add("empty-message");
    li.textContent = "No notes yet. Add one above!";
    list.appendChild(li);
  } else {
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
      del.addEventListener("click", () => deleteNote(note.id));

      li.appendChild(text);
      li.appendChild(meta);
      li.appendChild(del);
      list.appendChild(li);
    });
  }

  updateCount();
}

// ---------- Count message ----------
function updateCount() {
  const n = notes.length;
  if (n === 0) {
    count.textContent = "You have no notes yet.";
  } else if (n === 1) {
    count.textContent = "You have 1 note.";
  } else {
    count.textContent = `You have ${n} notes.`;
  }
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

// ---------- Delete note ----------
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  render();
}

// ---------- Form submit ----------
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  if (text.length > MAX_LENGTH) {
    errorMessage.textContent = `Notes must be ${MAX_LENGTH} characters or fewer.`;
    return;
  }

  errorMessage.textContent = "";
  addNote(text, categorySelect.value);
  input.value = "";
  input.focus();
});

// ---------- Initial render ----------
render();
