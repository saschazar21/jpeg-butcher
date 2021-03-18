import { h, JSX } from 'preact';
import { StoreContext } from 'storeon/preact';

import Header from 'components/Header';
import Index from 'pages/Index';
import store from 'store';

const App = (): JSX.Element => {
  return (
    <StoreContext.Provider value={store}>
      <Header />
      <Index />
    </StoreContext.Provider>
  );
};

export default App;
