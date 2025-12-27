import { Shop, LotteryType, LotteryStatus, UserRole, User } from './types';

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Alex Fashionista',
  role: UserRole.CUSTOMER,
  avatar: 'https://picsum.photos/100/100',
  stars: { 's1': 150, 's2': 40 }
};

export const MOCK_SHOPS: Shop[] = [
  {
    id: 's1',
    name: 'Maison de Mode',
    category: 'Luxury Apparel',
    description: 'High-end surplus fashion from last season\'s runway.',
    image: 'https://picsum.photos/800/600?random=1',
    logo: 'https://picsum.photos/100/100?random=10',
    stars: 150,
    lat: 40.7128,
    lng: -74.0060,
    products: [
      { id: 'p1', name: 'Silk Scarf', description: '100% Mulberry Silk', image: 'https://picsum.photos/400/400?random=2', price: 120, inventory: 5 },
      { id: 'p2', name: 'Gold Cufflinks', description: '18k Gold Plated', image: 'https://picsum.photos/400/400?random=3', price: 250, inventory: 2 },
    ],
    lotteries: [
      {
        id: 'l1',
        shopId: 's1',
        type: LotteryType.QUIZ,
        status: LotteryStatus.LIVE,
        prizeProduct: { id: 'p3', name: 'Velvet Clutch', description: 'Midnight Blue', image: 'https://picsum.photos/400/400?random=4', price: 400, inventory: 1 },
        starCost: 50,
        participants: 124,
        maxParticipants: 500,
        endTime: new Date(Date.now() + 86400000), // 24h
        quizData: [
          { id: 'q1', question: 'What year was Maison established?', options: ['1990', '2005', '1889', '2020'], correctIndex: 1 },
          { id: 'q2', question: 'What is our signature fabric?', options: ['Cotton', 'Silk', 'Leather', 'Polyester'], correctIndex: 1 }
        ]
      },
      {
        id: 'l2',
        shopId: 's1',
        type: LotteryType.STANDARD,
        status: LotteryStatus.UPCOMING,
        prizeProduct: { id: 'p4', name: 'Leather Boots', description: 'Handcrafted Italian', image: 'https://picsum.photos/400/400?random=5', price: 600, inventory: 1 },
        starCost: 100,
        participants: 0,
        maxParticipants: 50,
        endTime: new Date(Date.now() + 172800000), // 48h
      }
    ]
  },
  {
    id: 's2',
    name: 'Gourmet Reserve',
    category: 'Fine Dining',
    description: 'Exclusive surplus ingredients and tasting menus.',
    image: 'https://picsum.photos/800/600?random=6',
    logo: 'https://picsum.photos/100/100?random=11',
    stars: 40,
    lat: 40.7200,
    lng: -74.0100,
    products: [],
    lotteries: [
      {
        id: 'l3',
        shopId: 's2',
        type: LotteryType.SCRATCH,
        status: LotteryStatus.LIVE,
        prizeProduct: { id: 'p5', name: 'Truffle Oil Set', description: 'Imported from Alba', image: 'https://picsum.photos/400/400?random=7', price: 80, inventory: 10 },
        starCost: 20,
        participants: 45,
        maxParticipants: 100,
        endTime: new Date(Date.now() + 3600000), // 1h
      }
    ]
  }
];