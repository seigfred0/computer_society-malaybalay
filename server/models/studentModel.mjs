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

const createStudent = async (userData) => {
    try {
        const collection = await connect('attendance');

        const studentData = {
            name: userData.name,
            year: userData.year
        };

        const result = await collection.updateOne(
            { uid: "attendance"},
            {
                $push: {
                    students: userData,
                    master_list: studentData
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


// Checking
const checkStudent = async (studentData) => {
    try {
        const collection = await connect('attendance');
        const { master_list } = await collection.findOne(
            { uid: "attendance"},
            { projection: {
                master_list: 1,
                _id: 0
            }}
        );

        const result = master_list.find((student) => {
            return student.name === studentData.name && student.year === studentData.year
        })
        
        if (result) {
            return true
        }
        return false
    } catch (error) {
        console.log('Error in master list:', error);
        throw new Error('Failed to get master list');
    }
}


export default {
    fetchStudent,
    getAllStudents,
    updateStudent,
    deleteStudent,
    createStudent,
    checkStudent
}

