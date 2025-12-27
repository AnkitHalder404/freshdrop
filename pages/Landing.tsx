import React from 'react';
import { ClayButton, Badge } from '../components/UI';
import { UserRole } from '../types';
import { ArrowRight, Star, Tag, Zap, Box, TrendingUp, Clock, ShieldCheck, Globe, Trophy } from 'lucide-react';

const TickerItem = ({ text, time }: { text: string, time: string }) => (
    <div className="inline-flex items-center gap-2 mx-6 font-mono font-bold uppercase text-sm">
        <span className="w-2 h-2 bg-neo-green rounded-full animate-pulse"></span>
        <span>{text}</span>
        <span className="text-gray-500">[{time}]</span>
    </div>
);

const FeatureStep = ({ number, title, desc, icon: Icon, color }: any) => (
    <div className="relative group">
        <div className={`absolute -top-6 -left-6 font-display text-8xl text-gray-200 z-0 group-hover:${color.replace('bg-', 'text-')} transition-colors`}>{number}</div>
        <div className="relative z-10 bg-white border-3 border-neo-black p-6 shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all h-full flex flex-col">
            <div className={`w-12 h-12 ${color} border-2 border-neo-black flex items-center justify-center mb-4 shadow-neo-sm`}>
                <Icon className="w-6 h-6 text-black" />
            </div>
            <h3 className="font-display text-2xl mb-2 uppercase leading-none">{title}</h3>
            <p className="font-mono text-sm leading-relaxed text-gray-600">{desc}</p>
        </div>
    </div>
);

