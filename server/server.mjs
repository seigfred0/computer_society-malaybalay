import express from 'express';
import attendanceRoute from './routes/attendanceRoutes.mjs';

const app = express();
app.use(express.json())
app.use('/attendance', attendanceRoute)


app.get('/', async (req, res) => {
    const result = await studentModel.createStudent();
    res.send(result)
})

app.listen(5000, () => {
    console.log('Server is running on port 5000');
})