"use client";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import PasswordInput from "@/components/passwordInput";
import { useRouter } from "next/navigation";
export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const passwordLength = password.length >= 8;
  const passwordsMatch = password === confirmPassword || confirmPassword === "";
  const router = useRouter();
  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Google signup failed.");
    }
  };
  const handleRegister = async () => {
    setError("");
    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill all the fields.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log(userCredential.user);
      router.push("/login");
    } catch (err: unknown) {
      console.log(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return (
  <main className="min-h-screen bg-[#f8f9fc]">
    <div className="grid min-h-screen lg:grid-cols-2">
      <section className="relative hidden overflow-hidden border-r border-slate-200 bg-white lg:flex lg:flex-col">
        <Link
          href="/"
          className="absolute left-10 top-8 z-20 flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 font-bold text-white shadow-sm">
            A
          </div>

          <span className="text-lg font-semibold text-slate-900">
            Apna Interview
          </span>
        </Link>

        <div className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-blue-100/60 blur-[100px]" />
        <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-violet-100/60 blur-[100px]" />

        <div className="relative z-10 flex flex-1 items-center px-12 xl:px-20">
          <div className="w-full">
            <h1 className="mt-7 max-w-xl text-5xl font-bold leading-[1.1] tracking-tight text-slate-900 xl:text-6xl">
              Your career journey
              <span className="block bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                starts here.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Analyze your resume, discover your strengths, close skill gaps,
              and prepare for the interviews that can shape your career.
            </p>

            <div className="mt-12 grid gap-4">
              <div className="flex items-center gap-5 rounded-xl border border-slate-200 bg-[#f8f9fc] p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-50 font-semibold text-indigo-600">
                  01
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Analyze your resume
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Get your ATS score and understand how your resume performs.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 rounded-xl border border-slate-200 bg-[#f8f9fc] p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-50 font-semibold text-indigo-600">
                  02
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Discover skill gaps
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Identify missing skills and get personalized recommendations.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 rounded-xl border border-slate-200 bg-[#f8f9fc] p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-50 font-semibold text-indigo-600">
                  03
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Prepare for interviews
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Practice relevant interview questions and build confidence.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-2 text-sm text-slate-500">
              One platform for your complete interview preparation journey
            </div>
          </div>
        </div>
      </section>

      <section className="relative flex min-h-screen items-center justify-center px-6 py-20 sm:px-10 lg:px-14 xl:px-20">
        <Link
          href="/"
          className="absolute left-6 top-6 flex items-center gap-3 lg:hidden"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 font-bold text-white">
            A
          </div>

          <span className="font-semibold text-slate-900">
            Apna Interview
          </span>
        </Link>

        <div className="w-full max-w-[520px]">
          <div className="mb-8">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900">
              Create your account
            </h2>

            <p className="mt-3 text-slate-500">
              Join Apna Interview and start preparing for your next opportunity.
            </p>
          </div>

          <button
            onClick={handleGoogleSignup}
            className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white px-5 py-3.5 font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            <FcGoogle size={22} />
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />

            <span className="text-xs font-medium text-slate-400">
              OR CONTINUE WITH EMAIL
            </span>

            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

            <PasswordInput
              placeholder="Password"
              value={password}
              onChange={setPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />

            {password && (
              <p
                className={`text-xs ${
                  passwordLength ? "text-emerald-600" : "text-red-500"
                }`}
              >
                {passwordLength
                  ? "✓ Password meets the minimum requirement."
                  : "Password must contain at least 8 characters."}
              </p>
            )}

            <PasswordInput
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              showPassword={showConfirmPassword}
              setShowPassword={setShowConfirmPassword}
            />

            {confirmPassword && (
              <p
                className={`text-xs ${
                  passwordsMatch ? "text-emerald-600" : "text-red-500"
                }`}
              >
                {passwordsMatch
                  ? "✓ Passwords match."
                  : "Passwords do not match."}
              </p>
            )}
          </div>

          {error && (
            <div className="mt-4 rounded-lg border border-red-100 bg-red-50 px-4 py-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <button
            onClick={handleRegister}
            disabled={loading}
            className="mt-6 flex w-full cursor-pointer items-center justify-center rounded-lg bg-slate-900 py-3.5 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {loading ? (
              <span className="flex items-center gap-3">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Creating account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>

          <p className="mt-7 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Log in
            </Link>
          </p>
        </div>
      </section>
    </div>
  </main>
);
}
