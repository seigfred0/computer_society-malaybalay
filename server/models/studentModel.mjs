import { connect, disconnect } from "../utils/dbUtils.mjs";


const newStudent = {
    id: '111',
    name: 'seigfreda',
    year: '1st year',
    paid: false,
    qr_code: '120sdfjslddjl390'
}

const addStudent = async () => {
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



export {
    addStudent
}