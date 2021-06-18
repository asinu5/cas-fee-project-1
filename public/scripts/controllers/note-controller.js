import notesService from '../services/notes-service.js';
import NotesTemplate from '../views/notes-template.js';

class NoteController {
  constructor() {
    this.noteForm = document.getElementById('note-form');
    this.saveNote = document.getElementById('save-note');
  }

  showNote() {
    this.noteForm.innerHTML = NotesTemplate.item(notesService.getItem(1));
  }

  initEventHandlers() {
    // this.saveNote.addEventListener('click', (event) => {

    // });
  }

  initialize() {
    notesService.loadData();
    this.showNote();
    this.initEventHandlers();
  }
}

new NoteController().initialize();
