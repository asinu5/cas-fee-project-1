import express from 'express';
import * as notesController from '../controller/notesController.js';

const router = express.Router();

router.get('/notes', notesController.getNotesList);
// router.post('/notes', notesController.saveNote);
router.get('/notes/:id', notesController.getNote);
router.put('/notes', notesController.saveNote);

export default router;
