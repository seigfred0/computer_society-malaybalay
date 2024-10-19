import express from 'express';
import attendanceRoute from './routes/attendanceRoutes.mjs';


// for testing area




// end of testing area


const app = express();

app.use('/attendance', attendanceRoute)


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(5000, () => {
    console.log('Server is running on port 5000');
})