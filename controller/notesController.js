import { notesStore } from '../services/notesStore.js';
import Note from '../services/note.js';

export async function getNotesList(req, res) {
  console.log('FILTER: ' + req.query.filter);
  res.json(await notesStore.all(req.query.filter, req.query.sort, req.query.order));
}

export async function getNote(req, res) {
  res.json(await notesStore.get(req.params.id));
}

export async function createNote(req, res) {
  res.json(await notesStore.create(req.body));
}

export async function saveNote(req, res) {
  const id = req.params.id;
  console.log('ID: ' + id);
  res.json(await notesStore.save(id, req.body));
}
// export async function updateNote(req, res) {
//   const note = new Note(
//     req.body._id,
//     req.body.title,
//     req.body.description,
//     req.body.creationDate,
//     req.body.dueDate,
//     req.body.finishDate,
//     req.body.importance,
//   );
//   res.json(await notesStore.add(note));
// }
