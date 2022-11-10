/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = process.env.PORT || '3000';

app.use(cors({
  origin: '*',
}));

app.use(bodyParser.json());

app.use((req, res, next) => {
  const data = `${req.method} ${req.url}`;
  console.log(data);  
  next();
});

app.get('*', (req, res) => {
  res.status(404);
  res.send('Service not found!');
});

app.listen(port, () => console.log(`Server is listening on port ${port}!`));
