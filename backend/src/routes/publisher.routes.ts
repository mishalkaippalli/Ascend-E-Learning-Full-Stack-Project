import { Router } from 'express';

import { publisherController } from '../config/dependencies';
import { validate } from '../middlewares/validate.middleware';
import { publisherSignupSchema } from '../validators/publisher.validator';

const router = Router();

router.post(
  '/signup',
  validate(publisherSignupSchema),
  publisherController.signup.bind(publisherController),
);

export default router;