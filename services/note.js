import DateTime from 'luxon';

export default class Note {
  constructor(_id, title, description, creationDate, dueDate, finishDate, importance) {
    this._id = _id || '';
    this.title = title || '';
    this.description = description || '';
    this.creationDate =  DateTime.now().toISODate();
    this.dueDate = dueDate || '';
    this.finishDate = finishDate || '';
    this.importance = importance || '1';
  }

  // toJSON() {
  //   return {
  //     _id: this._id,
  //     title: this.title,
  //     description: this.description,
  //     creationDate: this.creationDate,
  //     dueDate: this.dueDate,
  //     finishDate: this.finishDate,
  //     importance: this.importance,
  //   };
  // }

  static toHumanReadableDate(date) {
    return new Date(date).toDateString();
  }
}
