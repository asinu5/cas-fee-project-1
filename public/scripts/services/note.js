import { DateTime } from './luxon.js';

export default class Note {
  constructor(_id, title, description, dueDate, finishDate, importance) {
    this._id = _id || 0;
    this.title = title || '';
    this.description = description || '';
    this.dueDate = dueDate || '';
    this.finishDate = finishDate || '';
    this.importance = importance || '1';
    // this.actualDate = DateTime.now().setZone("Europe/Zurich");
  }

  // toJSON() {
  //   return {
  //     _id: this._id,
  //     title: this.title,
  //     description: this.description,
  //     dueDate: this.dueDate,
  //     finishDate: this.finishDate,
  //     importance: this.importance,
  //   };
  // }

  static toHumanReadableDate(date) {
    return new Date(date).toDateString();
  }

  creationDateToHuman() {
    return new Date(this.creationDate).toDateString();
  }

  dueDateDisplay() {
    let dueDate;
    if (this.dueDate === '') {
      dueDate = 'Sometimes in the future';
    } else {
      dueDate = this.dueDate;
    }

    return dueDate;
  }

  finishDateDisplay() {
    let finishDate;
    if (this.finishDate === '') {
      finishDate = '';
    } else {
      const daysDiff = Math.floor(DateTime.fromISO(this.finishDate).diffNow('days').days * -1);
      switch (daysDiff) {
        case 0:
          finishDate = 'today';
          break;
        case 1:
          finishDate = 'yesterday';
          break;
        default:
          finishDate = `${daysDiff} days ago`;
      }
    }

    return finishDate;
  }

  finishDateChecked() {
    let checked;
    if (this.finishDate === '') {
      checked = '';
    } else {
      checked = ' checked';
    }

    return checked;
  }

  importanceDisplay() {
    const maxImportance = 5;

    return '&#9734; '.repeat(maxImportance - this.importance) + '&#9733; '.repeat(this.importance);
  }
}
