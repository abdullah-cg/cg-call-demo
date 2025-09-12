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

  useEffect(() => {
    fetch("https://ai-caller-backend-f2v6.onrender.com/api/forms")
      .then((res) => res.json())
      .then((data) => setForms(data))
      .catch((err) => console.error("❌ Failed to fetch forms:", err));
  }, []);

  return (
    <div className="container mx-auto">
      <div className="p-6 bg-gray-900 rounded-2xl text-white">
        <h2 className="text-2xl font-bold mb-4">Saved Forms</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-2">First Name</th>
              <th className="p-2">Last Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Company</th>
              <th className="p-2">Created</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form) => (
              <tr key={form._id} className="border-b border-gray-800">
                <td className="p-2">{form.firstName}</td>
                <td className="p-2">{form.lastName}</td>
                <td className="p-2">{form.email}</td>
                <td className="p-2">{form.phoneNumber}</td>
                <td className="p-2">{form.company}</td>
                <td className="p-2">
                  {new Date(form.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CollectedData;
