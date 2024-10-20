import express from 'express';
import attendanceRoute from './routes/attendanceRoutes.mjs';


// for testing area


// end of testing area


const app = express();

app.use(express.json())


// routes!!!
app.use('/attendance', attendanceRoute)


app.get('/', async (req, res) => {
    // const result = await userModel.deleteStudent('111')
    // console.log(userModel.createStudent())
    res.send('working')
})

app.listen(5000, () => {
    console.log('Server is running on port 5000');
})