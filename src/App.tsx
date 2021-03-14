import { h, JSX } from 'preact';
import { StoreContext } from 'storeon/preact';

import Index from 'pages/Index';
import store from 'store';

const App = (): JSX.Element => {
  return (
    <StoreContext.Provider value={store}>
      <Index />
    </StoreContext.Provider>
  );
};

export default App;
