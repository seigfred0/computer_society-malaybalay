import express from 'express';

// for testing area

import { addStudent } from './models/studentModel.mjs';


// end of testing area

const app = express();



app.get('/', (req, res) => {
    addStudent();
    res.send('Hello World!')
})

app.listen(5000, () => {
    console.log('Server is running on port 5000');
})