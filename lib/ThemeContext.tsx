"use client";
import React, { createContext, useContext, useState, useEffect, useLayoutEffect, useTransition } from "react";

interface ThemeContextType {
  dark: boolean;
  toggle: () => void;
  isPending: boolean;
}

const ThemeContext = createContext<ThemeContextType>({ dark: false, toggle: () => {}, isPending: false });

// useLayoutEffect di browser, useEffect di server (SSR-safe)
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);
  const [isPending, startTransition] = useTransition();

  // useLayoutEffect: runs synchronously after DOM mutations but BEFORE paint
  // This means no visible flash — state syncs with what inline script already set
  useIsomorphicLayoutEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);

    // Add transition class AFTER first sync — so initial load has no transition
    const timer = setTimeout(() => {
      document.documentElement.classList.add("theme-ready");
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const toggle = () => {
    // Apply class change immediately (synchronous — affects CSS vars instantly)
    const next = !document.documentElement.classList.contains("dark");
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("nexasell-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("nexasell-theme", "light");
    }
    // Defer the React state update so it doesn't block the browser paint
    startTransition(() => {
      setDark(next);
    });
  };

  return (
    <ThemeContext.Provider value={{ dark, toggle, isPending }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
