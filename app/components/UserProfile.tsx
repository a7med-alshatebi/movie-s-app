"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";

type UserProfileProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function UserProfile({ isOpen, onClose }: UserProfileProps) {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignOut = async () => {
    setError("");
    setLoading(true);

    try {
      await logout();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to sign out");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-0"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-red-950 border border-white/10 p-4 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header */}
        <div className="mb-4 sm:mb-8 text-center">
          <div className="mx-auto mb-2 sm:mb-4 flex h-12 sm:h-16 w-12 sm:w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 text-lg sm:text-2xl font-bold text-white">
            {user.email?.[0].toUpperCase() || "U"}
          </div>
          <h2 className="text-lg sm:text-2xl font-black tracking-tighter text-white mb-1">
            Account
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Signed in as
          </p>
        </div>

        {/* User Info */}
        <div className="space-y-2 sm:space-y-4 mb-4 sm:mb-8 pb-4 sm:pb-8 border-b border-white/10">
          <div>
            <p className="text-xs text-red-200 mb-0.5 sm:mb-1">Email</p>
            <p className="text-xs sm:text-sm font-medium text-white break-all">
              {user.email}
            </p>
          </div>

          <div>
            <p className="text-xs text-red-200 mb-0.5 sm:mb-1">Account Status</p>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <p className="text-xs sm:text-sm font-medium text-white">Active</p>
            </div>
          </div>

          {user.metadata?.creationTime && (
            <div>
              <p className="text-xs text-red-200 mb-0.5 sm:mb-1">Member Since</p>
              <p className="text-xs sm:text-sm font-medium text-white">
                {new Date(user.metadata.creationTime).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-3 sm:mb-4 rounded-lg bg-red-500/20 border border-red-500/50 p-2 sm:p-3 text-xs sm:text-sm text-red-200">
            {error}
          </div>
        )}

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          disabled={loading}
          className="w-full rounded-lg bg-red-600 px-3 sm:px-4 py-2.5 sm:py-3 font-semibold text-sm sm:text-base text-white transition hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {loading ? "Signing out..." : "Sign Out"}
        </button>

        {/* Additional Info */}
        <div className="mt-3 sm:mt-6 rounded-lg bg-white/5 p-2.5 sm:p-4 text-center">
          <p className="text-xs text-slate-400">
            Your watchlist is automatically saved to your account and synced across devices.
          </p>
        </div>
      </div>
    </div>
  );
}
