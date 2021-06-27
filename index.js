/* eslint-disable no-console */
/* eslint-disable import/extensions */
import express from 'express';
import notesRoutes from './routes/notesRoutes.js';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(notesRoutes);
app.use(express.static('./public'));

const hostname = '127.0.0.1';
const port = 3001;
app.listen(port, hostname, () => { console.log(`Server running at http://${hostname}:${port}/`); });
