import Datastore from 'nedb-promise';
import DateTime from 'luxon';

// import Note from './note.js';

export class NotesStore {
  constructor(db) {
    this.db = db || new Datastore({ filename: './data/notes.db', autoload: true });
  }

  async create(note) {
    Object.defineProperty(note, 'creationDate', { value: Date.now() });
    return this.db.insert(note);
  }

  async save(id, note) {
    console.log(id);
    console.log(note);
    return this.db.update({ _id: id }, { $set: note });
  }
  //   async delete(id) {
  //     await this.db.update({ _id: id }, { $set: { state: 'DELETED' } });
  //     return await this.get(id);
  //   }

  async get(id) {
    return this.db.findOne({ _id: id });
  }

  async all(sortOrder = { title: -1 }) {
    return this.db.cfind({}).sort(sortOrder).exec();
  }
}

export const notesStore = new NotesStore();
