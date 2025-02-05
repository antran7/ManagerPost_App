import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UserPostManager from "./pages/UserPostManager";
import HomePage from "./pages/HomePage";
import AdminPostManagement from "./pages/admin-management/AdminPostManagement";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/user-posts" element={<UserPostManager />} />
          <Route path="/admin-posts" element={<AdminPostManagement />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
