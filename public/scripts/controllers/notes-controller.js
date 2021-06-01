import notesService from '../services/notes-service.js';
import NotesTemplate from '../views/notes-template.js';

class NotesController {
  constructor() {
    this.createNote = document.getElementById('create-note');
    this.changeStyle = document.getElementById('change-style');
    this.sortByFinishDate = document.getElementById('sort-by-finish-date');
    this.sortByCreationDate = document.getElementById('sort-by-creation-date');
    this.notesContainer = document.getElementById('notes-container');
  }

  showNotes() {
    this.notesContainer.innerHTML = NotesTemplate.list(notesService.notes);
  }

  initEventHandlers() {
    this.createNote.addEventListener('click', (event) => {

    });

    this.changeStyle.addEventListener('click', (event) => {

    });

    this.sortByFinishDate.addEventListener('click', (event) => {
      alert('No Notes');
    });

    this.sortByCreationDate.addEventListener('click', (event) => {

    });

    this.notesContainer.addEventListener('click', (event) => {
      alert(event.target.id);
    });
  }

  initialize() {
    this.initEventHandlers();
    notesService.loadData();
    this.showNotes();
  }
}

new NotesController().initialize();
