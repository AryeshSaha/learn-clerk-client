import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import AppLayout from "./components/layout/AppLayout";
import Home from "./pages/public/home";
import Auth from "./pages/public/auth";
import ProtectedRoute from "./components/auth/protectedRoute";
import Dashboard from "./pages/protected/dashboard";
import AccountDetails from "./pages/protected/accountDetails";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/account-details" element={<AccountDetails />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
