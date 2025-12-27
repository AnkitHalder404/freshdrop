import { collection, doc, getDoc, getDocs, addDoc, updateDoc, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Lottery, LotteryStatus } from '../types';

const COLLECTION = 'lotteries';

export const getLotteriesByShop = async (shopId: string): Promise<Lottery[]> => {
  const q = query(collection(db, COLLECTION), where('shopId', '==', shopId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Lottery));
};

export const getActiveLotteries = async (): Promise<Lottery[]> => {
  const q = query(collection(db, COLLECTION), where('status', '==', LotteryStatus.LIVE));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Lottery));
};

export const createLottery = async (lottery: Omit<Lottery, 'id'>): Promise<string> => {
  const docRef = await addDoc(collection(db, COLLECTION), lottery);
  return docRef.id;
};

export const updateLotteryStatus = async (id: string, status: LotteryStatus): Promise<void> => {
  await updateDoc(doc(db, COLLECTION, id), { status });
};
