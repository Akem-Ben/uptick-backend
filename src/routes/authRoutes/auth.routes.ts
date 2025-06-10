import joiValidations from '../../validations/joi/joi.validations';
import { authControllers } from '../../controllers';
import express from 'express';

const router = express.Router()


router.post('/signup', joiValidations.inputValidator(joiValidations.userRegisterSchemaViaEmail), authControllers.userRestrationController)
router.get('/verify-user/:token', authControllers.veryUserAccountController)
// router.post('/verify-user')
// router.post('/reset-password-request')
// router.patch('/change-password')

export default router