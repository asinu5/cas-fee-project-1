export default class NotesData {
  constructor() {
    const notes = JSON.parse(localStorage.getItem('notes') || '[ ]');
    this.notes = notes;
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  getNotes() {
    return this.notes;
  }

  update(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
    return this.notes;
  }
}
