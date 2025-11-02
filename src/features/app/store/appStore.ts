"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeMode = "light" | "dark" | "system";

export interface UserProfile {
  id?: string;
  email?: string;
  name?: string;
}

interface AppState {
  theme: ThemeMode;
  sidebarOpen: boolean;
  user: UserProfile | null;
  setTheme: (theme: ThemeMode) => void;
  toggleSidebar: () => void;
  setUser: (user: UserProfile | null) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: "system",
      sidebarOpen: false,
      user: null,
      setTheme: (theme) => set({ theme }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      setUser: (user) => set({ user }),
    }),
    { name: "app-store" }
  )
);