/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable import/extensions */
import Note from './note.js';
import httpService from './data/http-service.js';

class NotesService {
  static async getAll(filter = '', sortBy = '', order = '1') {
    const data = await httpService.ajax('GET', `/notes?filter=${filter}&sort=${sortBy}&order=${order}`);
    const notes = data.map((item) => new Note(item._id, item.title, item.description, item.dueDate, item.finishDate, item.importance));
    return notes;
  }

  static async getItem(id) {
    const data = await httpService.ajax('GET', `/notes/${id}`);
    return new Note(data._id, data.title, data.description, data.dueDate, data.finishDate, data.importance);
  }

  static async saveItem(note) {
    const id = note._id;
    delete note._id;
    delete note.createDate;
    if (id === 0) {
      await httpService.ajax('POST', '/notes/', note);
    } else {
      await httpService.ajax('PATCH', `/notes/${id}`, note);
    }
  }

  static async changeFinishDate(id, checked) {
    const note = { finishDate: checked };
    await httpService.ajax('PATCH', `/notes/${id}`, note);
  }
}

export default NotesService;
