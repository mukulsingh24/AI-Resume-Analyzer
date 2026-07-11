import { FiUploadCloud, FiCpu, FiEdit2, FiMic } from "react-icons/fi";
import type { IconType } from "react-icons";
type Step = {
  icon: IconType;
  title: string;
  description: string;
};
const steps: Step[] = [
  {
    icon: FiUploadCloud,
    title: "Upload Resume",
    description: "Drop in your PDF or DOCX — no formatting cleanup required.",
  },
  {
    icon: FiCpu,
    title: "AI Analysis",
    description:
      "Our model scores it against ATS rules and the job description you're targeting.",
  },
  {
    icon: FiEdit2,
    title: "Improve Resume",
    description:
      "Apply AI suggestions to close skill gaps and strengthen weak bullet points.",
  },
  {
    icon: FiMic,
    title: "Practice Interview",
    description:
      "Rehearse likely interview questions and refine your answers with real feedback.",
  },
];
export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-slate-50/60 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[13px] font-semibold uppercase tracking-wider text-blue-600">
            How It Works
          </span>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            From upload to offer, in four steps
          </h2>
        </div>
        <div className="relative mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-6 hidden h-px bg-slate-200 lg:block"
            style={{ marginInline: "12.5%" }}
          />
          {steps.map(({ icon: Icon, title, description }, i) => (
            <div key={title} className="relative flex flex-col items-start">
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-600 shadow-sm">
                <Icon size={20} />
              </div>
              <span className="mt-4 text-[12px] font-semibold tracking-wider text-slate-400">
                STEP {i + 1}
              </span>
              <h3 className="font-display mt-1.5 text-[17px] font-semibold text-slate-900">
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
