import React, { useState } from 'react';
import { ClayCard, ClayButton, GoldHeading, Badge, ScratchPad } from '../components/UI';
import { MOCK_SHOPS, MOCK_USER } from '../constants';
import { Shop, Lottery, LotteryType } from '../types';
import { MapPin, ShoppingBag, Star, User as UserIcon, Filter, Search, ArrowLeft, Clock } from 'lucide-react';

const CustomerMap = ({ onSelectShop }: { onSelectShop: (shop: Shop) => void }) => {
  return (
    <div className="relative w-full h-full bg-[#E5E5E5] overflow-hidden">
      {/* Pattern Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{
            backgroundImage: 'linear-gradient(#000 2px, transparent 2px), linear-gradient(90deg, #000 2px, transparent 2px)',
            backgroundSize: '50px 50px'
        }}
      ></div>
      
      {/* Mock Map Pins - Neo Brutalist */}
      {MOCK_SHOPS.map((shop) => (
        <button
          key={shop.id}
          onClick={() => onSelectShop(shop)}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
          style={{ top: `${50 + (shop.lat - 40.7128) * 1000}%`, left: `${50 + (shop.lng + 74.0060) * 1000}%` }}
        >
          <div className="relative">
             <div className="w-14 h-14 bg-neo-yellow border-3 border-neo-black shadow-neo flex items-center justify-center relative z-10 transition-transform group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-neo-lg">
                <img src={shop.logo} alt={shop.name} className="w-10 h-10 border-2 border-neo-black object-cover bg-white" />
             </div>
             {/* Tooltip */}
             <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white border-3 border-neo-black shadow-neo px-3 py-1 font-bold font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20">
                {shop.name}
             </div>
          </div>
        </button>
      ))}

      {/* Floating UI */}
      <div className="absolute top-4 left-4 right-4 flex gap-4 z-30">
        <div className="flex-1 bg-white border-3 border-neo-black shadow-neo px-4 py-3 flex items-center">
            <Search className="w-5 h-5 text-black mr-3" />
            <input placeholder="SEARCH BOUTIQUES..." className="bg-transparent border-none outline-none text-black w-full placeholder-gray-500 font-mono font-bold uppercase" />
        </div>
        <button className="w-12 h-12 bg-neo-pink border-3 border-neo-black shadow-neo flex items-center justify-center hover:translate-y-1 hover:shadow-none transition-all">
            <Filter className="w-6 h-6 text-black" />
        </button>
      </div>
    </div>
  );
};

