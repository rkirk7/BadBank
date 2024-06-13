import express from 'express';
const app = express();
import cors from 'cors';

//used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());