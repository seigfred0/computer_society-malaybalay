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

const createStudent = async (userData) => {
    try {
        const collection = await connect('attendance');
        const result = await collection.updateOne(
            { uid: "attendance"},
            {
                $push: {
                    students: userData
                }
            }
        )
        
        if (result) {
            return result
        }
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


// Not sure if we should allow students to update, since this will just be for registering for the event.
// const updateStudent = async () => {
//     try {
        
//     } catch (error) {
        
//     }
// }

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

const validate = async (studentData) => {
    try {
        const collection = await connect('attendance');
        const { master_list } = await collection.findOne(
            { uid: "attendance"},
            { projection: {
                master_list: 1,
                _id: 0
            }}
        );

        const { students } = await collection.findOne(
            { uid: "attendance"},
            { projection: {
                students: 1,
                _id: 0
            }}
        )

        // check if the user is in the master list
        const result = master_list.find((student) => {
            return student.name === studentData.name && student.year === studentData.year
        })

        const existing = students.find((student) => {
            return student.name === studentData.name
        })

        // console.log("6666666666666666666", existing)
        
        if (result && !existing) {
            return true
        }
        return false
    } catch (error) {
        console.log('Error in master list:', error);
        throw new Error('Failed to get master list');
    }
}


export default {
    validate,
    fetchStudent,
    getAllStudents,
    deleteStudent,
    createStudent
}

