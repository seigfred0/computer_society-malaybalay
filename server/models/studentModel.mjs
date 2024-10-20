import { connect, disconnect } from "../utils/dbUtils.mjs";

const fetchStudent = async (studentId) => {
    try {
        const collection = await connect('attendance');
        const result = await collection.findOne(
            { uid: "attendance"},
            { projection: {
                students: 1,
                _id: 0
            }}
        );

        if (result && result.students) {
            const foundStudent = result.students.find(student => student.uid === studentId)
            return foundStudent
        }
        return null;
    } catch (error) {
        console.log(error)
        throw error
    } 
}

const getAllStudents = async () => {
    try {
        const collection = await connect('attendance');
        const result = await collection.findOne(
            { uid: "attendance"},
            {
                projection: {
                    students: 1,
                    _id: 0
                }
            }
        );
        return result.students ? result.students : null;
    } catch (error) {
        console.log('Error getting all students:', error);
        throw new Error('Failed to fetch students');
    }
}


const updateStudent = async () => {
    try {
        
    } catch (error) {
        
    }
}

const deleteStudent = async (studentId) => {
    try {
        const collection = await connect('attendance');
        const result = collection.updateOne(
            { uid: 'attendance'},
            {
                $pull: {
                    students: { uid: studentId }
                }
            }
        )
        
        return result;
    } catch (error) {
        console.log('Error deleting:', error);
        throw new Error('Failed to delete student');
    }
}


export default {
    fetchStudent,
    getAllStudents,
    updateStudent,
    deleteStudent
}

