export default class Note {
  constructor(_id, title, description, dueDate, finishDate, importance) {
    this._id = _id || 0;
    this.title = title || '';
    this.description = description || '';
    this.dueDate = dueDate || '';
    this.finishDate = finishDate || '';
    this.importance = importance || '1';
  }

  toJSON() {
    return {
      _id: this._id,
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
      finishDate: this.finishDate,
      importance: this.importance,
    };
  }

  static toHumanReadableDate(date) {
    return new Date(date).toDateString();
  }

  creationDateToHuman() {
    return new Date(this.creationDate).toDateString();
  }
}
