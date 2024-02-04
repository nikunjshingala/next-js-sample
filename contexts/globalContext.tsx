import React, { useMemo, useState } from 'react';

// any values added here must be cleared on logout
interface IGlobalContextProps {
  isHamburgerOpen: boolean;
  toggleHamBurger: Function;
}


const initalContext = {
  isHamburgerOpen: false,
  toggleHamBurger: () => {},
};

export const GlobalContext =
  React.createContext<IGlobalContextProps>(initalContext);

export function GlobalContextProvider(props: any) {
  const { children } = props;
  const [isHamburgerOpen, toggleHamBurger] = useState(false);

  const value = useMemo(
    () => ({
      toggleHamBurger,
      isHamburgerOpen,
    }),
    [
      isHamburgerOpen,
    ]
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}