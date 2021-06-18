import notesService from '../services/notes-service.js';
import NotesTemplate from '../views/notes-template.js';
import Note from '../services/note.js';

class IndexController {
  constructor() {
    this.createNote = document.getElementById('create-note');
    this.changeStyle = document.getElementById('change-style');
    this.sortByFinishDate = document.getElementById('sort-by-finish-date');
    this.sortByCreationDate = document.getElementById('sort-by-creation-date');
    this.notesContainer = document.getElementById('notes-container');
    this.editContainer = document.getElementById('edit-container');
    this.navContainer = document.getElementById('nav-container');
    this._id = document.getElementById('_id');
    this.title = document.getElementById('title');
    this.description = document.getElementById('description');
    this.importance = document.getElementById('impotance');
    this.dueDate = document.getElementById('due-date');
    this.saveNote = document.getElementById('save-note');
  }

  async showNotes() {
    console.log('NOTES');
    const notes = await notesService.getAll();
    this.notesContainer.innerHTML = NotesTemplate.list(notes);
  }

  showEditForm() {
    // this.editContainer.innerHTML = NotesTemplate.item();
    // this.navContainer.style.display = 'none';
    this._id.value = '';
    this.title.value = '';
    this.description.value = '';
    this.dueDate.value = '';
  }

  initEventHandlers() {
    this.createNote.addEventListener('click', (event) => {
      this.showEditForm();
    });

    this.changeStyle.addEventListener('click', (event) => {

    });

    this.sortByFinishDate.addEventListener('click', (event) => {
      alert('No Notes');
    });

    this.sortByCreationDate.addEventListener('click', (event) => {

    });

    this.notesContainer.addEventListener('click', async (event) => {
      const note = await notesService.getItem(event.target.id);
      console.log(note);
      this._id.value = note._id;
      this.title.value = note.title;
      this.description.value = note.description;
      // this.importance.value = note.importance;
      this.dueDate.value = note.dueDate;
      // this.title.value = note.title;
      // this.title.value = note.title;
      // document.getElementById('save-note').addEventListener('click', (event) => {
      //   event.preventDefault();
      //   console.log(document.getElementById('edit-form'));
      // });

      // alert(event.target.id);
    });

    this.saveNote.addEventListener('click', async (event) => {
      event.preventDefault();
      const note = new Note(undefined, this.title.value || '');
      await notesService.saveItem(note);
    });
  }

  initialize() {
    this.initEventHandlers();
    // notesService.loadData();
    this.showNotes();
  }
}

new IndexController().initialize();
