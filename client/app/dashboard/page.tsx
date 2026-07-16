"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useRouter } from "next/navigation";
import ResumeUpload from "@/components/dashboard/ResumeUpload";
import { Analysis } from "@/types/analysis";
export default function Dashboard() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      } else {
        setCheckingAuth(false);
      }
    });

    return () => unsubscribe();
  }, [router]);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/login");
    } catch (err) {
      console.error(err);
    }
  };
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading
      </div>
    );
  }
  return (
    <main className="min-h-screen bg-slate-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">Apna Interview</h1>
            <p className="text-sm text-gray-500">
              AI Resume Analyzer Dashboard
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </header>
      <div className="max-w-6xl mx-auto p-8">
        <ResumeUpload onAnalysisComplete={setAnalysis} />
        {analysis && (
          <div className="mt-10 space-y-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-xl font-semibold">ATS Score</h3>
              <p className="text-4xl font-bold mt-3 text-blue-600">
                {analysis.atsScore}%
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-xl font-semibold">Summary</h3>
              <p className="text-gray-600 mt-3">{analysis.summary}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-xl font-semibold">Strengths</h3>

                <ul className="mt-4 space-y-2">
                  {analysis.strengths.map((strength, index) => (
                    <li key={index}>✓ {strength}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-xl font-semibold">Missing Skills</h3>

                <ul className="mt-4 space-y-2">
                  {analysis.missingSkills.map((skill, index) => (
                    <li key={index}>• {skill}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-xl font-semibold">Suggestions</h3>

              <ul className="mt-4 space-y-3">
                {analysis.suggestions.map((suggestion, index) => (
                  <li key={index}>
                    {index + 1}. {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
