import { Router } from "express";

import { authController } from "../config/dependencies";
import { validate } from "../middlewares/validate.middleware";
import { signupSchema } from "../validators/auth.validator";

const router = Router();

router.post(
  "/signup",
  validate(signupSchema),
  authController.signup.bind(authController),
);

export default router;

