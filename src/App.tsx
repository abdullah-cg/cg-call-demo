import { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";

interface FormData {
  preset: string;
  language: string;
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  email: string;
  company: string;
  agreeToTerms: boolean;
}

type TabId = "ptp" | "broken" | "fresh";

interface Tab {
  id: TabId;
  label: string;
  description: string;
}

interface CallConfirmationModalProps {
  isVisible: boolean;
  onClose: () => void;
  recipientName: string;
  phoneNumber: string;
}

const initialFormData: FormData = {
  preset: "Balance",
  language: "",
  firstName: "",
  lastName: "",
  gender: "",
  phoneNumber: "",
  email: "",
  company: "",
  agreeToTerms: false,
};

const tabs: Tab[] = [
  {
    id: "ptp",
    label: "Promise To Pay",
    description: "Follow up on promised payments",
  },
  {
    id: "broken",
    label: "Broken Promise",
    description: "Follow up after missed commitments",
  },
  {
    id: "fresh",
    label: "Talk to Jabi",
    description:
      "Jabi steps outside the call flow to show you its logic, capabilities, and tone on command",
  },
];

const CallConfirmationModal = ({
  isVisible,
  onClose,
  recipientName,
  phoneNumber,
}: CallConfirmationModalProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center animate-fadeIn">
      <div className="max-w-[400px] w-[90%] bg-[#141417] border border-white/10 rounded-[20px] p-9 text-center animate-slideUp">
        {/* Phone icon with pulse */}
        <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(16,185,129,0.3)] animate-gentle-pulse">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        </div>

        <h2 className="text-[22px] font-semibold text-white mb-2">
          Call Triggered
        </h2>

        <p className="text-[15px] text-white/50 mb-6 leading-relaxed">
          Our AI agent will call{" "}
          <span className="text-white">{recipientName}</span> shortly
        </p>

        <div className="bg-white/5 rounded-xl py-3.5 px-5 mb-7 flex items-center justify-center gap-2.5">
          <svg
            className="w-4 h-4 text-white/40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <span className="text-[15px] text-white/70 font-mono tracking-wide">
            {phoneNumber}
          </span>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 px-6 bg-gradient-to-br from-indigo-300 to-indigo-400 rounded-xl font-medium text-white shadow-lg shadow-indigo-300/25 hover:shadow-xl hover:shadow-indigo-300/30 transition-all"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

const TabIcon = ({ id, active }: { id: TabId; active: boolean }) => {
  const className = `w-[18px] h-[18px] ${
    active ? "text-white" : "text-white/50"
  }`;

  if (id === "ptp") {
    return (
      <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    );
  }
  if (id === "broken") {
    return (
      <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    );
  }
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="8"
        r="4"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5 20v-1a7 7 0 0114 0v1"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4 8h1a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M20 8h-1a1 1 0 00-1 1v2a1 1 0 001 1h1a1 1 0 001-1V9a1 1 0 00-1-1z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6 8a6 6 0 0112 0"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState<TabId>("ptp");
  const [formData, setFormData] = useState<Record<TabId, FormData>>({
    ptp: { ...initialFormData },
    broken: { ...initialFormData },
    fresh: { ...initialFormData },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = "checked" in e.target ? e.target.checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  const getCurrentFormData = () => formData[activeTab];

  const getProjectId = (): string => {
    const currentData = formData[activeTab];
    const isEnglish = currentData.language === "en";

    const projectIds: Record<TabId, { en: string; ar: string }> = {
      ptp: {
        en: "68b6adf2dba1fea8a2da3981",
        ar: "68aebdf28348bea4eedb8fd4",
      },
      broken: {
        en: "68c8045da78c79da04f2fc80",
        ar: "68c80475ebef60f998708c3f",
      },
      fresh: {
        en: "YOUR_FRESH_EN_PROJECT_ID", // TODO: Add project ID
        ar: "YOUR_FRESH_AR_PROJECT_ID", // TODO: Add project ID
      },
    };

    return isEnglish ? projectIds[activeTab].en : projectIds[activeTab].ar;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentData = formData[activeTab];

    const requiredFields = [
      "language",
      "firstName",
      "lastName",
      "gender",
      "phoneNumber",
      "email",
      "company",
    ];
    const missingFields = requiredFields.filter(
      (field) => !currentData[field as keyof FormData]
    );

    if (missingFields.length > 0 || !currentData.agreeToTerms) {
      toast.error("Please fill in all fields and accept terms", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }

    // Save form data to backend
    try {
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...currentData, tab: activeTab }),
      });

      if (!response.ok) {
        throw new Error("Failed to save form data");
      }

      console.log("✅ Form data saved to backend and Slack notification sent");
    } catch (err) {
      console.error("❌ Failed to save form data", err);
      toast.error("Failed to save form data", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);

    const apiUrl = "https://api.vodex.ai/api/v1/trigger-call";
    const headers = {
      dburl: "Vodex_1711541026020",
      "Content-Type": "application/json",
      Authorization: "89759125-621a-4733-abdd-00b03826e162",
    };

    // Build call payload based on workflow type
    let callData: Record<string, string> = {
      FirstName: currentData.firstName,
      LastName: currentData.lastName,
      Gender: currentData.gender,
      amount: "5000",
      time_zone: "Asia/Dubai",
      phone: currentData.phoneNumber,
    };

    if (activeTab === "ptp") {
      callData = { ...callData, DueDate: "1/9/2025", today: "" };
    } else if (activeTab === "broken") {
      callData = {
        ...callData,
        DueDate: "20/8/2025",
        today: "",
        PurchaseDate: "1/8/2025",
        PTPDate: "10/9/2025",
      };
    } else if (activeTab === "fresh") {
      callData = {
        ...callData,
        DueDate: "15/9/2025",
        today: "",
        DaysPastDue: "7",
      };
    }

    const body = JSON.stringify({
      callList: [callData],
      consentForCalls: true,
      projectId: getProjectId(),
    });

    fetch(apiUrl, { method: "POST", headers, body })
      .then((response) => {
        setIsSubmitting(false);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setShowConfirmation(true);
      })
      .catch((error) => {
        console.error(error);
        setIsSubmitting(false);
        toast.error("❌ Cannot trigger the call.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          transition: Bounce,
        });
      });
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    toast.success("📞 Call is on its way", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      transition: Bounce,
    });
  };

  const currentData = getCurrentFormData();

  const formFields = [
    { label: "Preset", name: "preset", type: "text", disabled: true },
    {
      label: "Language",
      name: "language",
      type: "select",
      options: [
        { value: "", label: "Select Language" },
        { value: "en", label: "English" },
        { value: "ar", label: "Arabic" },
      ],
    },
    {
      label: "First Name",
      name: "firstName",
      type: "text",
      placeholder: "Enter First Name",
    },
    {
      label: "Last Name",
      name: "lastName",
      type: "text",
      placeholder: "Enter Last Name",
    },
    {
      label: "Gender",
      name: "gender",
      type: "select",
      options: [
        { value: "", label: "Select Gender" },
        { value: "M", label: "Male" },
        { value: "F", label: "Female" },
      ],
    },
    {
      label: "Phone Number",
      name: "phoneNumber",
      type: "tel",
      placeholder: "Enter Phone Number",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter Email",
    },
    {
      label: "Company",
      name: "company",
      type: "text",
      placeholder: "Enter Company",
    },
  ];

  return (
    <>
      <ToastContainer />

      <CallConfirmationModal
        isVisible={showConfirmation}
        onClose={handleCloseConfirmation}
        recipientName={
          `${currentData.firstName} ${currentData.lastName}`.trim() || "Contact"
        }
        phoneNumber={currentData.phoneNumber || "+971 XX XXX XXXX"}
      />

      <div className="min-h-screen bg-[#09090b] text-white antialiased">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
          {/* Header */}
          <header className="mb-12">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src="./svgviewer-output.svg"
                    alt="cleargrid_logo"
                    height={41}
                    width={154}
                  />
                </div>
                <div className="hidden md:block w-px h-6 bg-white/20" />
                <h1 className="text-2xl md:text-[26px] font-medium text-white/90">
                  AI Agent Dashboard
                </h1>
              </div>
              <a
                href="/collected-data"
                className="px-4 py-2 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/[0.05] transition-colors flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                View Submissions
              </a>
            </div>
            <p className="text-white/50 text-[15px] max-w-xl">
              Manage workflows for broken promises, PTP follow-ups, and fresh
              delinquencies
            </p>
          </header>

          {/* Performance Metrics */}
          <section className="mb-14">
            <h2 className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.08em] mb-4">
              Performance Metrics
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { value: "38%", label: "Collections Improvement", icon: "up" },
                {
                  value: "2x",
                  label: "Faster Time-to-Resolution",
                  icon: "time",
                },
                { value: "60%", label: "Engagement Rate", icon: "up" },
                { value: "4.8", label: "CSAT Score", icon: "star" },
              ].map((metric, i) => (
                <div
                  key={i}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 hover:bg-white/[0.05] transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[28px] font-semibold ${
                        metric.icon === "star" ? "text-indigo-300" : ""
                      }`}
                    >
                      {metric.value}
                    </span>
                    {metric.icon === "up" && (
                      <svg
                        className="w-4 h-4 text-emerald-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                    )}
                    {metric.icon === "time" && (
                      <svg
                        className="w-4 h-4 text-indigo-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                    {metric.icon === "star" && (
                      <svg
                        className="w-4 h-4 text-amber-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    )}
                  </div>
                  <p className="text-[13px] text-white/40">{metric.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Workflows */}
          <section>
            <h2 className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.08em] mb-4">
              Workflows
            </h2>

            {/* Tab Navigation */}
            <div className="flex gap-1.5 p-1 bg-white/[0.03] rounded-2xl border border-white/[0.06] mb-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 rounded-xl font-medium text-[13px] transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-br from-indigo-300 to-indigo-400 text-white shadow-lg shadow-indigo-300/25"
                      : "text-white/50 hover:text-white/70 hover:bg-white/[0.03]"
                  }`}
                >
                  <TabIcon id={tab.id} active={activeTab === tab.id} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Description */}
            <div className="text-center py-3 mb-3">
              <p className="text-white/40 text-[13px]">
                {tabs.find((t) => t.id === activeTab)?.description}
              </p>
            </div>

            {/* Form Card */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px] mb-5">
                {formFields.map((field) => (
                  <div key={field.name} className="space-y-2">
                    <label className="text-[13px] font-medium text-white/60">
                      {field.label}
                    </label>
                    {field.type === "select" ? (
                      <select
                        name={field.name}
                        value={
                          currentData[field.name as keyof FormData] as string
                        }
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-3 bg-[#0f0f12] border border-white/[0.08] rounded-[10px] text-white text-sm cursor-pointer hover:border-indigo-300/30 focus:border-indigo-300/50 focus:ring-2 focus:ring-indigo-300/20 transition-all outline-none"
                      >
                        {field.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        value={
                          currentData[field.name as keyof FormData] as string
                        }
                        onChange={handleInputChange}
                        placeholder={field.placeholder}
                        disabled={field.disabled}
                        className={`w-full px-3.5 py-3 border border-white/[0.08] rounded-[10px] text-sm transition-all outline-none ${
                          field.disabled
                            ? "bg-white/[0.03] text-white/40 cursor-not-allowed"
                            : "bg-[#0f0f12] text-white placeholder:text-white/30 hover:border-indigo-300/30 focus:border-indigo-300/50 focus:ring-2 focus:ring-indigo-300/20"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center gap-3 mb-6">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  id="agreeToTerms"
                  checked={currentData.agreeToTerms}
                  onChange={handleInputChange}
                  className="w-[18px] h-[18px] accent-indigo-300 cursor-pointer"
                />
                <label
                  htmlFor="agreeToTerms"
                  className="text-[13px] text-white/50 cursor-pointer"
                >
                  I agree to receive{" "}
                  <span className="text-white/70">ONE demo call</span>.{" "}
                  <span className="text-indigo-300/70 hover:text-indigo-300 cursor-pointer transition-colors">
                    Terms and conditions
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full max-w-[300px] py-3.5 px-7 bg-gradient-to-r from-indigo-300 to-indigo-400 rounded-[14px] font-medium text-white text-[15px] shadow-lg shadow-indigo-300/30 hover:shadow-xl hover:shadow-indigo-300/35 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2.5"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="w-[18px] h-[18px] animate-spin"
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
                      <span>Triggering...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-[18px] h-[18px]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span>Trigger Call</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-14 pt-7 border-t border-white/[0.06]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] text-white/30">
              <p>© 2025 ClearGrid. All rights reserved.</p>
              <div className="flex items-center gap-6">
                <span className="hover:text-white/50 cursor-pointer transition-colors">
                  Privacy
                </span>
                <span className="hover:text-white/50 cursor-pointer transition-colors">
                  Terms
                </span>
                <span className="hover:text-white/50 cursor-pointer transition-colors">
                  Support
                </span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default App;
