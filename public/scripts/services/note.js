import { DateTime } from './luxon.js';

export default class Note {
  constructor(_id, title, description, dueDate, finishDate, importance) {
    const maxDate = '9999-01-01';
    this._id = _id;
    this.title = title;
    this.description = description;
    this.dueDate = (dueDate === maxDate) ? '' : dueDate;
    this.finishDate = (finishDate === maxDate) ? '' : finishDate;
    this.importance = importance;
  }

  dueDateDisplay() {
    let dueDate;
    if (this.dueDate === '') {
      dueDate = 'Sometimes in the future';
    } else if (DateTime.fromISO(this.dueDate).isValid === true) {
      const daysDiff = Math.ceil(DateTime.fromISO(this.dueDate).diffNow('days').days);
      switch (daysDiff) {
        case 0:
          dueDate = 'today';
          break;
        case 1:
          dueDate = 'tomorrow';
          break;
        case -1:
          dueDate = 'yesterday';
          break;
        default:
          if (daysDiff > 0) {
            dueDate = `In ${daysDiff} days`;
          } else {
            dueDate = `${Math.abs(daysDiff)} days ago`;
          }
      }
      dueDate = `${dueDate}`;
    } else {
      dueDate = 'date is not valid';
    }

    return dueDate;
  }

  finishDateDisplay() {
    let finishDate;
    if (this.finishDate === '') {
      finishDate = '';
    } else if (DateTime.fromISO(this.finishDate).isValid === true) {
      const daysDiff = Math.abs(Math.ceil(DateTime.fromISO(this.finishDate).diffNow('days').days));
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
    } else {
      finishDate = 'date is not valid';
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

    return '&#9734;'.repeat(maxImportance - this.importance) + '&#9733;'.repeat(this.importance);
  }
}
