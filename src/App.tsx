import type { JSX } from 'preact';
import { useEffect } from 'preact/hooks';
import { StoreContext } from 'storeon/preact';
import { registerSW } from 'virtual:pwa-register';

import Header from 'components/Header';
import Index from 'pages/Index';
import store from 'store';

const App = (): JSX.Element => {
  useEffect(() => {
    registerSW()(true);
  }, []);

  return (
    <StoreContext.Provider value={store}>
      <Header />
      <Index />
    </StoreContext.Provider>
  );
};

export default App;
