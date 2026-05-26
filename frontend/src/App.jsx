import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import Registerpage from "./pages/auth/RegisterPage";
import EmployeeListPage from "./pages/employee/EmployeeListPage";
import ProtectedRoute from "./pages/auth/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
              <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path = "/login" element={ <LoginPage/> } />
                <Route path = "/register" element={ <Registerpage/> } />
                <Route path = "/employees" 
                  element={ <ProtectedRoute><EmployeeListPage/></ProtectedRoute>} />
              </Routes>
        </BrowserRouter>
    );
  }

export default App;
