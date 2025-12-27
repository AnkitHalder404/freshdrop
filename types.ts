export enum UserRole {
  MERCHANT = 'MERCHANT',
  CUSTOMER = 'CUSTOMER',
  GUEST = 'GUEST'
}

export enum LotteryType {
  STANDARD = 'STANDARD',
  QUIZ = 'QUIZ',
  SCRATCH = 'SCRATCH'
}

export enum LotteryStatus {
  UPCOMING = 'UPCOMING',
  LIVE = 'LIVE',
  DRAWING = 'DRAWING',
  COMPLETED = 'COMPLETED'
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  inventory: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Lottery {
  id: string;
  shopId: string;
  type: LotteryType;
  status: LotteryStatus;
  prizeProduct: Product;
  starCost: number;
  participants: number;
  maxParticipants: number;
  endTime: Date;
  quizData?: QuizQuestion[];
  winnerId?: string;
}

export interface Shop {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  logo: string;
  stars: number; // User's stars at this shop
  lat: number;
  lng: number;
  products: Product[];
  lotteries: Lottery[];
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
  stars: Record<string, number>; // shopId -> stars
}