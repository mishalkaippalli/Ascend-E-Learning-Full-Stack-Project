import { Router } from "express";

import { authController } from "../config/dependencies";
import { validate } from "../middlewares/validate.middleware";
import { 
  signupSchema,
  verifyOtpSchema,
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

export default router;

