import { Routes, Route, Navigate } from "react-router";

import Login from "../pages/Login/Login";
import Profile from "../pages/Profile/Profile";
import Layout from "../layouts/Layout";
import Form from "../pages/Form/Form";

export default function MainRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/form" element={<Form />} />
      </Route>
    </Routes>
  );
}
