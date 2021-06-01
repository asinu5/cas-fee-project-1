import Note from '../services/note.js';

export default class NotesTemplate {
  static list(notes) {
    return notes.reduce((template, note) => `${template}<div class="notes">
    <span>${note.title} (${note.id})</span><br>
    <span>${Note.toHumanReadableDate(note.creationDate)}</span>
    <button id="${note.id}">Edit</button>
  </div>`, '');
  }

  static item(note) {
    return `<div>${note.title}</div>`;
  }
}