const LiveDropCard = ({ img, title, price, timeLeft }: any) => (
    <div className="min-w-[280px] bg-white border-3 border-neo-black p-3 flex flex-col shadow-neo hover:scale-105 transition-transform cursor-pointer">
        <div className="relative h-32 bg-gray-100 border-2 border-neo-black mb-3 overflow-hidden">
            <img src={img} alt={title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" />
            <div className="absolute top-1 right-1 bg-neo-red text-white text-xs font-bold px-1 animate-pulse">ENDING SOON</div>
        </div>
        <div className="flex justify-between items-start mb-2">
            <h4 className="font-display text-lg leading-none">{title}</h4>
            <span className="font-mono font-bold text-xs bg-neo-yellow px-1 border border-black">{price} ★</span>
        </div>
        <div className="mt-auto flex items-center gap-1 text-xs font-mono font-bold text-neo-blue">
            <Clock size={12} /> {timeLeft}
        </div>
    </div>
);

export const LandingPage = ({ onSelectRole }: { onSelectRole: (role: UserRole) => void }) => {
  return (
    <div className="min-h-screen bg-neo-bg text-neo-black font-sans relative overflow-x-hidden">
        
        {/* Background Patterns */}
        <div className="fixed inset-0 pattern-grid pointer-events-none z-0"></div>
        <div className="fixed top-20 right-[-100px] w-64 h-64 bg-neo-pink rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
        <div className="fixed bottom-[-50px] left-[-50px] w-80 h-80 bg-neo-blue rounded-full blur-[120px] opacity-20 pointer-events-none"></div>

        {/* Top Marquee (Live Feed) */}
        <div className="bg-neo-black text-white py-2 overflow-hidden border-b-4 border-neo-black z-50 relative">
            <div className="animate-marquee whitespace-nowrap flex">
                <TickerItem text="Sarah M. won Gucci Tote" time="2m ago" />
                <TickerItem text="Iron Chef Kit Dropped" time="Just now" />
                <TickerItem text="Alex K. won PS5 Bundle" time="5m ago" />
                <TickerItem text="Maison Margiela Boots Listed" time="12m ago" />
                <TickerItem text="New Quiz: 'Coffee Culture'" time="15m ago" />
                <TickerItem text="Sarah M. won Gucci Tote" time="2m ago" />
                <TickerItem text="Iron Chef Kit Dropped" time="Just now" />
                <TickerItem text="Alex K. won PS5 Bundle" time="5m ago" />
            </div>
        </div>

        {/* Navigation */}
        <nav className="relative z-40 px-6 py-4 border-b-3 border-neo-black bg-white flex justify-between items-center sticky top-0">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-neo-black flex items-center justify-center">
                    <span className="text-white font-display text-xl">F</span>
                </div>
                <div className="text-2xl font-display font-black tracking-tighter uppercase italic">
                    Fresh<span className="text-neo-blue">Drop</span>
                </div>
            </div>
            <div className="hidden md:flex gap-4 font-mono font-bold uppercase text-sm items-center">
                <a href="#how" className="hover:underline decoration-2 decoration-neo-pink underline-offset-4">How it Works</a>
                <a href="#drops" className="hover:underline decoration-2 decoration-neo-yellow underline-offset-4">Live Drops</a>
                <button className="bg-neo-black text-white px-4 py-2 hover:bg-neo-blue transition-colors border-2 border-transparent hover:border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1">
                    Connect Wallet
                </button>
            </div>
        </nav>

        {/* Main Content */}
        <main className="relative z-10 flex flex-col items-center">
            
            {/* HERO SECTION */}
            <section className="w-full container mx-auto px-4 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="relative z-10">
                    <div className="inline-block bg-neo-yellow border-3 border-neo-black px-3 py-1 font-mono font-bold mb-6 shadow-neo-sm transform -rotate-2">
                       ★ BETA ACCESS LIVE
                    </div>
                    <h1 className="font-display text-6xl md:text-8xl leading-[0.85] mb-8 text-neo-black tracking-tight">
                        LUXURY <br/>
                        IS NOT <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neo-pink to-neo-blue">TRASH.</span>
                    </h1>
                    <p className="text-lg md:text-xl font-mono font-bold mb-10 bg-white border-l-4 border-neo-black pl-4 py-2 max-w-md shadow-neo-sm">
                        Stop letting surplus inventory die in warehouses. Gamify the clearance. Win the goods.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <ClayButton onClick={() => onSelectRole(UserRole.CUSTOMER)} className="text-lg py-4 px-8 border-3 shadow-neo-lg">
                            Start Collecting
                        </ClayButton>
                        <button onClick={() => onSelectRole(UserRole.MERCHANT)} className="px-8 py-4 bg-white border-3 border-neo-black font-display uppercase tracking-wider hover:bg-gray-100 shadow-neo hover:translate-y-1 hover:shadow-none transition-all">
                            I'm a Merchant
                        </button>
                    </div>
                </div>

                {/* Hero Graphic */}
                <div className="relative hidden md:block h-[500px]">
                    {/* Floating Cards Composition */}
                    <div className="absolute top-10 right-10 w-64 bg-white border-4 border-neo-black p-4 shadow-[12px_12px_0px_0px_#000] rotate-3 hover:rotate-0 transition-transform duration-500 z-20">
                        <div className="w-full h-40 bg-gray-200 border-2 border-neo-black mb-4 overflow-hidden">
                             <img src="https://picsum.photos/400/400?random=2" className="w-full h-full object-cover" alt="Hero Product" />
                        </div>
                        <h3 className="font-display text-2xl uppercase">Silk Scarf</h3>
                        <div className="flex justify-between items-center mt-2 font-mono font-bold">
                            <span className="bg-neo-pink px-2 text-sm border border-black">RARE</span>
                            <span>$120.00</span>
                        </div>
                        <div className="mt-4 bg-neo-black text-white text-center py-2 font-display uppercase text-sm animate-pulse">
                            Drawing Now
                        </div>
                    </div>

                    <div className="absolute top-40 left-10 w-60 bg-neo-blue border-4 border-neo-black p-4 shadow-[8px_8px_0px_0px_#000] -rotate-6 z-10">
                        <div className="flex items-center gap-3 mb-2">
                             <Trophy className="text-neo-yellow w-8 h-8 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]" />
                             <span className="font-display text-white text-xl">WINNER!</span>
                        </div>
                        <p className="font-mono text-white text-sm font-bold leading-tight">
                            @AlexJustWon just secured the Hermes belt for 50 Stars.
                        </p>
                    </div>

                    {/* Decorative Elements */}
                    <Star className="absolute top-0 left-20 w-16 h-16 text-neo-yellow fill-current stroke-black stroke-[3] animate-spin-slow" />
                    <div className="absolute bottom-20 right-40 w-24 h-24 rounded-full border-4 border-neo-black bg-neo-green flex items-center justify-center font-display text-4xl shadow-neo">?</div>
                </div>
            </section>

            {/* LIVE FEED STRIP */}
            <div id="drops" className="w-full border-y-4 border-neo-black bg-neo-yellow py-8 overflow-x-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-6">
                        <h2 className="font-display text-4xl md:text-5xl uppercase">Live Drops 🔥</h2>
                        <a href="#" className="font-mono font-bold underline decoration-2 decoration-black">View All -></a>
                    </div>
                    <div className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar">
                        <LiveDropCard img="https://picsum.photos/400/400?random=10" title="Vintage Leica" price="200" timeLeft="04:22:10" />
                        <LiveDropCard img="https://picsum.photos/400/400?random=11" title="Dior Sunglasses" price="80" timeLeft="01:15:00" />
                        <LiveDropCard img="https://picsum.photos/400/400?random=12" title="Eames Chair Mini" price="400" timeLeft="12:00:00" />
                        <LiveDropCard img="https://picsum.photos/400/400?random=13" title="Signed Vinyl" price="120" timeLeft="00:45:30" />
                        <LiveDropCard img="https://picsum.photos/400/400?random=14" title="Gold Watch" price="900" timeLeft="06:30:00" />
                    </div>
                </div>
            </div>

            {/* HOW IT WORKS */}
            <section id="how" className="w-full py-20 bg-white border-b-4 border-neo-black">
                <div className="container mx-auto px-4">
                     <div className="text-center mb-16">
                        <span className="bg-neo-black text-white px-3 py-1 font-mono font-bold uppercase tracking-widest text-sm">The Process</span>
                        <h2 className="font-display text-5xl md:text-6xl mt-4 uppercase max-w-3xl mx-auto">
                            Gamified <span className="underline decoration-neo-blue decoration-8 underline-offset-4">Liquidity</span>
                        </h2>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                        <FeatureStep 
                            number="01" 
                            title="Drop It" 
                            desc="Merchants list surplus inventory as exclusive drops. No discounts, just opportunity." 
                            icon={Box} 
                            color="bg-neo-blue" 
                        />
                        <FeatureStep 
                            number="02" 
                            title="Play It" 
                            desc="Customers use 'Stars' to enter lotteries, solve quizzes, or scratch cards." 
                            icon={Zap} 
                            color="bg-neo-yellow" 
                        />
                        <FeatureStep 
                            number="03" 
                            title="Own It" 
                            desc="Winners are drawn via smart contract logic. Goods are shipped or picked up via QR." 
                            icon={ShieldCheck} 
                            color="bg-neo-pink" 
                        />
                     </div>
                </div>
            </section>

            {/* MANIFESTO / STATS */}
            <section className="w-full py-24 bg-neo-black text-white relative overflow-hidden">
                {/* Abstract Background */}
                <div className="absolute top-0 right-0 w-full h-full opacity-10" 
                     style={{backgroundImage: 'radial-gradient(#fff 2px, transparent 2px)', backgroundSize: '30px 30px'}}>
                </div>
                
                <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="font-display text-5xl md:text-7xl mb-6 uppercase leading-none">
                            Zero Waste.<br/>
                            <span className="text-neo-green">Full Value.</span>
                        </h2>
                        <p className="font-mono text-lg text-gray-400 mb-8 leading-relaxed">
                            The fashion industry burns billions in unsold stock every year. 
                            FreshDrop rebuilds the value chain by turning "leftovers" into 
                            highly coveted prizes. We are the anti-discount marketplace.
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="border-l-4 border-neo-green pl-4">
                                <div className="font-display text-4xl">2.4k</div>
                                <div className="text-xs uppercase font-mono tracking-wider text-gray-500">Items Saved</div>
                            </div>
                            <div className="border-l-4 border-neo-blue pl-4">
                                <div className="font-display text-4xl">$850k</div>
                                <div className="text-xs uppercase font-mono tracking-wider text-gray-500">Value Retained</div>
                            </div>
                        </div>
                    </div>
                    <div className="relative h-[400px] border-4 border-white bg-neo-bg shadow-[15px_15px_0px_0px_#fff]">
                        <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover grayscale contrast-125" alt="Fashion Waste" />
                        <div className="absolute inset-0 bg-neo-blue mix-blend-multiply opacity-40"></div>
                        <div className="absolute bottom-4 left-4 bg-black text-white px-3 py-1 font-mono font-bold uppercase text-sm border-2 border-white">
                            Join the movement
                        </div>
                    </div>
                </div>
            </section>

            {/* ROLE SELECTION (CTA) */}
            <section className="w-full py-20 bg-neo-bg">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="font-display text-4xl text-center mb-12 uppercase">Choose Your Path</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Merchant */}
                        <button 
                            onClick={() => onSelectRole(UserRole.MERCHANT)}
                            className="group relative bg-white border-4 border-neo-black p-8 text-left hover:-translate-y-2 hover:shadow-neo-lg transition-all"
                        >
                            <div className="absolute -top-4 -right-4 bg-neo-black text-white w-12 h-12 flex items-center justify-center font-display text-2xl border-2 border-white shadow-md group-hover:bg-neo-blue transition-colors">
                                <TrendingUp size={20} />
                            </div>
                            <h3 className="font-display text-4xl mb-2">Merchant</h3>
                            <p className="font-mono text-sm text-gray-600 mb-6 border-b-2 border-gray-200 pb-4">
                                Turn stagnant inventory into high-engagement brand moments.
                            </p>
                            <ul className="space-y-2 font-mono text-sm font-bold text-neo-black mb-8">
                                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-neo-green rounded-full"></div>Protect Brand Value</li>
                                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-neo-green rounded-full"></div>Acquire New Customers</li>
                                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-neo-green rounded-full"></div>Zero Marketing Cost</li>
                            </ul>
                            <span className="inline-block bg-neo-black text-white px-6 py-3 font-display uppercase tracking-wider group-hover:bg-neo-blue transition-colors">
                                Access Dashboard
                            </span>
                        </button>

                        {/* Customer */}
                        <button 
                            onClick={() => onSelectRole(UserRole.CUSTOMER)}
                            className="group relative bg-white border-4 border-neo-black p-8 text-left hover:-translate-y-2 hover:shadow-neo-lg transition-all"
                        >
                            <div className="absolute -top-4 -right-4 bg-neo-black text-white w-12 h-12 flex items-center justify-center font-display text-2xl border-2 border-white shadow-md group-hover:bg-neo-pink transition-colors">
                                <Globe size={20} />
                            </div>
                            <h3 className="font-display text-4xl mb-2">Collector</h3>
                            <p className="font-mono text-sm text-gray-600 mb-6 border-b-2 border-gray-200 pb-4">
                                Access the world's most exclusive surplus drops.
                            </p>
                            <ul className="space-y-2 font-mono text-sm font-bold text-neo-black mb-8">
                                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-neo-pink rounded-full"></div>Win Luxury Goods</li>
                                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-neo-pink rounded-full"></div>Play Daily Quizzes</li>
                                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-neo-pink rounded-full"></div>Sustainability Impact</li>
                            </ul>
                            <span className="inline-block bg-neo-black text-white px-6 py-3 font-display uppercase tracking-wider group-hover:bg-neo-pink transition-colors">
                                Enter App
                            </span>
                        </button>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="w-full bg-white border-t-4 border-neo-black pt-16 pb-8">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="text-4xl font-display font-black tracking-tighter uppercase italic mb-6">
                            Fresh<span className="text-neo-blue">Drop</span>.
                        </div>
                        <p className="font-mono text-sm max-w-sm text-gray-600 mb-6">
                            Reimagining the lifecycle of luxury goods through gamification and community.
                            Built for a zero-waste future.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 border-2 border-neo-black flex items-center justify-center hover:bg-neo-black hover:text-white transition-colors"><Globe size={18}/></a>
                            <a href="#" className="w-10 h-10 border-2 border-neo-black flex items-center justify-center hover:bg-neo-black hover:text-white transition-colors"><Zap size={18}/></a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-display text-xl uppercase mb-6">Platform</h4>
                        <ul className="space-y-3 font-mono text-sm font-bold text-gray-600">
                            <li><a href="#" className="hover:text-neo-blue hover:underline">Marketplace</a></li>
                            <li><a href="#" className="hover:text-neo-blue hover:underline">Merchants</a></li>
                            <li><a href="#" className="hover:text-neo-blue hover:underline">Authentication</a></li>
                            <li><a href="#" className="hover:text-neo-blue hover:underline">Developers</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-display text-xl uppercase mb-6">Legal</h4>
                        <ul className="space-y-3 font-mono text-sm font-bold text-gray-600">
                            <li><a href="#" className="hover:text-neo-blue hover:underline">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-neo-blue hover:underline">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-neo-blue hover:underline">Cookie Settings</a></li>
                        </ul>
                    </div>
                </div>
                <div className="container mx-auto px-4 border-t-2 border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center font-mono text-xs text-gray-400">
                    <div>© 2024 FRESHDROP INC. ALL RIGHTS RESERVED.</div>
                    <div className="mt-2 md:mt-0">DESIGNED WITH NEO-BRUTALISM</div>
                </div>
            </footer>

        </main>
    </div>
  );
};