/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import NotesService from '../services/notes-service.js';
import NotesTemplate from '../views/notes-template.js';
import Note from '../services/note.js';

class IndexController {
  constructor() {
    // Navigation elements section
    this.createNote = document.getElementById('create-note');
    this.changeStyle = document.getElementById('change-style');
    this.sortByDueDate = document.getElementById('sort-by-due-date');
    this.sortByCreationDate = document.getElementById('sort-by-creation-date');
    this.sortByImportance = document.getElementById('sort-by-importance');
    this.showFinishedTasks = document.getElementById('show-finished-tasks');
    this.navContainer = document.getElementById('nav-container');

    // Notes display section
    this.notesContainer = document.getElementById('notes-container');

    // Editor section
    this.editContainer = document.getElementById('edit-container');
    this._id = document.getElementById('_id');
    this.title = document.getElementById('title');
    this.description = document.getElementById('description');
    this.importance = document.getElementById('importance');
    this.dueDate = document.getElementById('due-date');
    this.saveNote = document.getElementById('save-note');
    this.cancelNote = document.getElementById('cancel-note');

    // Filter and sorting states
    this.importanceOrder = -1;
    this.dueDateOrder = -1;
    this.finishDateOrder = -1;
    this.creationDateOrder = -1;

    this.additionalStyles = document.getElementById('additional-styles');
  }

  async showNotes(filter, sort = 'dueDate', order = -1) {
    const notes = await NotesService.getAll(filter, sort, order);
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
        this.additionalStyles.setAttribute('href', 'styles/color.css');
      } else {
        this.additionalStyles.setAttribute('href', 'styles/black-and-white.css');
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
        const note = await NotesService.getItem(noteId);
        this._id.value = note._id;
        this.title.value = note.title;
        this.description.value = note.description;
        this.importance.value = note.importance;
        this.dueDate.value = note.dueDate;

        this.setView('edit');
      } else if (event.target.type === 'checkbox') {
        await NotesService.changeFinishDate(noteId, event.target.checked);

        this.showNotes();
      }
    });

    this.saveNote.addEventListener('click', async (event) => {
      event.preventDefault();
      this.setView('list');

      // eslint-disable-next-line max-len
      const note = new Note(this._id.value || 0, this.title.value, this.description.value, this.dueDate.value, null, this.importance.value);
      delete note.finishDate;
      await NotesService.saveItem(note);

      this.showNotes();
    });

    this.cancelNote.addEventListener('click', (event) => {
      event.preventDefault();
      this.setView('list');
    });
  }

  setView(view = 'list') {
    let listRelatedComponents;
    let editorRelatedComponents;

    if (view === 'list') {
      listRelatedComponents = 'block';
      editorRelatedComponents = 'none';
    } else {
      listRelatedComponents = 'none';
      editorRelatedComponents = 'block';
    }
    this.navContainer.style.display = listRelatedComponents;
    this.notesContainer.style.display = listRelatedComponents;
    this.editContainer.style.display = editorRelatedComponents;
  }

  initialize() {
    this.initEventHandlers();
    this.setView('list');
    this.showNotes();
  }
}

new IndexController().initialize();
