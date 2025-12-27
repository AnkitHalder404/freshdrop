import React, { useState } from 'react';
import { ClayCard, ClayButton, GoldHeading, Input, Badge } from '../components/UI';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Package, Ticket, Users, BarChart3, Plus, Sparkles, MapPin, Settings } from 'lucide-react';
import { LotteryType, Lottery, Product } from '../types';
import { generateQuizQuestions } from '../services/geminiService';

const AnalyticsView = () => {
  const data = [
    { name: 'Mon', revenue: 4000, participants: 240 },
    { name: 'Tue', revenue: 3000, participants: 139 },
    { name: 'Wed', revenue: 2000, participants: 980 },
    { name: 'Thu', revenue: 2780, participants: 390 },
    { name: 'Fri', revenue: 1890, participants: 480 },
    { name: 'Sat', revenue: 2390, participants: 380 },
    { name: 'Sun', revenue: 3490, participants: 430 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ClayCard>
          <h3 className="font-display text-2xl mb-4 bg-neo-yellow inline-block border-2 border-neo-black px-2 shadow-neo-sm">Revenue Trend</h3>
          <div className="h-64 w-full border-2 border-dashed border-gray-300 p-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="name" stroke="#000" tick={{fontFamily: 'Space Mono'}} />
                <YAxis stroke="#000" tick={{fontFamily: 'Space Mono'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '3px solid #000', boxShadow: '4px 4px 0px 0px #000' }}
                  itemStyle={{ color: '#000', fontFamily: 'Space Mono', fontWeight: 'bold' }}
                />
                <Line type="monotone" dataKey="revenue" stroke="#FF6B6B" strokeWidth={4} dot={{ fill: '#000', strokeWidth: 2, r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ClayCard>
        <ClayCard>
          <h3 className="font-display text-2xl mb-4 bg-neo-blue text-white inline-block border-2 border-neo-black px-2 shadow-neo-sm">Engagement</h3>
           <div className="h-64 w-full border-2 border-dashed border-gray-300 p-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#000" tick={{fontFamily: 'Space Mono'}} />
                <YAxis stroke="#000" tick={{fontFamily: 'Space Mono'}} />
                <Tooltip 
                   contentStyle={{ backgroundColor: '#fff', border: '3px solid #000', boxShadow: '4px 4px 0px 0px #000' }}
                   cursor={{fill: '#E0E7FF'}}
                />
                <Bar dataKey="participants" fill="#23A094" stroke="#000" strokeWidth={2} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ClayCard>
      </div>
    </div>
  );
};

const CreateLotteryWizard = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [type, setType] = useState<LotteryType>(LotteryType.STANDARD);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);

  const handleGenerateQuestions = async () => {
    setIsLoading(true);
    // Simulating context from a selected product
    const qs = await generateQuizQuestions("Silk Scarf", "A luxurious mulberry silk scarf.");
    setQuestions(qs);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-neo-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <ClayCard className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white border-4 border-neo-black shadow-neo-lg">
        <div className="flex justify-between items-center mb-6 border-b-3 border-neo-black pb-4">
          <GoldHeading size="lg">Create Lottery</GoldHeading>
          <button onClick={onClose} className="w-10 h-10 bg-neo-red text-white border-2 border-neo-black font-bold hover:shadow-neo transition-all">✕</button>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-mono font-bold text-lg uppercase">Select Format</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[LotteryType.STANDARD, LotteryType.QUIZ, LotteryType.SCRATCH].map((t) => (
                <button 
                  key={t}
                  onClick={() => setType(t)}
                  className={`p-6 border-3 border-neo-black transition-all shadow-neo hover:translate-y-[-4px] hover:shadow-neo-lg text-left relative ${type === t ? 'bg-neo-yellow' : 'bg-white hover:bg-gray-50'}`}
                >
                  {type === t && <div className="absolute top-2 right-2 w-3 h-3 bg-black rounded-full"></div>}
                  <div className="font-display font-black text-xl mb-2">{t}</div>
                  <div className="font-mono text-xs font-bold leading-tight">
                    {t === 'STANDARD' ? 'Random draw.' : t === 'QUIZ' ? 'Skill based entry.' : 'Instant win.'}
                  </div>
                </button>
              ))}
            </div>
            <div className="flex justify-end mt-8">
              <ClayButton onClick={() => setStep(2)}>Next Step</ClayButton>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="font-mono font-bold text-lg uppercase">Details</h3>
            <Input placeholder="Lottery Title" />
            <div className="grid grid-cols-2 gap-4">
              <Input type="number" placeholder="Star Cost" />
              <Input type="number" placeholder="Max Participants" />
            </div>
             <Input type="datetime-local" placeholder="End Time" />
            
            {type === LotteryType.QUIZ && (
              <div className="border-t-3 border-neo-black pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-display text-xl">Quiz Questions</h4>
                  <ClayButton variant="secondary" onClick={handleGenerateQuestions} isLoading={isLoading}>
                    <Sparkles className="w-4 h-4 mr-2" /> AI Generate
                  </ClayButton>
                </div>
                {questions.length > 0 ? (
                    <div className="space-y-2">
                        {questions.map((q, i) => (
                            <div key={i} className="bg-neo-bg p-3 border-2 border-neo-black">
                                <p className="font-bold font-mono">{q.question}</p>
                                <p className="text-xs text-gray-600 font-mono mt-1">{q.options.join(', ')}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="border-2 border-dashed border-gray-400 p-4 text-center text-gray-400 font-mono">
                        No questions generated yet.
                    </div>
                )}
              </div>
            )}

            <div className="flex justify-between mt-8 border-t-3 border-neo-black pt-6">
              <button onClick={() => setStep(1)} className="font-mono font-bold hover:underline">{'<- Back'}</button>
              <ClayButton onClick={onClose} variant="accent">Launch Lottery</ClayButton>
            </div>
          </div>
        )}
      </ClayCard>
    </div>
  );
};

