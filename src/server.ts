import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { routes } from './routes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT, () =>
	console.log(`Server listening on http://localhost:${process.env.PORT}`)
);
