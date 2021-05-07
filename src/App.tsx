import type { JSX } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { StoreContext } from 'storeon/preact';
import { registerSW } from 'virtual:pwa-register';

import Header from 'components/Header';
import Footer from 'components/Footer';
import Toast from 'components/Toast';
import Index from 'pages/Index';
import store from 'store';

const TIMEOUT = 4000;

const App = (): JSX.Element => {
  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    registerSW({
      onOfflineReady() {
        setShowToast(true);
        setTimeout(() => setShowToast(false), TIMEOUT);
      },
    })(true);
  }, []);

  return (
    <StoreContext.Provider value={store}>
      <Header />
      <Index />
      <Footer />
      {showToast && <Toast>App is now offline-ready!</Toast>}
    </StoreContext.Provider>
  );
};

export default App;
