import { connect, disconnect } from "../utils/dbUtils.mjs";


const addStudent = async (newStudent) => {
    try {
        const { collection } = await connect();
        const result = await collection.updateOne(
            { type: "attendance"}, 
            { $push: { students: newStudent } }
        )
        console.log(result);
        
    } catch (error) {
        console.log('model error',error)
    }
}



export default {
    addStudent
}