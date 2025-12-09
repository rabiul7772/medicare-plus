'use server';

import { ID, Query } from 'node-appwrite';
import { users } from '../appwrite.config';

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create({
      userId: ID.unique(),
      email: user.email,
      phone: user.phone,
      password: undefined,
      name: user.name
    });
    return newUser;
  } catch (error: any) {
    if (error && error?.code === 409) {
      const existingUser = await users.list({
        queries: [Query.equal('email', user.email)]
      });

      return existingUser.users[0] || existingUser;
    }
    throw error;
  }
};
