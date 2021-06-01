export default class Note {
  constructor(id, title, description, creationDate, dueDate, finishDate, importance) {
    this.id = id;
    this.title = title || 'unknown';
    this.description = description;
    this.creationDate = creationDate || Date.now();
    this.dueDate = dueDate;
    this.finishDate = finishDate;
    this.importance = importance || 0;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      creationDate: this.creationDate,
      dueDate: this.dueDate,
      finishDate: this.finishDate,
      importance: this.importance,
    };
  }

  static toHumanReadableDate(date) {
    return new Date(date).toDateString();
  }
}
