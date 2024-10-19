import { connect, disconnect } from "../utils/dbUtils.mjs";


const addStudent = async (newStudent) => {
    try {
        const { collection } = await connect();
        const result = await collection.updateOne(
            { type: "attendance"}, 
            { $push: { students: newStudent } }
        )
        await disconnect();
        
    } catch (error) {
        console.log('model error',error)
    }
}

const getStudents = async () => {
    try {
        const { collection } = await connect();
        const result = await collection.findOne({ type: "attendance" })
        return result
    } catch (error) {
        console.log('model error',error)
    }
}


const getSingleStudent = async (studentId) => {
    try {
        const { collection } = await connect();
        const result = await collection.findOne({ type: "attendance" });
     
        const singleStudent = result.students.filter(
            (student) => student.id === studentId
        )

        return singleStudent
    } catch (error) {
        console.log('model error',error)
    }
}

const deleteStudent = async (studentId) => {
    try {
        const { collection } = await connect();
        const result = await collection.findOne({ type: "attendance" });
     
        const singleStudent = result.students.filter(
            (student) => student.id === studentId
        )


        // deleting the student
        const deleteStudent = await collection.updateOne(
            { type: 'attendance' },
            { $pull: { students: {id: studentId }} }
        )

        if (deleteStudent) {
            return 'successful deletion'
        } else {
            return 'did not delete - error '
        }
    } catch (error) {
        console.log('model error',error)
    }
}


/*
  const result = await collection.findOne({
            type: "attendance",
            students: { $elemMatch: { id: studentId } } // Match student with the given ID
        });

        // Check if result exists and return the student if found
        if (result && result.students) {
            return result.students.find(student => student.id === studentId) || null; // Return the student object
        }

*/



export default {
    addStudent,
    getStudents,
    getSingleStudent,
    deleteStudent
}