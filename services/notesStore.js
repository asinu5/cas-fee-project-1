/* eslint-disable no-param-reassign */
import Datastore from 'nedb-promise';
import { DateTime } from 'luxon';

export class NotesStore {
  constructor(db) {
    this.db = db || new Datastore({ filename: './data/notes.db', autoload: true });
  }

  async create(note) {
    note.dueDate = (note.dueDate === '') ? '9999-01-01' : note.dueDate;
    note.finishDate = '9999-01-01';
    note.creationDate = DateTime.now().toISODate();
    note.importance = (note.importance === '') ? '1' : note.importance;

    return this.db.insert(note);
  }

  async save(id, note) {
    if ('dueDate' in note) {
      note.dueDate = (note.dueDate === '') ? '9999-01-01' : note.dueDate;
    }
    if ('finishDate' in note) {
      note.finishDate = (note.finishDate === true) ? DateTime.now().toISODate() : '9999-01-01';
    }

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
    const finishedFilter = (filter === 'finished') ? { finishDate: { $lt: '9999-01-01' } } : {};

    return this.db.cfind(finishedFilter).sort(sortCriteria).exec();
  }
}

export const notesStore = new NotesStore();
