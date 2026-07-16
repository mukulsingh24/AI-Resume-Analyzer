"use client";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import PasswordInput from "@/components/passwordInput";
import { auth } from "../firebase/firebase";
export default function Login() {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleGoogleSignin = async () => {
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
  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Please fill all the fields.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    try {
      setLoading(true);
      const LoginCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log(LoginCredentials.user);
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case "auth/user-not-found":
            setError("No account found with this email.");
            break;

          case "auth/wrong-password":
            setError("Incorrect password.");
            break;

          case "auth/invalid-email":
            setError("Invalid email address.");
            break;

          default:
            setError(err.message);
        }
      } else {
        setError("Something went wrong.");
      }
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
              <div className="inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600">
                Welcome back
              </div>

              <h1 className="mt-7 max-w-xl text-5xl font-bold leading-[1.1] tracking-tight text-slate-900 xl:text-6xl">
                Pick up where
                <span className="block bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  you left off.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Sign in to continue improving your resume, explore your
                insights, and prepare for your next interview opportunity.
              </p>

              <div className="mt-12 grid gap-4">
                <div className="flex items-center gap-5 rounded-xl border border-slate-200 bg-[#f8f9fc] p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-50 font-semibold text-indigo-600">
                    01
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Continue your resume journey
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Analyze your latest resume and discover areas you can
                      improve.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-5 rounded-xl border border-slate-200 bg-[#f8f9fc] p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-50 font-semibold text-indigo-600">
                    02
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Access your insights
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Review your ATS feedback, strengths, skill gaps, and
                      recommendations.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-5 rounded-xl border border-slate-200 bg-[#f8f9fc] p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-50 font-semibold text-indigo-600">
                    03
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Get interview ready
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Continue practicing relevant questions for the roles you
                      want to target.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex items-center gap-2 text-sm text-slate-500">
                Your next opportunity starts with better preparation
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

            <span className="font-semibold text-slate-900">Apna Interview</span>
          </Link>

          <div className="w-full max-w-[520px]">
            <div className="mb-8">
              <h2 className="text-4xl font-bold tracking-tight text-slate-900">
                Welcome back
              </h2>

              <p className="mt-3 text-slate-500">
                Sign in to continue your preparation journey.
              </p>
            </div>

            <button
              onClick={handleGoogleSignin}
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
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

              <PasswordInput
                placeholder="Password"
                value={password}
                onChange={setPassword}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-500">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 accent-indigo-600"
                />
                Remember me
              </label>

              <Link
                href="/forgot"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                Forgot password?
              </Link>
            </div>

            {error && (
              <div className="mt-5 rounded-lg border border-red-100 bg-red-50 px-4 py-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="mt-6 flex w-full cursor-pointer items-center justify-center rounded-lg bg-slate-900 py-3.5 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {loading ? (
                <span className="flex items-center gap-3">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>

            <p className="mt-7 text-center text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Create an account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
