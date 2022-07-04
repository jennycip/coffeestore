import '../styles/globals.css'
import { createContext } from 'react';

const Storecontext = createContext();

const StoreProvider = ({ children }) => {
  const initialState = {
    latLong: "",
    coffeeStores: [],

  }
  return (
  <Storecontext.Provider value={{state:initialState}}>
  {children}
</Storecontext.Provider>
  );
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <StoreProvider>
      <Component {...pageProps} ></Component>
      </StoreProvider>
    </>
  )
}

export default MyApp
