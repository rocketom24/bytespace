"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function useReducedMotionSafe() {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted ? Boolean(reduceMotion) : false;
}
