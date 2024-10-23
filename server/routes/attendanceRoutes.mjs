import express from 'express';
import studentCtrl from '../controllers/studentController.mjs'

const router = express.Router();

router.route('/students')
    .get(studentCtrl.getAllStudents)
    .post(studentCtrl.createStudent); // not done

router.route('/students/:studentId')
    .get(studentCtrl.getOneStudent)
    .put(studentCtrl.updateStudent) // not done
    .delete(studentCtrl.deleteStudent); 



// Everything related to QR Codes
router.route('/student/:studentId/qrcode')



// URL param
router.param('studentId', studentCtrl.fetchStudent)

export default router;