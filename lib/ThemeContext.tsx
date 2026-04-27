"use client";
import React, { createContext, useContext, useState, useEffect, useLayoutEffect } from "react";

interface ThemeContextType {
  dark: boolean;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextType>({ dark: false, toggle: () => {} });

// useLayoutEffect di browser, useEffect di server (SSR-safe)
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);

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
    setDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("nexasell-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("nexasell-theme", "light");
      }
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
