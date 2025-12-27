import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { User, UserRole } from '../types';

export const getUser = async (uid: string): Promise<User | null> => {
  const userDoc = await getDoc(doc(db, 'users', uid));
  if (userDoc.exists()) {
    return { id: uid, ...userDoc.data() } as User;
  }
  return null;
};

export const createUser = async (userData: Omit<User, 'id'> & { id: string }): Promise<void> => {
  try {
    console.log('userService.createUser called with:', userData);
    // Check if user already exists
    const existingUser = await getUser(userData.id);
    if (existingUser) {
      console.log('User already exists, skipping creation');
      // User already exists, optionally update
      return;
    }
    
    const { id, ...dataWithoutId } = userData;
    console.log('Creating user document with id:', id, 'data:', dataWithoutId);
    await setDoc(doc(db, 'users', id), {
      ...dataWithoutId,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log('User document created successfully');
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (uid: string, data: Partial<User>): Promise<void> => {
  await updateDoc(doc(db, 'users', uid), {
    ...data,
    updatedAt: new Date()
  });
};
