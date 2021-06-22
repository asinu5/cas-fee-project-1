import Note from '../services/note.js';

export default class NotesTemplate {
  static list(notes) {
    return notes.reduce((template, note) => `${template}<div class="notes">
    <div class="note-row">
      <div class="note-25">${note.dueDateDisplay()}</div>
      <div class="note-75">
        <div>${note.title}</div>
        <div>${note.importanceDisplay()}</div>
      </div>
    </div>
    <div class="note-row">
      <div class="note-25"><input type="checkbox" id="${note._id}" ${note.finishDateChecked()}>Finished ${note.finishDateDisplay()}</div>
      <div class="note-65">${note.description}</div>
      <div class="note-10"><button id="${note._id}">Edit</button></div>
    </div>
  </div>`, '');
  }

  static item(note) {
    return `<form id="edit-form">
    <div>
      <input type="hidden" value="PUT" name="_method">
      <label for="title">Title</label>
      <input type="text" name="title" id="title" value="${note.title}">
    </div>
    <div>
      <label for="description">Description</label>
      <textarea name="description" id="description">${note.description}</textarea>
    </div>
    <div>
      <label for="importance">Importance</label>
      <input type="text" name="importance" id="importance" value="${note.importance}">
    </div>
    <div>
      <label for="dueDate">Due Date</label>
      <input type="date" name="dueDate" id="dueDate" value="${note.dueDate}">
    </div>
    <div>
      <button id="save-note">Save</button>
    </div>
  </form>`;
  }
}
