import express from 'express';
import attendanceRoute from './routes/attendanceRoutes.mjs';


// for testing area


import userModel from './models/studentModel.mjs'

// end of testing area


const app = express();

app.use(express.json())


// routes!!!
app.use('/attendance', attendanceRoute)


app.get('/', async (req, res) => {
    const result = await userModel.deleteStudent('111')
    res.send(result)
})

app.listen(5000, () => {
    console.log('Server is running on port 5000');
})