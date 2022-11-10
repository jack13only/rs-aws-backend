import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import cors from 'cors';
import fetch from 'node-fetch';

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

app.get('/products', async (req, res, next) => {
  try {
    if (!process.env.products) res.status(502).send('Cannot process request')
    const responce = await fetch(process.env.products || '')
    const data = await responce.json()
    res.status(responce.status).send(data)
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(502).send(err.message);
    }
  }
})

app.get('/products/:id', async (req, res, next) => {
  try {
    if (!process.env.products) res.status(502).send('Cannot process request')
    const responce = await fetch(`${process.env.products || ''}/${req.params.id}`)
    const data = await responce.json();
    res.status(responce.status).send(data)
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(502).send(err.message);
    }
  }
});

app.get('/cart', async (req, res, next) => {
  try {
    if (!process.env.cart) res.status(502).send('Cannot process request')
    const aaa = await fetch(process.env.cart || '')
    const data = await aaa.json()
    res.status(aaa.status).send(data)
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(502).send(err.message);
    }
  }
});

app.get('*', (req, res) => {
  res.status(502).send('Cannot process request')
});

app.listen(port, () => console.log(`Server is listening on port ${port}!`));
