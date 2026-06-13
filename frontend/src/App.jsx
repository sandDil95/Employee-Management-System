import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import Registerpage from "./pages/auth/RegisterPage";
import EmployeeListPage from "./pages/employee/EmployeeListPage";
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import CreateEmployeePage from "./pages/employee/CreateEmployeePage"; 
import EditEmployeepage  from "./pages/employee/EditEmployeePage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";

function App() {
    return (
        <BrowserRouter>
              <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path = "/login" element={ <LoginPage/> } />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path = "/register" element={ <Registerpage/> } />
                <Route path = "/employees" 
                  element = { <ProtectedRoute><EmployeeListPage/></ProtectedRoute>} />
                <Route path = "/employees/create"
                  element = { <ProtectedRoute><CreateEmployeePage /></ProtectedRoute>}/>
                <Route path = "/employees/edit/:id"
                  element = { <ProtectedRoute><EditEmployeepage /></ProtectedRoute>}/>
              </Routes>
        </BrowserRouter>
    );
  }

export default App;
