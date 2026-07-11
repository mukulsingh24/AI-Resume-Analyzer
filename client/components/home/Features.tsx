import {
  FiFileText,
  FiActivity,
  FiTarget,
  FiEdit3,
  FiMic,
  FiTrendingUp,
} from "react-icons/fi";
import type { IconType } from "react-icons";
type Feature = {
  icon: IconType;
  title: string;
  description: string;
};
const features: Feature[] = [
  {
    icon: FiFileText,
    title: "Deep Resume Analysis",
    description:
      "We parse every section of your resume — summary, experience, skills — and flag exactly what's holding it back.",
  },
  {
    icon: FiActivity,
    title: "ATS Compatibility Score",
    description:
      "See how applicant tracking systems actually read your resume, scored out of 100 with a full section breakdown.",
  },
  {
    icon: FiTarget,
    title: "Skill Gap Detection",
    description:
      "Paste a job description and instantly see which required skills your resume is missing.",
  },
  {
    icon: FiEdit3,
    title: "AI Rewrite Suggestions",
    description:
      "Get line-by-line rewrites that turn vague bullet points into achievement-driven statements.",
  },
  {
    icon: FiMic,
    title: "Interview Preparation",
    description:
      "Practice with role-specific questions and get feedback on clarity, structure, and confidence.",
  },
  {
    icon: FiTrendingUp,
    title: "Progress Tracking",
    description:
      "Track score improvements and interview readiness over time, resume version by version.",
  },
];
export default function Features() {
  return (
    <section id="features" className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[13px] font-semibold uppercase tracking-wider text-blue-600">
            Features
          </span>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Everything you need to get hired
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            One platform that reads your resume the way recruiters and
            algorithms do — then gets you ready for what comes after.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_40px_-16px_rgba(15,23,42,0.12)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors duration-300 group-hover:bg-linear-to-br group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white">
                <Icon size={20} />
              </div>
              <h3 className="font-display mt-5 text-[17px] font-semibold text-slate-900">
                {title}
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-slate-600">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
