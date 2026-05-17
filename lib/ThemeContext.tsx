"use client";
import React, { createContext, useContext, useState, useEffect, useLayoutEffect, useTransition } from "react";

interface ThemeContextType {
  dark: boolean;
  mounted: boolean;
  toggle: () => void;
  isPending: boolean;
}

const ThemeContext = createContext<ThemeContextType>({ dark: false, mounted: false, toggle: () => {}, isPending: false });

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();

  useIsomorphicLayoutEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
    setMounted(true);

    const timer = setTimeout(() => {
      document.documentElement.classList.add("theme-ready");
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("nexasell-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("nexasell-theme", "light");
    }
    startTransition(() => {
      setDark(next);
    });
  };

  return (
    <ThemeContext.Provider value={{ dark, mounted, toggle, isPending }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
