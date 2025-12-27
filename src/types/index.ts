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
  email: string;
  phone: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  shopId: string;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  READY = 'READY',
  PICKED_UP = 'PICKED_UP',
  CANCELLED = 'CANCELLED'
}

export interface Order {
  id: string;
  shopId: string;
  shopName: string;
  items: CartItem[];
  total: number;
  starsEarned: number;
  status: OrderStatus;
  createdAt: Date;
  qrCode: string;
}

export enum NotificationType {
  LOTTERY_WIN = 'LOTTERY_WIN',
  LOTTERY_REMINDER = 'LOTTERY_REMINDER',
  ORDER_UPDATE = 'ORDER_UPDATE',
  PROMOTION = 'PROMOTION'
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

export interface LotteryParticipation {
  id: string;
  lotteryId: string;
  shopId: string;
  shopName: string;
  prizeProduct: Product;
  participatedAt: Date;
  won: boolean;
}
