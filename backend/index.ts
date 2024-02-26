import { Server, ic } from 'azle';
import cors from "cors";
import express from 'express';
import phrases from './phrases.json'; 

export default Server(() => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    
    app.get('/json', (req, res) => {
        res.json(phrases);
    });

    return app.listen();
});
