import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";

const isValidFormData = (data: any) => {
  if (!data) return false;

  if (!data.fullName?.trim() || !data.email?.trim() || !data.issueType) {
    return false;
  }

  if (
    !data.steps?.length ||
    !data.steps.some((step: any) => step.step?.trim())
  ) {
    return false;
  }

  return true;
};

export default function ConfirmationPage() {
  const formData = useSelector((state: RootState) => state.form);
  const navigate = useNavigate();

  if (!isValidFormData(formData)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-xl w-full mx-4 p-8 bg-white rounded-xl shadow-lg text-center">
          <p className="text-red-500 mb-4">
            No form data found. Please fill out the form first.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-xl w-full mx-4 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Submission Confirmed!
          </h2>
          <p className="mt-2 text-gray-600">Thank you for your submission.</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-700">
              Your Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{formData.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{formData.email}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-700">
              Issue Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Issue Type</p>
                <p className="font-medium">{formData.issueType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tags</p>
                <p className="font-medium">
                  {formData.tags?.join(", ") || "None"}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-700">
              Steps to Reproduce
            </h3>
            <ol className="list-decimal list-inside space-y-2">
              {formData.steps.map((s, i) => (
                <li key={i} className="text-gray-700">
                  {s.step}
                </li>
              ))}
            </ol>
          </div>

          <div className="flex justify-center gap-4 pt-6">
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
