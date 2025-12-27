import { collection, doc, getDoc, getDocs, addDoc, updateDoc, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Shop } from '../types';

const COLLECTION = 'shops';

export const getShops = async (): Promise<Shop[]> => {
  const snapshot = await getDocs(collection(db, COLLECTION));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Shop));
};

export const getShop = async (id: string): Promise<Shop | null> => {
  const docRef = await getDoc(doc(db, COLLECTION, id));
  if (docRef.exists()) {
    return { id: docRef.id, ...docRef.data() } as Shop;
  }
  return null;
};

export const createShop = async (shop: Omit<Shop, 'id'>): Promise<string> => {
  const docRef = await addDoc(collection(db, COLLECTION), shop);
  return docRef.id;
};

export const updateShop = async (id: string, data: Partial<Shop>): Promise<void> => {
  await updateDoc(doc(db, COLLECTION, id), data);
};

export const getShopsByCategory = async (category: string): Promise<Shop[]> => {
  const q = query(collection(db, COLLECTION), where('category', '==', category));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Shop));
};
