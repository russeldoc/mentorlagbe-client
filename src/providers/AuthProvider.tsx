"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { api, getAuthToken, setAuthToken } from "@/lib/api";
import { UserProfile, UserRole } from "@/types";

interface AuthContextValue {
    user: UserProfile | null;
    token: string | null;
    loading: boolean;
    darkMode: boolean;
    toggleDarkMode: () => void;
    login: (email: string, password: string) => Promise<UserProfile>;
    register: (payload: {
        name: string;
        email: string;
        password: string;
        role: UserRole;
    }) => Promise<UserProfile>;
    refreshUser: () => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const USER_CACHE_KEY = "mentorlagbe_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [darkMode, setDarkMode] = useState<boolean>(false);

    // Theme initialization
    useEffect(() => {
        const savedTheme = localStorage.getItem("mentorlagbe_theme");
        const isDark = savedTheme === "dark";
        setDarkMode(isDark);
        document.documentElement.classList.toggle("dark", isDark);
    }, []);

    const toggleDarkMode = useCallback(() => {
        setDarkMode((prev) => {
            const next = !prev;
            localStorage.setItem("mentorlagbe_theme", next ? "dark" : "light");
            document.documentElement.classList.toggle("dark", next);
            return next;
        });
    }, []);

    // Hydrate user from stored token & cached profile so page reloads never falsely kick out users
    useEffect(() => {
        let active = true;

        async function hydrate() {
            const savedToken = getAuthToken();
            const cachedUser = localStorage.getItem(USER_CACHE_KEY);

            if (cachedUser) {
                try {
                    setUser(JSON.parse(cachedUser));
                } catch {
                    localStorage.removeItem(USER_CACHE_KEY);
                }
            }

            if (!savedToken) {
                if (active) {
                    setToken(null);
                    setLoading(false);
                }
                return;
            }

            setToken(savedToken);
            try {
                const res = await api.get("/auth-session/me");
                if (active && res.data?.user) {
                    setUser(res.data.user);
                    localStorage.setItem(USER_CACHE_KEY, JSON.stringify(res.data.user));
                }
            } catch (err: unknown) {
                const status = (err as { response?: { status?: number } })?.response?.status;
                // Only clear session if token is genuinely unauthorized (401)
                if (active && status === 401) {
                    setAuthToken(null);
                    setToken(null);
                    setUser(null);
                    localStorage.removeItem(USER_CACHE_KEY);
                }
            } finally {
                if (active) setLoading(false);
            }
        }

        hydrate();
        return () => {
            active = false;
        };
    }, []);

    const login = useCallback(async (email: string, password: string): Promise<UserProfile> => {
        const res = await api.post("/auth-session/login", { email, password });
        const { token: jwtToken, user: syncedUser } = res.data;
        setAuthToken(jwtToken);
        setToken(jwtToken);
        setUser(syncedUser);
        localStorage.setItem(USER_CACHE_KEY, JSON.stringify(syncedUser));
        return syncedUser;
    }, []);

    const register = useCallback(
        async (payload: {
            name: string;
            email: string;
            password: string;
            role: UserRole;
        }): Promise<UserProfile> => {
            const res = await api.post("/auth-session/register", payload);
            const { token: jwtToken, user: syncedUser } = res.data;
            setAuthToken(jwtToken);
            setToken(jwtToken);
            setUser(syncedUser);
            localStorage.setItem(USER_CACHE_KEY, JSON.stringify(syncedUser));
            return syncedUser;
        },
        []
    );

    const refreshUser = useCallback(async () => {
        const savedToken = getAuthToken();
        if (!savedToken) return;
        const res = await api.get("/auth-session/me");
        if (res.data?.user) {
            setUser(res.data.user);
            localStorage.setItem(USER_CACHE_KEY, JSON.stringify(res.data.user));
        }
    }, []);

    const logout = useCallback(() => {
        setAuthToken(null);
        setToken(null);
        setUser(null);
        localStorage.removeItem(USER_CACHE_KEY);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                darkMode,
                toggleDarkMode,
                login,
                register,
                refreshUser,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}