import NotesData from './data/notes-data.js';
import Note from './note.js';

class NotesService {
  constructor() {
    this.notesData = new NotesData();
    this.notes = [];
  }

  loadData() {
    this.notes = this.notesData.getNotes().map((note) => new Note(note.id, note.title));

    if (this.notes.length === 0) { // initial data seed
      this.notes.push(new Note(0, 'Note 1'));
      this.notes.push(new Note(1, 'Note 2'));
      this.save();
    }
  }

  save() {
    this.notesData.update(this.notes.map((note) => note.toJSON()));
  }
}

export default new NotesService();
