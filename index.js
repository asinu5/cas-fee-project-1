import express from 'express';
import methodOverride from 'method-override';
import notesRoutes from './routes/notesRoutes.js';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(notesRoutes);
app.use(express.static('./public'));

const hostname = '127.0.0.1';
const port = 3001;
app.listen(port, hostname, () => { console.log(`Server running at http://${hostname}:${port}/`); });
