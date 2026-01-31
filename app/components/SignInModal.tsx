"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";

type SignInModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signIn, signUp, signInWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);

    try {
      await signInWithGoogle();
      onClose();
    } catch (err: any) {
      setError(err.message || "Google sign in failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-0"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-red-950 border border-white/10 p-4 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >

        <h2 className="text-xl sm:text-3xl font-black tracking-tighter text-white mb-1 sm:mb-2">
          {isSignUp ? "Create Account" : "Sign In"}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mb-4 sm:mb-6">
          {isSignUp
            ? "Join us to save your watchlist"
            : "Access your watchlist and preferences"}
        </p>

        {/* Error Message */}
        {error && (
          <div className="mb-3 sm:mb-4 rounded-lg bg-red-500/20 border border-red-500/50 p-2 sm:p-3 text-xs sm:text-sm text-red-200">
            {error}
          </div>
        )}

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
          <div>
            <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-red-100 mb-1 sm:mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg bg-white/10 border border-white/20 px-3 sm:px-4 py-2 text-white text-base placeholder-red-300/50 focus:border-red-400 focus:outline-none focus:ring-1 focus:ring-red-400"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-red-100 mb-1 sm:mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg bg-white/10 border border-white/20 px-3 sm:px-4 py-2 text-white text-base placeholder-red-300/50 focus:border-red-400 focus:outline-none focus:ring-1 focus:ring-red-400"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-red-600 px-3 sm:px-4 py-2.5 sm:py-2 font-semibold text-sm sm:text-base text-white transition hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : isSignUp ? "Create Account" : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative mb-4 sm:mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-red-950 px-2 text-red-300">or</span>
          </div>
        </div>

        {/* Google Sign In */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          type="button"
          className="w-full rounded-lg border border-white/20 bg-white/5 px-3 sm:px-4 py-2.5 sm:py-2 font-semibold text-sm sm:text-base text-red-100 transition hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span className="hidden sm:inline">{loading ? "Loading..." : "Sign in with Google"}</span>
          <span className="sm:hidden">{loading ? "Loading..." : "Google"}</span>
        </button>

        {/* Toggle Sign Up / Sign In */}
        <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-red-300">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError("");
              setEmail("");
              setPassword("");
            }}
            className="font-semibold text-red-100 hover:text-red-50"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