const ShopDetail = ({ shop, onBack, onSelectLottery }: { shop: Shop, onBack: () => void, onSelectLottery: (l: Lottery) => void }) => {
  return (
    <div className="bg-neo-bg min-h-screen pb-24">
      {/* Header */}
      <div className="relative h-56 w-full border-b-4 border-neo-black bg-white">
        <img src={shop.image} className="w-full h-full object-cover opacity-100 grayscale hover:grayscale-0 transition-all duration-500" alt="Shop Banner" />
        <div className="absolute inset-0 bg-neo-blue mix-blend-multiply opacity-20"></div>
        <button onClick={onBack} className="absolute top-4 left-4 w-12 h-12 bg-white border-3 border-neo-black shadow-neo flex items-center justify-center hover:translate-y-1 hover:shadow-none transition-all z-10">
            <ArrowLeft size={24} className="text-black" />
        </button>
      </div>
      
      <div className="px-4 -mt-12 relative z-10">
         <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-6 gap-4">
            <div className="w-28 h-28 bg-white border-4 border-neo-black shadow-neo-lg overflow-hidden flex-shrink-0">
                <img src={shop.logo} className="w-full h-full object-cover" alt="Logo" />
            </div>
            <div className="flex gap-3 w-full md:w-auto">
                <ClayButton variant="primary" className="flex-1 md:flex-none text-sm py-2">Follow</ClayButton>
                <div className="bg-neo-yellow border-3 border-neo-black px-4 py-2 flex flex-col items-center shadow-neo-sm">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Your Stars</span>
                    <span className="font-display text-xl">{shop.stars} ★</span>
                </div>
            </div>
         </div>
         
         <div className="bg-white border-3 border-neo-black p-6 shadow-neo mb-8">
            <GoldHeading size="xl" className="mb-2">{shop.name}</GoldHeading>
            <p className="font-mono font-bold text-gray-600">{shop.description}</p>
         </div>
         
         {/* Lotteries Horizontal Scroll */}
         <div className="mb-10">
            <h3 className="font-display text-2xl mb-4 flex items-center gap-2 bg-neo-black text-white px-2 py-1 inline-block transform -rotate-1"><Clock size={20} className="text-neo-yellow"/> Active Drops</h3>
            <div className="flex gap-4 overflow-x-auto pb-6 pt-2 hide-scrollbar px-1">
                {shop.lotteries.map(lottery => (
                    <ClayCard key={lottery.id} className="min-w-[280px] p-0 overflow-hidden group" onClick={() => onSelectLottery(lottery)}>
                         <div className="relative h-40 border-b-3 border-neo-black">
                            <img src={lottery.prizeProduct.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="Prize" />
                            <div className="absolute top-2 right-2">
                                <Badge color={lottery.type === 'QUIZ' ? 'pink' : 'yellow'}>{lottery.type}</Badge>
                            </div>
                         </div>
                         <div className="p-4 bg-white group-hover:bg-neo-yellow transition-colors">
                            <h4 className="font-display text-lg truncate leading-none mb-2">{lottery.prizeProduct.name}</h4>
                            <div className="flex justify-between items-center text-sm font-mono font-bold border-t-2 border-black pt-2">
                                <span>{lottery.participants} entered</span>
                                <span className="text-black bg-white px-1 border border-black">{lottery.starCost} ★</span>
                            </div>
                         </div>
                    </ClayCard>
                ))}
            </div>
         </div>

         {/* Standard Product Grid */}
         <div>
            <h3 className="font-display text-2xl mb-4 uppercase">Shop Inventory</h3>
            <div className="grid grid-cols-2 gap-4">
                {shop.products.map(product => (
                    <div key={product.id} className="bg-white border-3 border-neo-black p-3 shadow-neo hover:shadow-neo-lg transition-all">
                        <div className="h-32 border-2 border-black mb-3 bg-gray-100">
                             <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
                        </div>
                        <div className="font-display text-sm leading-tight mb-1">{product.name}</div>
                        <div className="text-xs font-mono text-gray-500 mb-3 truncate">{product.description}</div>
                        <div className="flex justify-between items-center border-t-2 border-black pt-2">
                            <span className="font-black text-lg">${product.price}</span>
                            <button className="w-8 h-8 bg-neo-black text-white flex items-center justify-center hover:bg-neo-blue border-2 border-transparent hover:border-black">+</button>
                        </div>
                    </div>
                ))}
            </div>
         </div>
      </div>
    </div>
  );
};

const LotteryInteraction = ({ lottery, onBack }: { lottery: Lottery, onBack: () => void }) => {
    const [status, setStatus] = useState<'info' | 'playing' | 'result'>('info');

    const handleEnter = () => {
        setStatus('playing');
    };

    return (
        <div className="fixed inset-0 bg-neo-bg z-50 flex flex-col font-sans">
            <div className="p-4 flex justify-between items-center bg-white border-b-3 border-neo-black">
                <button onClick={onBack} className="bg-white border-2 border-black p-2 hover:bg-black hover:text-white transition-colors"><ArrowLeft /></button>
                <div className="font-display text-xl uppercase tracking-widest bg-neo-yellow px-2 border-2 border-black">{lottery.type} EVENT</div>
                <div className="w-10"></div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center">
                {status === 'info' && (
                    <>
                        <div className="w-full max-w-sm h-64 border-4 border-neo-black shadow-neo-lg overflow-hidden mb-8 bg-white p-2">
                            <div className="w-full h-full border-2 border-neo-black overflow-hidden relative">
                                <img src={lottery.prizeProduct.image} className="w-full h-full object-cover" alt="Prize" />
                                <div className="absolute bottom-0 left-0 bg-neo-pink text-black font-display text-lg px-2 border-t-2 border-r-2 border-black">
                                    WIN THIS
                                </div>
                            </div>
                        </div>
                        
                        <GoldHeading className="text-center mb-4 text-3xl">{lottery.prizeProduct.name}</GoldHeading>
                        <p className="text-center font-mono font-bold text-gray-600 mb-10 max-w-xs border-b-2 border-black pb-4">{lottery.prizeProduct.description}</p>
                        
                        <div className="w-full max-w-md space-y-4 mb-8">
                            <div className="flex justify-between p-4 bg-white border-3 border-neo-black shadow-neo">
                                <span className="font-mono font-bold uppercase text-gray-500">Entry Cost</span>
                                <span className="font-display text-xl">{lottery.starCost} Stars</span>
                            </div>
                            <div className="flex justify-between p-4 bg-neo-black text-white border-3 border-black shadow-neo">
                                <span className="font-mono font-bold uppercase opacity-80">Draws In</span>
                                <span className="font-display text-xl text-neo-green">24h 12m</span>
                            </div>
                        </div>

                        <ClayButton onClick={handleEnter} variant="primary" className="w-full max-w-xs py-4 text-xl">
                            {lottery.type === LotteryType.SCRATCH ? 'Play Now ->' : 'Enter Draw ->'}
                        </ClayButton>
                    </>
                )}

                {status === 'playing' && lottery.type === LotteryType.SCRATCH && (
                     <div className="flex flex-col items-center justify-center h-full w-full">
                        <GoldHeading size="lg" className="mb-8">Scratch to Win</GoldHeading>
                        <ScratchPad onReveal={(won) => {
                             setTimeout(() => setStatus('result'), 1000);
                        }} />
                     </div>
                )}
                 
                 {/* Placeholder for Quiz Logic */}
                {status === 'playing' && lottery.type === LotteryType.QUIZ && (
                     <div className="w-full max-w-md">
                        <div className="mb-6 flex justify-between items-end border-b-4 border-black pb-2">
                            <h3 className="text-3xl font-display">Quiz</h3>
                            <span className="font-mono font-bold bg-neo-yellow px-2 border-2 border-black">1/3</span>
                        </div>
                        <p className="text-xl font-bold font-mono mb-8 p-4 bg-white border-3 border-black shadow-neo">What material is this scarf made of?</p>
                        <div className="space-y-4">
                            {['Cotton', 'Silk', 'Wool', 'Nylon'].map(opt => (
                                <button key={opt} onClick={() => setStatus('result')} className="w-full p-4 border-3 border-neo-black bg-white hover:bg-neo-blue hover:text-white hover:shadow-neo transition-all text-left font-bold font-mono text-lg uppercase">
                                    {opt}
                                </button>
                            ))}
                        </div>
                     </div>
                )}
                
                {status === 'result' && (
                     <div className="text-center mt-20 w-full max-w-md">
                         <div className="bg-neo-green border-4 border-black p-8 shadow-neo-lg mb-8">
                             <GoldHeading className="text-white">Entry Confirmed!</GoldHeading>
                         </div>
                         <p className="font-mono font-bold text-lg mb-8">You have successfully entered the draw. Good luck.</p>
                         <ClayButton onClick={onBack} variant="secondary" className="w-full">Back to Shop</ClayButton>
                     </div>
                )}
            </div>
        </div>
    );
};

export const CustomerApp = () => {
  const [view, setView] = useState<'map' | 'shop' | 'profile' | 'lottery'>('map');
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [selectedLottery, setSelectedLottery] = useState<Lottery | null>(null);

  const handleShopSelect = (shop: Shop) => {
    setSelectedShop(shop);
    setView('shop');
  };

  const handleLotterySelect = (l: Lottery) => {
      setSelectedLottery(l);
      setView('lottery');
  };

  return (
    <div className="h-screen w-full flex flex-col bg-neo-bg font-sans">
      <main className="flex-1 relative overflow-hidden">
        {view === 'map' && <CustomerMap onSelectShop={handleShopSelect} />}
        {view === 'shop' && selectedShop && (
            <ShopDetail 
                shop={selectedShop} 
                onBack={() => setView('map')} 
                onSelectLottery={handleLotterySelect}
            />
        )}
        {view === 'lottery' && selectedLottery && (
            <LotteryInteraction lottery={selectedLottery} onBack={() => setView('shop')} />
        )}
        {view === 'profile' && (
            <div className="p-6">
                <div className="flex items-center gap-4 mb-8 bg-white border-3 border-neo-black p-4 shadow-neo">
                    <img src={MOCK_USER.avatar} className="w-20 h-20 border-2 border-black" alt="Profile" />
                    <div>
                        <h2 className="text-3xl font-display uppercase">{MOCK_USER.name}</h2>
                        <div className="bg-neo-yellow inline-block px-2 border-2 border-black text-sm font-bold mt-1">GOLD MEMBER</div>
                    </div>
                </div>
                <h3 className="font-display text-xl mb-4 uppercase border-b-4 border-black inline-block">Your Wallet</h3>
                <ClayCard className="mb-6 flex justify-between items-center bg-neo-blue text-white">
                    <div>
                        <div className="text-xs font-mono font-bold uppercase opacity-80">TOTAL STARS</div>
                        <div className="text-5xl font-display mt-2">190</div>
                    </div>
                    <Star className="text-neo-yellow w-12 h-12 fill-current stroke-black stroke-2" />
                </ClayCard>
            </div>
        )}
      </main>

      {/* Bottom Nav */}
      {view !== 'lottery' && (
        <nav className="h-20 bg-white border-t-4 border-neo-black flex justify-around items-center px-6 pb-2 z-40">
            <button onClick={() => setView('map')} className={`flex flex-col items-center gap-1 ${view === 'map' ? 'text-neo-blue' : 'text-gray-400 hover:text-black'}`}>
                <MapPin size={24} strokeWidth={2.5} />
                <span className="text-xs font-bold font-mono uppercase">Explore</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-black">
                <div className="w-14 h-14 bg-neo-pink border-3 border-neo-black -mt-8 flex items-center justify-center shadow-neo hover:translate-y-1 hover:shadow-none transition-all">
                    <ShoppingBag size={24} className="text-black" strokeWidth={2.5} />
                </div>
            </button>
            <button onClick={() => setView('profile')} className={`flex flex-col items-center gap-1 ${view === 'profile' ? 'text-neo-blue' : 'text-gray-400 hover:text-black'}`}>
                <UserIcon size={24} strokeWidth={2.5} />
                <span className="text-xs font-bold font-mono uppercase">Profile</span>
            </button>
        </nav>
      )}
    </div>
  );
};