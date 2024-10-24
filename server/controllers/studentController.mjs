import studentModel from '../models/studentModel.mjs';
import { v4 as uuidv4 } from 'uuid';
import qrcode from 'qrcode';

const getAllStudents = async (req, res) => {
    try {
        const result = await studentModel.getAllStudents();
        res.status(200).send(result)
    } catch (error) {
        res.status(500).json({ errorMessage: 'Error getting all students', error})
    }
}

const getOneStudent = async (req, res) => {
    try {
        const result = req.student;
        res.status(200).send(result);
    } catch (error) {
        res.status(500).json({ errorMessage: 'Error getting one student', error})
    }
}


// Controller
// try {

//     1. get data from client (req.body)
//     2. create a uid... from package uuid
//     3. generate QR code (package is qrcode)... use the uid as the data for the qr code
//     4. insert the uid and qr code to the existing data from client
//     5. insert it in the studentModel createStudent


    
//     res.send('createStudent')
// } catch (error) {
//     res.status(500).json({ errorMessage: 'Error creating student', error})
// }

// const createStudent = async (req, res) => {
//     try {
//         const studentData = req.body;
//         const uniqueId = uuidv4();
//         const qrCodeData = await qrcode.toDataURL(uniqueId);

//         studentData.uuid = uniqueId;
//         studentData.qrcode = qrCodeData;

//         const result = await studentModel.createStudent(studentData)

//         console.log(uniqueId);
//         res.send(result)
//     } catch (error) {
//         console.log({ errorMessage: 'Error creating student', error})
//     }

// }

const createStudent = async (req, res) => {
    try {
        const { name, year } = req.body;
        const studentData = {
            name: name.trim().toLowerCase(),
            year
        }

        const validate = await studentModel.validate(studentData);    

        if (validate) {
            const uniqueId = uuidv4(); 
            const qrCodeData = await qrcode.toDataURL(uniqueId);
            studentData.uuid = uniqueId;
            studentData.qrcode = qrCodeData;
            
            const result = await studentModel.createStudent(studentData)
            return res.send(result);
        }
        
        res.status(404).send({ message: 'Your data does not match with ours, are you from STI?' });
    } catch (error) {
        console.log({ errorMessage: 'Error creating student', error})
    }
}

const updateStudent = async (req, res) => {
    try {
        
        res.send('updateStudent')
    } catch (error) {
        res.status(500).json({ errorMessage: 'Error updatin student', error})
    }
}

const deleteStudent = async (req, res) => {
    try {
        const studentId = req.student.uid;
        const result = await studentModel.deleteStudent(studentId);
        console.log(result)
        res.send(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ errorMessage: 'Error deleting student', error})
    }
}



// Middleware
const fetchStudent = async (req, res, next) => {
    try {
        const studentId = req.params.studentId;
        const result = await studentModel.fetchStudent(studentId);
        req.student = result;
        if (!result) {
            return res.status(404).send({ errorMessage: 'Student not found' });
        }
        next();
    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: 'Error fetching student', error})
    }
}

export default {
    getAllStudents,
    fetchStudent,
    getOneStudent,
    createStudent,
    updateStudent,
    deleteStudent
}