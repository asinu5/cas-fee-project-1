import notesService from '../services/notes-service.js';
import NotesTemplate from '../views/notes-template.js';
import Note from '../services/note.js';

class IndexController {
  constructor() {
    this.createNote = document.getElementById('create-note');
    this.changeStyle = document.getElementById('change-style');
    this.sortByDueDate = document.getElementById('sort-by-due-date');
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
    this.cancelNote = document.getElementById('cancel-note');
    this.styling = document.getElementById('styling');
    this.importanceOrder = -1;
    this.dueDateOrder = -1;
    this.finishDateOrder = -1;
    this.creationDateOrder = -1;
  }

  async showNotes(filter, sort = 'dueDate', order = -1) {
    const notes = await notesService.getAll(filter, sort, order);
    this.notesContainer.innerHTML = NotesTemplate.list(notes);
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
        this.colorCSS.disabled = false;
        this.blackAndWhiteCSS.disabled = true;
      } else {
        this.colorCSS.disabled = true;
        this.blackAndWhiteCSS.disabled = false;
      }
    });

    this.sortByDueDate.addEventListener('click', (event) => {
      this.showNotes('', 'dueDate', this.dueDateOrder);
      this.dueDateOrder *= -1;
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
      delete note.finishDate;
      await notesService.saveItem(note);

      this.showNotes();
    });

    this.cancelNote.addEventListener('click', (event) => {
      event.preventDefault();
      this.setView('list');
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

  getStyleSheets() {
    for (let i = 0; i < document.styleSheets.length; i++) {
      const styleSheet = document.styleSheets[i];
      if (styleSheet.title === 'color') {
        this.colorCSS = styleSheet;
      } else if (styleSheet.title === 'black-and-white') {
        this.blackAndWhiteCSS = styleSheet;
      }
    }
  }

  initialize() {
    this.getStyleSheets();
    this.initEventHandlers();
    this.changeStyle.value = 'color';
    this.setView('list');
    this.showNotes();
  }
}

new IndexController().initialize();
