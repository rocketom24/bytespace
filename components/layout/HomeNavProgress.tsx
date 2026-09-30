"use client";

import { createContext, useContext } from "react";
import { useMotionValue, type MotionValue } from "framer-motion";

const HomeNavProgressContext = createContext<MotionValue<number> | null>(null);

/** Wraps Navbar + page content so the homepage can report scroll progress up to a Navbar living outside its own component tree. */
export function HomeNavProgressProvider({ children }: { children: React.ReactNode }) {
  const progress = useMotionValue(0);
  return (
    <HomeNavProgressContext.Provider value={progress}>{children}</HomeNavProgressContext.Provider>
  );
}

function useHomeNavProgressValue() {
  const value = useContext(HomeNavProgressContext);
  if (!value) throw new Error("useHomeNavProgress must be used within HomeNavProgressProvider");
  return value;
}

export function useHomeNavProgress() {
  return useHomeNavProgressValue();
}
