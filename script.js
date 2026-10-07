// ============================================
// QuickNotes — script.js
// ============================================

// ---------- Select elements ----------
const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const list = document.querySelector("#notes-list");
const count = document.querySelector("#note-count");
const clearAllBtn = document.querySelector("#clear-all-btn");

// ---------- Constants ----------
const STORAGE_KEY = "quicknotes-app";
const MAX_LENGTH = 200;

// ---------- Data (loaded from localStorage) ----------
let notes = loadNotes();

function loadNotes() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// ---------- Render ----------
function render() {
  const query = searchInput.value.trim().toLowerCase();

  const visible =
    query === ""
      ? notes
      : notes.filter((note) => note.text.toLowerCase().includes(query));

  list.innerHTML = "";

  if (notes.length === 0) {
    const li = document.createElement("li");
    li.classList.add("empty-message");
    li.textContent = "No notes yet. Add one above!";
    list.appendChild(li);
  } else if (visible.length === 0) {
    const li = document.createElement("li");
    li.classList.add("empty-message");
    li.textContent = "No notes match your search.";
    list.appendChild(li);
  } else {
    visible.forEach((note) => {
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
  saveNotes();
  render();
}

// ---------- Delete note ----------
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
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

// ---------- Live search ----------
searchInput.addEventListener("input", render);

// ---------- Clear all (bonus) ----------
clearAllBtn.addEventListener("click", () => {
  if (notes.length === 0) return;
  if (confirm("Delete all notes?")) {
    notes = [];
    saveNotes();
    render();
  }
});

// ---------- Initial render ----------
render();