export const MerchantDashboard = () => {
  const [view, setView] = useState<'overview' | 'inventory' | 'lotteries' | 'analytics'>('overview');
  const [showWizard, setShowWizard] = useState(false);

  const sidebarItems = [
    { id: 'overview', icon: BarChart3, label: 'Overview' },
    { id: 'inventory', icon: Package, label: 'Inventory' },
    { id: 'lotteries', icon: Ticket, label: 'Lotteries' },
    { id: 'analytics', icon: Users, label: 'Analytics' },
  ];

  return (
    <div className="min-h-screen flex bg-neo-bg text-neo-black font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r-3 border-neo-black bg-white p-0 flex flex-col hidden md:flex">
        <div className="p-6 border-b-3 border-neo-black bg-neo-yellow">
            <GoldHeading size="md">FreshDrop <br/><span className="text-sm font-mono tracking-widest bg-black text-white px-1">MERCHANT</span></GoldHeading>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 border-2 border-neo-black font-mono font-bold transition-all shadow-neo-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none ${view === item.id ? 'bg-neo-blue text-white' : 'bg-white hover:bg-gray-100'}`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t-3 border-neo-black bg-gray-50">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 border-2 border-neo-black bg-neo-pink rounded-full flex items-center justify-center font-bold">M</div>
                <div>
                    <div className="font-bold text-sm font-mono">Maison de Mode</div>
                    <div className="text-xs bg-neo-green text-white px-1 inline-block border border-black">VERIFIED</div>
                </div>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 pb-4 border-b-3 border-neo-black">
          <h2 className="text-4xl font-display uppercase">{view}</h2>
          {view === 'lotteries' && (
            <ClayButton onClick={() => setShowWizard(true)} variant="accent">
              <Plus size={18} /> New Lottery
            </ClayButton>
          )}
        </header>

        {view === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ClayCard className="bg-neo-blue text-white">
                <div className="font-mono font-bold text-sm uppercase tracking-wider mb-2 opacity-80">Total Sales</div>
                <div className="text-4xl font-display">$12,450</div>
                <div className="text-black bg-white px-2 py-1 text-xs mt-4 inline-block font-bold border-2 border-black shadow-neo-sm">▲ 12% this week</div>
            </ClayCard>
             <ClayCard className="bg-neo-yellow">
                <div className="font-mono font-bold text-sm uppercase tracking-wider mb-2 opacity-80">Active Lotteries</div>
                <div className="text-4xl font-display">4</div>
                <div className="text-sm mt-4 font-mono font-bold">2 ending soon</div>
            </ClayCard>
             <ClayCard className="bg-neo-pink">
                <div className="font-mono font-bold text-sm uppercase tracking-wider mb-2 opacity-80">Customer Satisfaction</div>
                <div className="text-4xl font-display">4.9</div>
                <div className="text-sm mt-4 font-black">★★★★★</div>
            </ClayCard>
          </div>
        )}

        {view === 'lotteries' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[1,2,3].map(i => (
                    <ClayCard key={i} className="flex flex-col md:flex-row gap-4">
                        <div className="w-full md:w-32 h-32 bg-gray-200 border-2 border-neo-black flex-shrink-0 relative">
                             <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-mono">IMG</div>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className="font-display text-xl leading-tight">Silk Scarf Giveaway</h3>
                                <Badge color={i === 1 ? 'blue' : 'yellow'}>{i === 1 ? 'LIVE' : 'ENDED'}</Badge>
                            </div>
                            <p className="font-mono text-sm mt-2 bg-gray-100 inline-block px-2 py-1 border border-black">Participants: 1,240</p>
                            <div className="mt-4 flex gap-2">
                                <button className="px-3 py-1 bg-white border-2 border-black font-bold text-sm hover:bg-gray-100 shadow-neo-sm hover:translate-y-[1px] hover:shadow-none transition-all">Edit</button>
                                <button className="px-3 py-1 bg-neo-black text-white border-2 border-black font-bold text-sm hover:bg-gray-800 shadow-neo-sm hover:translate-y-[1px] hover:shadow-none transition-all">View</button>
                            </div>
                        </div>
                    </ClayCard>
                ))}
            </div>
        )}

        {view === 'analytics' && <AnalyticsView />}
        
        {view === 'inventory' && (
            <div className="text-center text-gray-500 mt-20 border-4 border-dashed border-gray-300 p-10 rounded-xl">
                <Package className="w-16 h-16 mx-auto mb-4 opacity-50 text-neo-black" />
                <p className="font-mono font-bold text-xl text-neo-black">Inventory module loading...</p>
            </div>
        )}
      </main>

      {showWizard && <CreateLotteryWizard onClose={() => setShowWizard(false)} />}
    </div>
  );
};