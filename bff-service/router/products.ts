import express from 'express';
import 'dotenv/config';
import fetch from 'node-fetch';

const routerProducts = express.Router()

routerProducts.get('/', async (req, res) => {
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

routerProducts.get('/:id', async (req, res) => {
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

export default routerProducts;