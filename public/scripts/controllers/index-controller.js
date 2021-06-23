import notesService from '../services/notes-service.js';
import NotesTemplate from '../views/notes-template.js';
import Note from '../services/note.js';

class IndexController {
  constructor() {
    this.createNote = document.getElementById('create-note');
    this.changeStyle = document.getElementById('change-style');
    this.sortByFinishDate = document.getElementById('sort-by-finish-date');
    this.sortByCreationDate = document.getElementById('sort-by-creation-date');
    this.sortByImportance = document.getElementById('sort-by-importance');
    this.showFinishedTasks = document.getElementById('show-finished-tasks');
    this.notesContainer = document.getElementById('notes-container');
    this.editContainer = document.getElementById('edit-container');
    this.navContainer = document.getElementById('nav-container');
    this._id = document.getElementById('_id');
    this.title = document.getElementById('title');
    this.description = document.getElementById('description');
    this.importance = document.getElementById('importance');
    this.dueDate = document.getElementById('due-date');
    this.saveNote = document.getElementById('save-note');
    this.styling = document.getElementById('styling');
    this.importanceOrder = -1;
    this.finishDateOrder = -1;
    this.creationDateOrder = -1;
  }

  async showNotes(filter, sort = 'dueDate', order = -1) {
    console.log('--STEP 1');
    const notes = await notesService.getAll(filter, sort, order);
    console.log('--STEP 2');
    this.notesContainer.innerHTML = NotesTemplate.list(notes);
    console.log('--STEP 3');
  }

  showEditForm() {
    this.setView('edit');

    this._id.value = '';
    this.title.value = '';
    this.description.value = '';
    this.dueDate.value = '';
    this.importance.value = '';
  }

  initEventHandlers() {
    this.createNote.addEventListener('click', (event) => {
      this.showEditForm();
    });

    this.changeStyle.addEventListener('change', (event) => {
      if (event.target.value === 'color') {
        this.styling.classList.remove('black-and-white');
      } else {
        this.styling.classList.add('black-and-white');
      }
    });

    this.sortByFinishDate.addEventListener('click', (event) => {
      this.showNotes('', 'finishDate', this.finishDateOrder);
      this.finishDateOrder *= -1;
    });

    this.sortByImportance.addEventListener('click', (event) => {
      this.showNotes('', 'importance', this.importanceOrder);
      this.importanceOrder *= -1;
    });

    this.sortByCreationDate.addEventListener('click', (event) => {
      this.showNotes('', 'creationDate', this.creationDateOrder);
      this.creationDateOrder *= -1;
    });

    this.showFinishedTasks.addEventListener('click', (event) => {
      this.showNotes('finished', 'finishDate', this.finishDateOrder);
      this.finishDateOrder *= -1;
    });

    this.notesContainer.addEventListener('click', async (event) => {
      const noteId = event.target.id;
      if (event.target.type === 'submit') {
        const note = await notesService.getItem(noteId);
        this._id.value = note._id;
        this.title.value = note.title;
        this.description.value = note.description;
        this.importance.value = note.importance;
        this.dueDate.value = note.dueDate;

        this.setView('edit');
      } else if (event.target.type === 'checkbox') {
        await notesService.changeFinishDate(noteId, event.target.checked);

        this.showNotes();
      }
    });

    this.saveNote.addEventListener('click', async (event) => {
      event.preventDefault();
      this.setView('list');

      const note = new Note(this._id.value || 0, this.title.value, this.description.value, this.dueDate.value, null, this.importance.value);

      await notesService.saveItem(note);

      this.showNotes();
    });
  }

  setView(view = 'list') {
    let listRelatedComponents;
    let editRelatedComponents;

    if (view === 'list') {
      listRelatedComponents = 'block';
      editRelatedComponents = 'none';
    } else {
      listRelatedComponents = 'none';
      editRelatedComponents = 'block';
    }
    this.navContainer.style.display = listRelatedComponents;
    this.notesContainer.style.display = listRelatedComponents;
    this.editContainer.style.display = editRelatedComponents;
  }

  initialize() {
    this.initEventHandlers();
    this.changeStyle.value = 'color';
    this.setView('list');
    this.showNotes();
  }
}

new IndexController().initialize();
