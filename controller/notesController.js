import { notesStore } from '../services/notesStore.js';

export async function getNotesList(req, res) {
  res.json(await notesStore.all(req.query.filter, req.query.sort, req.query.order));
}

export async function getNote(req, res) {
  res.json(await notesStore.get(req.params.id));
}

export async function createNote(req, res) {
  res.json(await notesStore.create(req.body));
}

export async function saveNote(req, res) {
  const { id } = req.params;
  res.json(await notesStore.save(id, req.body));
}
