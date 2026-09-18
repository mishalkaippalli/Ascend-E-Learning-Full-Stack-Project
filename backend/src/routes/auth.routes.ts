import { Router } from 'express';

import { authController } from '../config/dependencies';
import { validate } from '../middlewares/validate.middleware';
import {
  signupSchema,
  loginSchema,
  verifyOtpSchema,
  resendOtpSchema,
  forgotPasswordSchema,
  verifyResetOtpSchema,
  resetPasswordSchema
} from '../validators/auth.validator';

const router = Router();

router.post(
  '/signup',
  validate(signupSchema),
  authController.signup.bind(authController),
);

router.post(
  '/verify-otp',
  validate(verifyOtpSchema),
  authController.verifyEmailOtp.bind(authController),
);

router.post(
  '/resend-otp',
  validate(resendOtpSchema),
  authController.resendEmailOtp.bind(authController),
);

router.post(
  '/login',
  validate(loginSchema),
  authController.login.bind(authController),
);

router.post(
  '/refresh',
   authController.refresh.bind(authController));

router.post(
  '/logout',
  authController.logout.bind(authController),
);

router.post(
  '/forgot-password',
  validate(forgotPasswordSchema),
  authController.forgotPassword.bind(authController),
);

router.post(
  '/verify-reset-otp',
  validate(verifyResetOtpSchema),
  authController.verifyResetOtp.bind(authController),
);

router.post(
  '/reset-password',
  validate(resetPasswordSchema),
  authController.resetPassword.bind(authController),
);
export default router;
