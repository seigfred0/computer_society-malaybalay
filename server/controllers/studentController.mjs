
import userModel from '../models/studentModel.mjs';



const addStudent = async (req, res) => {
    try {
        const student = req.body;
        const result = await userModel.addStudent(student)
    } catch (error) {
        console.log('controller error', error)
    }
}


export default {
    addStudent
}