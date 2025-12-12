'use server';

import { CreateUserParams, RegisterUserParams } from '@/types';
import { ID, Query } from 'node-appwrite';
import {
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  storage,
  tables,
  users
} from '../appwrite.config';
import { parseStringify } from '../utils';

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create({
      userId: ID.unique(),
      email: user.email,
      phone: user.phone,
      password: undefined,
      name: user.name
    });
    return parseStringify(newUser);
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

export const getUser = async (userId: string) => {
  try {
    const user = await users.get({ userId: userId });

    return parseStringify(user);
  } catch (error) {
    console.log(error);
  }
};

export const registerPatient = async ({
  identificationDocument,
  ...patientData
}: RegisterUserParams) => {
  try {
    // let inputFile;

    // if (identificationDocument) {
    //   inputFile = InputFile.fromBuffer(
    //     identificationDocument?.get('blobFile') as Blob,
    //     identificationDocument?.get('fileName') as string
    //   );
    // }

    const blob = identificationDocument?.get('blobFile') as Blob;
    const fileName = identificationDocument?.get('fileName') as string;

    if (!blob || !fileName) {
      throw new Error('File or filename missing in payload');
    }

    // Convert Blob to Buffer (Node.js)
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const file = new File([blob], fileName, { type: blob.type });

    const uploadedFile = await storage.createFile({
      bucketId: BUCKET_ID!,
      fileId: ID.unique(),
      file: file
    });

    const newPatient = await tables.createRow({
      databaseId: DATABASE_ID!,
      tableId: PATIENT_COLLECTION_ID!,
      rowId: ID.unique(),
      data: {
        identificationDocumentId: uploadedFile?.$id || null,
        identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${uploadedFile.$id}/view?project=${PROJECT_ID}`,
        ...patientData
      }
    });

    return parseStringify(newPatient);
  } catch (error) {
    console.log(error);
  }
};
