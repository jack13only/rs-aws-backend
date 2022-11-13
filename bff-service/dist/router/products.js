import express from 'express';
import 'dotenv/config';
import fetch from 'node-fetch';
const routerProducts = express.Router();
routerProducts.use((req, res, next) => {
    (!process.env.products || typeof process.env.products !== 'string' || !process.env.products.trim())
        ?
            res.status(502).send('Cannot process request')
        :
            next();
});
routerProducts.get('/', async (req, res) => {
    try {
        const response = await fetch(process.env.products || '');
        const data = await response.json();
        res.status(response.status).send(data);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(502).send(err.message);
        }
    }
});
routerProducts.get('/:id', async (req, res) => {
    try {
        const response = await fetch(`${process.env.products || ''}/${req.params.id}`);
        const data = await response.json();
        res.status(response.status).send(data);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(502).send(err.message);
        }
    }
});
routerProducts.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const response = await fetch(process.env.products || '', {
            method: 'post',
            body: JSON.stringify(req.body),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        res.status(response.status).send(data);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(502).send(err.message);
        }
    }
});
export { routerProducts };
//# sourceMappingURL=products.js.map