import Note from '../services/note.js';

export default class NotesTemplate {
  static list(notes) {
    return notes.reduce((template, note) => `${template}<div class="notes">
    <div class="note-row">
      <div class="row-item-1">${note.dueDateDisplay()}</div>
      <div class="row-item-3 note-row">
        <div class="row-item-3">${note.title}</div>
        <div class="row-item-1"><p class="align-right">${note.importanceDisplay()}</p></div>
      </div>
    </div>
    <div class="note-row">
      <div class="row-item-1"><input type="checkbox" id="${note._id}" ${note.finishDateChecked()}>Finished ${note.finishDateDisplay()}<p/></div>
      <div class="row-item-3 note-row">
        <div class="row-item-3">${note.description}</div>
        <div class="row-item-1"><button id="${note._id}" class="align-right">Edit</button></div>
      </div>
    </div>
  </div>`, '');
  }
}
