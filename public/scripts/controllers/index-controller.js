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
    const notes = await notesService.getAll(filter, sort, order);
    this.notesContainer.innerHTML = NotesTemplate.list(notes);
  }

  showEditForm() {
    // this.editContainer.innerHTML = NotesTemplate.item();
    // this.navContainer.style.display = 'none';

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
      } else if (event.target.type === 'checkbox') {
        console.log('inside checkbox');
        console.log(`CHECKED: ${event.target.checked}`);
        console.log('finishDate');
        await notesService.changeFinishDate(noteId, event.target.checked);

        // this.navContainer.style.display = 'initial';
        this.showNotes();
      }
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
      // console.log('_id: ' + this._id.value);
      // console.log('title: ' + this.title.value);
      // console.log('description: ' + this.description.value);
      // console.log('dueDate: ' + this.dueDate.value);
      // console.log('importance: ' + this.importance.value);
      const note = new Note(this._id.value || 0, this.title.value, this.description.value, this.dueDate.value, null, this.importance.value);
      console.log('SAVE Note');
      console.log(note);
      await notesService.saveItem(note);
    });
  }

  initialize() {
    this.initEventHandlers();
    this.changeStyle.value = 'color';
    // notesService.loadData();
    this.showNotes();
  }
}

new IndexController().initialize();
