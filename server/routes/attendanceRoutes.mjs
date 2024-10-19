import express from 'express';
import studentController from '../controllers/studentController.mjs'
const router = express.Router();


router.route('/users')
    .get()
    .post(studentController.addStudent)
    .put()
    .delete()


export default router;