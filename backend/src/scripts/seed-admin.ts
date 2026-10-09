
import 'dotenv/config';

import mongoose from 'mongoose';

import { connectDB } from '../config/database';
import { UserRepository } from '../repositories/user.repository';
import { Argon2PasswordHasher } from '../services/auth/argon2-password-hasher';
import { UserRole } from '../types/auth.types';

const seedAdmin = async (): Promise<void> => {
  const name = process.env.ADMIN_NAME?.trim();
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!name || !email || !password) {
    throw new Error(
      'ADMIN_NAME, ADMIN_EMAIL, and ADMIN_PASSWORD must be configured',
    );
  }

  const userRepository = new UserRepository();
  const passwordHasher = new Argon2PasswordHasher();

  await connectDB();

  try {
    const existingUser = await userRepository.findByEmail(email);

    if (existingUser) {
      if (existingUser.role === UserRole.ADMIN) {
        console.log('Admin account already exists. No changes made.');
        return;
      }

      throw new Error(
        'This email already belongs to a non-admin account. No changes made.',
      );
    }

    const hashedPassword = await passwordHasher.hash(password);

    await userRepository.create({
      name,
      email,
      password: hashedPassword,
      role: UserRole.ADMIN,
      emailVerified: true,
    });

    console.log(`Admin account created successfully: ${email}`);
  } finally {
    await mongoose.disconnect();
  }
};

seedAdmin().catch((error: unknown) => {
  console.error('Admin seeding failed:', error);
  process.exitCode = 1;
});
