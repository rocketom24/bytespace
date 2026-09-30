"use client";

import { createContext, useContext, useEffect, useState } from "react";

const NavVisibilityContext = createContext<((hidden: boolean) => void) | null>(null);
const NavHiddenContext = createContext<boolean>(false);

/** Wraps Navbar + page content so pages without a navbar (e.g. the 404) can hide it without Navbar needing to guess from the URL. */
export function NavVisibilityProvider({ children }: { children: React.ReactNode }) {
  const [hidden, setHidden] = useState(false);
  return (
    <NavVisibilityContext.Provider value={setHidden}>
      <NavHiddenContext.Provider value={hidden}>{children}</NavHiddenContext.Provider>
    </NavVisibilityContext.Provider>
  );
}

export function useNavHidden() {
  return useContext(NavHiddenContext);
}

/** Call from a page to hide the global Navbar while it's mounted. */
export function useHideNavbar() {
  const setHidden = useContext(NavVisibilityContext);

  useEffect(() => {
    setHidden?.(true);
    return () => setHidden?.(false);
  }, [setHidden]);
}
