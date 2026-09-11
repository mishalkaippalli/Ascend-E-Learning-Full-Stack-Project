import { Router } from "express";

import { authController } from "../config/dependencies";
import { validate } from "../middlewares/validate.middleware";
import { 
  signupSchema,
  verifyOtpSchema,
  resendOtpSchema,
  } from "../validators/auth.validator";

const router = Router();

router.post(
  "/signup",
  validate(signupSchema),
  authController.signup.bind(authController),
);

router.post(
  "/verify-otp",
  validate(verifyOtpSchema),
  authController.verifyEmailOtp.bind(authController),
);

router.post(
  "/resend-otp",
  validate(resendOtpSchema),
  authController.resendEmailOtp.bind(authController),
);

export default router;

