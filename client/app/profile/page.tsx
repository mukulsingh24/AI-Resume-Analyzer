"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.replace("/login");
      } else {
        setUser(currentUser);
        setCheckingAuth(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fc]">
        <p className="text-slate-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f9fc] text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white font-bold">
              A
            </div>

            <div>
              <h1 className="text-lg font-bold">Apna Interview</h1>
              <p className="text-xs text-slate-500">User Profile</p>
            </div>
          </Link>

          <Link
            href="/dashboard"
            className="rounded-lg border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <p className="text-sm font-medium text-indigo-600">Your Profile</p>

          <h2 className="mt-1 text-3xl font-bold tracking-tight">
            Account Information
          </h2>

          <p className="mt-2 text-slate-500">
            Manage your personal information and career preferences.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-5 border-b border-slate-100 pb-7">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-2xl font-bold text-indigo-600">
              {user?.displayName?.charAt(0) ||
                user?.email?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h3 className="text-xl font-semibold">
                {user?.displayName || "Apna Interview User"}
              </h3>

              <p className="mt-1 text-sm text-slate-500">{user?.email}</p>
            </div>
          </div>

          <div className="mt-7 grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-slate-500">Email</p>
              <p className="mt-2 font-medium text-slate-900">
                {user?.email}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-slate-500">
                Email Verification
              </p>

              <p className="mt-2 font-medium text-slate-900">
                {user?.emailVerified ? "Verified" : "Not Verified"}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-slate-500">
                Account Provider
              </p>

              <p className="mt-2 font-medium text-slate-900">
                {user?.providerData[0]?.providerId === "google.com"
                  ? "Google"
                  : "Email & Password"}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-slate-500">
                Account Created
              </p>

              <p className="mt-2 font-medium text-slate-900">
                {user?.metadata.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString()
                  : "Unavailable"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}