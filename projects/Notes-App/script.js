const noteInput = document.getElementById('note-input');
const addNoteBtn = document.getElementById('add-note-btn');
const notesList = document.getElementById('notes-list');

const NOTES_STORAGE_KEY = 'notes_app_notes';

function loadNotes() {
  const stored = localStorage.getItem(NOTES_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveNotes(notes) {
  localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
}

function renderNotes() {
  const notes = loadNotes();
  notesList.innerHTML = '';

  if (!notes.length) {
    notesList.innerHTML = '<p class="empty-state">No notes yet. Add one above.</p>';
    return;
  }

  notes.forEach((note, index) => {
    const card = document.createElement('article');
    card.className = 'note-card';

    const text = document.createElement('p');
    text.textContent = note;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => removeNote(index));

    card.appendChild(text);
    card.appendChild(deleteBtn);
    notesList.appendChild(card);
  });
}

function addNote() {
  const value = noteInput.value.trim();
  if (!value) return;

  const notes = loadNotes();
  notes.unshift(value);
  saveNotes(notes);
  noteInput.value = '';
  renderNotes();
}

function removeNote(index) {
  const notes = loadNotes();
  notes.splice(index, 1);
  saveNotes(notes);
  renderNotes();
}

addNoteBtn.addEventListener('click', addNote);
noteInput.addEventListener('keydown', event => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    addNote();
  }
});

renderNotes();
