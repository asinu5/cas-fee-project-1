import Note from '../services/note.js';

export default class NotesTemplate {
  static list(notes) {
    return notes.reduce((template, note) => `${template}<div class="notes">
    <div>${note.dueDateDisplay()} ${note.title} (${note._id}) ${note.importanceDisplay()}</div>
    <div><input type="checkbox" id="${note._id}" ${note.finishDateChecked()}>Finished ${note.finishDateDisplay()} ${note.description}</div>
    <div><button id="${note._id}">Edit</button></div>
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
