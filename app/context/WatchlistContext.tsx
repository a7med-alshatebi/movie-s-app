"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/app/context/AuthContext";

export type Movie = {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
};

type WatchlistContextType = {
  watchlist: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: number) => void;
  isInWatchlist: (movieId: number) => boolean;
};

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const { user } = useAuth();
  const hasHydratedRef = useRef(false);
  const isSyncingRef = useRef(false);

  // Load from localStorage on mount (signed-out fallback)
  useEffect(() => {
    if (user) return;
    const saved = localStorage.getItem("watchlist");
    if (saved) {
      try {
        setWatchlist(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to load watchlist:", error);
      }
    }
    hasHydratedRef.current = true;
  }, []);

  // Hydrate from Firestore when signed in
  useEffect(() => {
    const hydrateFromFirestore = async () => {
      if (!user) {
        hasHydratedRef.current = true;
        return;
      }

      isSyncingRef.current = true;
      try {
        const docRef = doc(db, "watchlists", user.uid);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          const data = snapshot.data() as { movies?: Movie[] };
          if (data.movies) {
            setWatchlist(data.movies);
          }
        } else {
          const saved = localStorage.getItem("watchlist");
          if (saved) {
            try {
              setWatchlist(JSON.parse(saved));
            } catch (error) {
              console.error("Failed to load local watchlist:", error);
            }
          }
        }
      } catch (error) {
        console.error("Failed to load watchlist from Firestore:", error);
      } finally {
        hasHydratedRef.current = true;
        isSyncingRef.current = false;
      }
    };

    hydrateFromFirestore();
  }, [user]);

  // Save to localStorage whenever watchlist changes
  useEffect(() => {
    if (!user) {
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }
  }, [watchlist]);

  // Save to Firestore whenever watchlist changes (signed in)
  useEffect(() => {
    const saveToFirestore = async () => {
      if (!user || !hasHydratedRef.current || isSyncingRef.current) return;
      try {
        const docRef = doc(db, "watchlists", user.uid);
        await setDoc(
          docRef,
          { movies: watchlist, updatedAt: serverTimestamp() },
          { merge: true }
        );
      } catch (error) {
        console.error("Failed to save watchlist to Firestore:", error);
      }
    };

    saveToFirestore();
  }, [watchlist, user]);

  const addToWatchlist = (movie: Movie) => {
    setWatchlist((prev) => {
      if (prev.find((m) => m.id === movie.id)) {
        return prev;
      }
      return [...prev, movie];
    });
  };

  const removeFromWatchlist = (movieId: number) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== movieId));
  };

  const isInWatchlist = (movieId: number) => {
    return watchlist.some((m) => m.id === movieId);
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error("useWatchlist must be used within WatchlistProvider");
  }
  return context;
}
