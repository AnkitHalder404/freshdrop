import React, { useState } from 'react';
import { UserRole } from './types';
import { LandingPage } from './pages/Landing';
import { MerchantDashboard } from './pages/Merchant';
import { CustomerApp } from './pages/Customer';

const App = () => {
  const [role, setRole] = useState<UserRole | null>(null);

  // Simple state-based routing for this SPA demonstration
  if (!role) {
    return <LandingPage onSelectRole={setRole} />;
  }

  if (role === UserRole.MERCHANT) {
    return <MerchantDashboard />;
  }

  if (role === UserRole.CUSTOMER) {
    return <CustomerApp />;
  }

  return <div>Error: Unknown state</div>;
};

export default App;