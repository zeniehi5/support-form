import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";

export default function ConfirmationPage() {
  const formData = useSelector((state: RootState) => state.form);
  const navigate = useNavigate();

  if (!formData) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500">
          No form data found. Please fill out the form first.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-blue-600 underline"
        >
          Go to Form
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Submission Confirmation</h2>
      <p>
        <strong>Full Name:</strong> {formData.fullName}
      </p>
      <p>
        <strong>Email:</strong> {formData.email}
      </p>
      <p>
        <strong>Issue Type:</strong> {formData.issueType}
      </p>
      <p>
        <strong>Tags:</strong> {formData.tags?.join(", ") || "None"}
      </p>
      <div>
        <strong>Steps to Reproduce:</strong>
        <ul className="list-disc list-inside">
          {formData.steps.map((s, i) => (
            <li key={i}>{s.step}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
