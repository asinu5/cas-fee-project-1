import { notesStore } from '../services/notesStore.js';
import Note from '../services/note.js';

export async function getNotesList(req, res) {
  res.json(await notesStore.all());
}

export async function getNote(req, res) {
  res.json(await notesStore.get(req.params.id));
}

export async function saveNote(req, res) {
  const note = new Note(
    req.body._id,
    req.body.title,
    req.body.description,
    req.body.creationDate,
    req.body.dueDate,
    req.body.finishDate,
    req.body.importance,
  );
  res.json(await notesStore.add(note));
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
