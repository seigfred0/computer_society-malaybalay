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
        console.log(result.students)
    } catch (error) {
        console.log('model error',error)
    }
}





export default {
    addStudent,
    getStudents
}