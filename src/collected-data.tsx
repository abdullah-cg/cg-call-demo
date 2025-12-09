import { useEffect, useState } from "react";

interface FormData {
  _id: string;
  preset: string;
  language: string;
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  email: string;
  company: string;
  agreeToTerms: boolean;
  tab: string;
  createdAt: string;
}

const CollectedData = () => {
  const [forms, setForms] = useState<FormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/forms")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch forms");
        return res.json();
      })
      .then((data) => {
        setForms(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch forms:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const workflowNames: Record<string, string> = {
    ptp: "Promise To Pay",
    broken: "Broken Promise",
    fresh: "Jabi",
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white antialiased">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <img
                src="./svgviewer-output.svg"
                alt="cleargrid_logo"
                height={41}
                width={154}
              />
            </div>
            <a
              href="/"
              className="px-4 py-2 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/[0.05] transition-colors"
            >
              ← Back to Dashboard
            </a>
          </div>
          <h1 className="text-2xl md:text-[26px] font-medium text-white/90">
            Form Submissions
          </h1>
          <p className="text-white/50 text-[15px] mt-2">
            View all collected form data and call triggers
          </p>
        </header>

        {/* Content */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-7">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <svg
                className="w-8 h-8 animate-spin text-indigo-300"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span className="ml-3 text-white/50">Loading forms...</span>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-400">❌ {error}</p>
            </div>
          ) : forms.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/40">No forms submitted yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="p-3 text-[13px] font-medium text-white/60">
                      Workflow
                    </th>
                    <th className="p-3 text-[13px] font-medium text-white/60">
                      Name
                    </th>
                    <th className="p-3 text-[13px] font-medium text-white/60">
                      Email
                    </th>
                    <th className="p-3 text-[13px] font-medium text-white/60">
                      Phone
                    </th>
                    <th className="p-3 text-[13px] font-medium text-white/60">
                      Company
                    </th>
                    <th className="p-3 text-[13px] font-medium text-white/60">
                      Language
                    </th>
                    <th className="p-3 text-[13px] font-medium text-white/60">
                      Created
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {forms.map((form) => (
                    <tr
                      key={form._id}
                      className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="p-3 text-sm">
                        <span className="px-2 py-1 bg-indigo-300/10 text-indigo-300 rounded-lg text-xs font-medium">
                          {workflowNames[form.tab] || form.tab}
                        </span>
                      </td>
                      <td className="p-3 text-sm text-white/90">
                        {form.firstName} {form.lastName}
                      </td>
                      <td className="p-3 text-sm text-white/70">
                        {form.email}
                      </td>
                      <td className="p-3 text-sm text-white/70 font-mono">
                        {form.phoneNumber}
                      </td>
                      <td className="p-3 text-sm text-white/70">
                        {form.company}
                      </td>
                      <td className="p-3 text-sm text-white/70">
                        {form.language === "en" ? "🇬🇧 English" : "🇸🇦 Arabic"}
                      </td>
                      <td className="p-3 text-sm text-white/50">
                        {new Date(form.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Stats */}
        {!loading && !error && forms.length > 0 && (
          <div className="mt-6 text-center text-white/40 text-sm">
            Total submissions:{" "}
            <span className="text-white/70 font-medium">{forms.length}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectedData;
