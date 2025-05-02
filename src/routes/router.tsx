import { Routes, Route } from "react-router-dom";
import ConfirmationPage from "../features/form/ConfirmationPage.tsx";
import SupportForm from "../features/form/SupportForm.tsx";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<SupportForm />} />
      <Route path="/confirmation" element={<ConfirmationPage />} />
    </Routes>
  );
}
