import { Router } from 'express'

import { userController } from '../config/dependencies'
import { authenticateMiddleware,authorizationMiddleware} from '../config/dependencies'
import { UserRole } from '../types/auth.types'

const router = Router()

router.get(
  '/me',
  authenticateMiddleware.execute.bind(authenticateMiddleware),
  userController.getCurrentUser.bind(userController),
)

export default router