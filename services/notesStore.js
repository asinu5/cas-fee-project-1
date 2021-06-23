import Datastore from 'nedb-promise';
import { DateTime } from 'luxon';

export class NotesStore {
  constructor(db) {
    this.db = db || new Datastore({ filename: './data/notes.db', autoload: true });
  }

  async create(note) {
    note.creationDate = DateTime.now().toISODate();
    console.log(note);
    return this.db.insert(note);
  }

  async save(id, note) {
    return this.db.update({ _id: id }, { $set: note });
  }

  async get(id) {
    return this.db.findOne({ _id: id });
  }

  async all(filter = '', sortBy = '', order = 1) {
    let sortCriteria;
    if (sortBy.length > 0) {
      sortCriteria = { [sortBy]: order, title: 1 };
    }
    const finishedFilter = (filter === 'finished') ? { finishDate: { $gt: '' } } : {};

    return this.db.cfind(finishedFilter).sort(sortCriteria).exec();
  }
}

export const notesStore = new NotesStore();
