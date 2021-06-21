import NotesData from './data/notes-data.js';
import Note from './note.js';
import { DateTime } from "./luxon.js";
import httpService from './data/http-service.js';

class NotesService {
  constructor() {
    this.notesData = new NotesData();
    this.notes = [];
  }

  loadData() {
    this.notes = this.notesData.getNotes().map((note) => new Note(note.id, note.title));

    if (this.notes.length === 0) { // initial data seed
      this.notes.push(new Note(1, 'Note 1'));
      this.notes.push(new Note(2, 'Note 2'));
      this.save();
    }
  }

  async getAll() {
    console.log('GET all');
    return await fetch('/notes/')
      .then((response) => response.json())
      .then((data) => { const notes = data.map((x) => new Note(x._id, x.title, x.description, x.dueDate, x.finishDate, x.importance)); console.log(notes); return notes; });

    // return await httpService.ajax('get', '/notes/', undefined);
  }

  async getItem(id) {
    // return httpService.ajax('get', `/notes/${id}`);
    return await fetch(`/notes/${id}`)
      .then((response) => response.json())
      .then((data) => { const note = new Note(data._id, data.title, data.description, data.dueDate, data.finishDate, data.importance); console.log(note); return note; });
  }

  async saveItem(note) {
    console.log(`idid: ${note._id}`);
    const id = note._id;
    console.log(`ID-Checker: ${id}`);
    delete note._id;
    delete note.createDate;
    console.log(JSON.stringify(note));
    if (id === 0) {
      return await fetch('/notes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      })
        .then((response) => response.json())
        .then((data) => { const note = new Note(data._id, data.title, data.description, data.dueDate, data.finishDate, data.importance); console.log(note); return note; });
    }
    console.log('PATCH');
    return await fetch(`/notes/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    })
      .then((response) => response.json())
      .then((data) => { const note = new Note(data._id, data.title, data.description, data.dueDate, data.finishDate, data.importance); console.log(note); return note; });
  }

  async changeFinishDate(id, checked) {
    const note = { finishDate: checked ? DateTime.now().toISODate() : '' };
    return await fetch(`/notes/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    })
      .then((response) => response.json())
      .then((data) => { const note = new Note(data._id, data.title, data.description, data.dueDate, data.finishDate, data.importance); console.log(note); return note; });
  }

  save() {
    this.notesData.update(this.notes.map((note) => note.toJSON()));
  }
}

export default new NotesService();
