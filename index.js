import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import booksRoute from './routes/booksRoute.js';
import soilRoute from './routes/soilRoutes.js';
import deseaseRoute from './routes/deseaseRoute.js';
import waterRoute from './routes/waterRoute.js';
import remedieRoute from './routes/RemedieRoute.js';
const app = express();

// Middleware for parsing request body
app.use(express.json());
app.use(bodyParser.json());

// Middleware for handling CORS POLICY
//  Option 1: Allow All Origins with Default of cors(*)
 app.use(cors())

// Option 2: Allow Custom Origin
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']
// }));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send();
});

app.use('/books', booksRoute);
app.use('/soil', soilRoute);
app.use('/desease',deseaseRoute);
app.use('/water',waterRoute);
app.use('/remedie',remedieRoute);

mongoose.connect(mongoDBURL).then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
    });
}).catch((error) => {
    console.log(error);
});
