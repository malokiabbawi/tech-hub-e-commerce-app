import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Products from "./components/Products";
import Users from "./components/Users";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ProductDetail from "./components/ProductDetail";

const AppContent = () => {
  const { darkMode } = useTheme();

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#4A90E2", 
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: darkMode ? "#FFB74D" : "#66BB6A", 
      },
      background: {
        default: darkMode ? "#1D1D2C" : "#F0F2F5",
        paper: darkMode ? "#2A2A3A" : "#FFFFFF",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          contained: {
            backgroundColor: "#4A90E2",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#357ABD", 
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? "#2A2A3A" : "#4A90E2",
            color: darkMode ? "#FFFFFF" : "#FFFFFF",
          },
        },
      },
    },
  });

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Navigation />
          <ProtectedRoute>
            <Routes>
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />{" "}
              <Route path="/users" element={<Users />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/" element={<Navigate to="/products" replace />} />
              <Route
                path="/login"
                element={<Navigate to="/products" replace />}
              />
            </Routes>
          </ProtectedRoute>
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </MUIThemeProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
