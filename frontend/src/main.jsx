import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './pages/auth/AuthContext.jsx';
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
      primary: {
        main: "#3e70ef",
      },
      secondary: {
        main: "#dc004e",
      },
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
          <App/>
      </ThemeProvider>
      <ToastContainer position="top-right" autoClose="3000"/>
    </AuthProvider>
  </StrictMode>,
)
