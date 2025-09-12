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

type TabId = "tab1" | "tab2";

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

const App = () => {
  const [activeTab, setActiveTab] = useState<TabId>("tab1");
  const [formData, setFormData] = useState<Record<TabId, FormData>>({
    tab1: { ...initialFormData },
    tab2: { ...initialFormData },
  });

  const [isLoading, setIsLoading] = useState(false);

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

  const getProjectId = () => {
    // Tab1: Promise To Pay
    // Tab2: Broken Promise
    if (activeTab === "tab1") {
      if (formData[activeTab].language === "en") {
        return "68b6adf2dba1fea8a2da3981";
      } else {
        return "68aebdf28348bea4eedb8fd4";
      }
    } else {
      if (formData[activeTab].language === "en") {
        return "68b6adf2dba1fea8a2da3981";
      } else {
        return "68aebdf28348bea4eedb8fd4";
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentData = formData[activeTab];

    const allFieldsFilled = Object.values(formData[activeTab]).every(
      (value) => value !== ""
    );
    if (!allFieldsFilled) {
      toast.error("Please fill in all the fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }

    try {
      await fetch("https://ai-caller-backend-f2v6.onrender.com/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...currentData, tab: activeTab }),
      });
      console.log("✅ Form data saved to backend");
    } catch (err) {
      console.error("❌ Failed to save form data", err);
    }

    setIsLoading(true);
    const apiUrl = "https://api.vodex.ai/api/v1/trigger-call";
    const headers = {
      dburl: "Vodex_1711541026020",
      "Content-Type": "application/json",
      Authorization: "89759125-621a-4733-abdd-00b03826e162",
    };
    const body = JSON.stringify({
      callList: [
        {
          FirstName: formData[activeTab].firstName,
          LastName: formData[activeTab].lastName,
          Gender: formData[activeTab].gender,
          amount: "5000",
          DueDate: "1/9/2025",
          today: "",
          time_zone: "Asia/Dubai",
          phone: formData[activeTab].phoneNumber,
        },
      ],
      consentForCalls: true,
      projectId: getProjectId(),
    });

    fetch(apiUrl, { method: "POST", headers, body })
      .then((response) => {
        setIsLoading(false);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        toast.success("📞 Call triggered", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        toast.error("❌ cannot trigger the call.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      });
  };

  const getCurrentFormData = () => formData[activeTab];

  return (
    <>
      <ToastContainer />
      <div className="relative bg-zinc-950 overflow-hidden p-8 md:p-28">
        <div className="flex md:flex-row flex-col items-center gap-4">
          <img
            src="./svgviewer-output.svg"
            alt="cleargrid_logo"
            height={41}
            width={154}
          />
          <div className="w-0.5 h-14 bg-white md:block hidden"></div>
          <div className="justify-start text-white text-4xl font-medium">
            AI Agent Dashboard
          </div>
        </div>
        <div className="text-white/90 text-xl font-light mt-2.5">
          Manage workflows for broken promises, PTP follow-ups, and fresh
          delinquencies
        </div>

        <div className="justify-start text-white text-2xl font-medium mt-12">
          Overall Performance Metrics by AI Agents
        </div>

        <div className="bg-gray-900 rounded-2xl my-6 flex items-center p-6 lg:p-0">
          <div className="w-3.5 h-28 bg-indigo-300 rounded-tl-2xl rounded-bl-2xl lg:block hidden" />
          <div className="h-full w-full grid grid-cols-1 gap-4 md:gap-0 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-baseline gap-2">
                <div className="text-white text-4xl">38%</div>
                <img
                  src="./group-9135.svg"
                  height={19}
                  width={27}
                  alt="group-9135"
                />
              </div>
              <div className="text-neutral-300 font-light">
                Collections Improvement
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-baseline gap-2">
                <div className="text-white text-4xl">2x</div>
                <img
                  src="./lucide_history.svg"
                  height={19}
                  width={27}
                  alt="lucide_history"
                />
              </div>
              <div className="text-neutral-300 font-light">
                Faster Time-to-Resolution
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-baseline gap-2">
                <div className="text-white text-4xl">60%</div>
                <img
                  src="./group-9135.svg"
                  height={19}
                  width={27}
                  alt="group-9135"
                />
              </div>
              <div className="text-neutral-300 font-light">Engagement</div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="items-baseline gap-2">
                <div className="text-[#93A2E7] text-4xl">4.8</div>
              </div>
              <div className="text-neutral-300 font-light">CSAT</div>
            </div>
          </div>
        </div>

        <div className="text-white text-3xl font-medium mt-20">Workflows</div>

        <div className="mt-4">
          <div className="flex bg-slate-800 rounded-t-4xl">
            <div
              className={`flex items-center justify-center px-4 py-2 w-full rounded-t-4xl cursor-pointer ${
                activeTab === "tab1"
                  ? "text-white bg-indigo-300"
                  : "text-slate-400"
              }`}
              onClick={() => setActiveTab("tab1")}
            >
              <div className="flex flex-col justify-center items-center">
                <p className="text-white text-xl font-bold">Promise To Pay</p>
                {activeTab === "tab1" && (
                  <p className="text-white/80">
                    Follow up on promised payments
                  </p>
                )}
              </div>
            </div>
            <div
              className={`flex items-center justify-center px-4 py-2 w-full rounded-t-4xl cursor-pointer ${
                activeTab === "tab2"
                  ? "text-white bg-indigo-300"
                  : "text-slate-400"
              }`}
              onClick={() => setActiveTab("tab2")}
            >
              <div className="flex flex-col justify-center items-center">
                <p className="text-white text-xl font-bold">Broken Promise</p>
                {activeTab === "tab2" && (
                  <p className="text-white/80">
                    Follow up after missed commitments
                  </p>
                )}
              </div>
            </div>
          </div>
          {activeTab === "tab1" && (
            <div className="p-8 bg-gray-900 rounded-b-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                <div className="grid gap-2">
                  <div className="text-white">Preset</div>
                  <input
                    type="text"
                    name="preset"
                    value={getCurrentFormData().preset}
                    onChange={handleInputChange}
                    className="bg-gray-700 rounded-lg w-full text-white p-4"
                    placeholder="Select Preset"
                    readOnly
                    disabled
                  />
                </div>
                <div className="grid gap-2">
                  <div className="text-white">Language</div>
                  <select
                    name="language"
                    value={getCurrentFormData().language}
                    onChange={handleInputChange}
                    className="bg-zinc-950 rounded-lg w-full text-white p-4"
                  >
                    <option value="">Select Language</option>
                    <option value="en">English</option>
                    <option value="ar">Arabic</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <div className="text-white">First Name</div>
                  <input
                    type="text"
                    name="firstName"
                    value={getCurrentFormData().firstName}
                    onChange={handleInputChange}
                    className="bg-zinc-950 rounded-lg w-full text-white p-4"
                    placeholder="Enter First Name"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="text-white">Last Name</div>
                  <input
                    type="text"
                    name="lastName"
                    value={getCurrentFormData().lastName}
                    onChange={handleInputChange}
                    className="bg-zinc-950 rounded-lg w-full text-white p-4"
                    placeholder="Enter Last Name"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="text-white">Gender</div>
                  <select
                    name="gender"
                    value={getCurrentFormData().gender}
                    onChange={handleInputChange}
                    className="bg-zinc-950 rounded-lg w-full text-white p-4"
                  >
                    <option value="">Select Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <div className="text-white">Phone Number</div>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={getCurrentFormData().phoneNumber}
                    onChange={handleInputChange}
                    className="bg-zinc-950 rounded-lg w-full text-white p-4"
                    placeholder="Enter Phone Number"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="text-white">Email</div>
                  <input
                    type="email"
                    name="email"
                    value={getCurrentFormData().email}
                    onChange={handleInputChange}
                    className="bg-zinc-950 rounded-lg w-full text-white p-4"
                    placeholder="Enter Email"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="text-white">Company</div>
                  <input
                    type="text"
                    name="company"
                    value={getCurrentFormData().company}
                    onChange={handleInputChange}
                    className="bg-zinc-950 rounded-lg w-full text-white p-4"
                    placeholder="Enter Company"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={getCurrentFormData().agreeToTerms}
                    onChange={handleInputChange}
                    className="appearance-auto relative w-4 h-4 border-2 border-gray-400 rounded-sm"
                  />
                  <div className="justify-start">
                    <span className="text-stone-300 ">
                      I agree to receive ONE demo call.{" "}
                    </span>
                    <span className="text-slate-500 ">
                      Terms and conditions
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-8">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-72 h-11 bg-indigo-300 rounded-3xl text-white hover:cursor-pointer hover:bg-indigo-400 transition-colors"
                >
                  {isLoading ? "Loading..." : "Call"}
                </button>
              </div>
            </div>
          )}
          {activeTab === "tab2" && (
            <div className="p-8 bg-gray-900 rounded-b-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                <div className="grid gap-2">
                  <div className="text-white">Preset</div>
                  <input
                    type="text"
                    name="preset"
                    value={getCurrentFormData().preset}
                    onChange={handleInputChange}
                    className="bg-gray-700 rounded-lg w-full text-white p-4"
                    placeholder="Select Preset"
                    readOnly
                    disabled
                  />
                </div>
                <div className="grid gap-2">
                  <div className="text-white">Language</div>
                  <select
                    name="language"
                    value={getCurrentFormData().language}
                    onChange={handleInputChange}
                    className="bg-zinc-950 rounded-lg w-full text-white p-4"
                  >
                    <option value="">Select Language</option>
                    <option value="en">English</option>
                    <option value="ar">Arabic</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <div className="text-white">First Name</div>
                  <input
                    type="text"
                    name="firstName"
                    value={getCurrentFormData().firstName}
                    onChange={handleInputChange}
                    className="bg-zinc-950 rounded-lg w-full text-white p-4"
                    placeholder="Enter First Name"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="text-white">Last Name</div>
                  <input
                    type="text"
                    name="lastName"
                    value={getCurrentFormData().lastName}
                    onChange={handleInputChange}
                    className="bg-zinc-950 rounded-lg w-full text-white p-4"
                    placeholder="Enter Last Name"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="text-white">Gender</div>
                  <select
                    name="gender"
                    value={getCurrentFormData().gender}
                    onChange={handleInputChange}
                    className="bg-zinc-950 rounded-lg w-full text-white p-4"
                  >
                    <option value="">Select Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <div className="text-white">Phone Number</div>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={getCurrentFormData().phoneNumber}
                    onChange={handleInputChange}
                    className="bg-zinc-950 rounded-lg w-full text-white p-4"
                    placeholder="Enter Phone Number"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="text-white">Email</div>
                  <input
                    type="email"
                    name="email"
                    value={getCurrentFormData().email}
                    onChange={handleInputChange}
                    className="bg-zinc-950 rounded-lg w-full text-white p-4"
                    placeholder="Enter Email"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="text-white">Company</div>
                  <input
                    type="text"
                    name="company"
                    value={getCurrentFormData().company}
                    onChange={handleInputChange}
                    className="bg-zinc-950 rounded-lg w-full text-white p-4"
                    placeholder="Enter Company"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={getCurrentFormData().agreeToTerms}
                    onChange={handleInputChange}
                    className="appearance-auto relative w-4 h-4 border-2 border-gray-400 rounded-sm"
                  />
                  <div className="justify-center">
                    <span className="text-stone-300 ">
                      I agree to receive ONE demo call.{" "}
                    </span>
                    <span className="text-slate-500 ">
                      Terms and conditions
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-8">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-72 h-11 bg-indigo-300 rounded-3xl text-white hover:cursor-pointer hover:bg-indigo-400 transition-colors "
                >
                  {isLoading ? "Loading..." : "Call"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default App;
