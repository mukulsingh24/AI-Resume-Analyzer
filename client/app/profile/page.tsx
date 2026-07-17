"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [fullName, setFullName] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [education, setEducation] = useState("");
  const [skills, setSkills] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
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
  const handleSaveProfile = async () => {
    if (!user) return;

    try {
      setSaving(true);
      setMessage("");

      const response = await fetch("http://localhost:5050/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firebaseUid: user.uid,
          fullName,
          targetRole,
          experienceLevel,
          education,
          skills: skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save profile.");
      }

      setMessage("Profile saved successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };
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
              <p className="mt-2 font-medium text-slate-900">{user?.email}</p>
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
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Career Profile
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Add your career information to personalize your interview
              preparation.
            </p>
          </div>

          <div className="mt-7 grid gap-6 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Full Name
              </label>

              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Target Role
              </label>

              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Full Stack Developer"
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Experience Level
              </label>

              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="">Select experience level</option>
                <option value="student">Student</option>
                <option value="fresher">Fresher</option>
                <option value="junior">Junior Developer</option>
                <option value="mid">Mid-Level Developer</option>
                <option value="senior">Senior Developer</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Education
              </label>

              <input
                type="text"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                placeholder="e.g. B.Tech in AI & ML"
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="text-sm font-medium text-slate-700">Skills</label>

            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. Java, React, Next.js, Node.js, Flutter"
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

            <p className="mt-2 text-xs text-slate-400">
              Separate your skills with commas.
            </p>
          </div>

          <div className="mt-7 flex justify-end">
            {message && (
              <p className="mt-5 text-sm text-slate-600">{message}</p>
            )}
            <button
              onClick={handleSaveProfile}
              disabled={saving}
              className="rounded-lg bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
