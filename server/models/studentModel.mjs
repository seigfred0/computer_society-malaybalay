import { connect } from "../utils/dbUtils.mjs";

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

const createStudent = async () => {
    try {
        // sample data
        // const userData = {
        //     name: 'yees',
        //     year: '1Y',
        //     uid: 'random12312321'
        // }
        // end of sample data


        const collection = await connect('attendance');
        const result = await collection.updateOne(
            { uid: "attendance"},
            {
                $push: {
                    students: userData
                }
            }
        )

        console.log(result)
        
    } catch (error) {
        console.log('Error creating students:', error);
        throw new Error('Failed to create students');
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
    deleteStudent,
    createStudent
}

