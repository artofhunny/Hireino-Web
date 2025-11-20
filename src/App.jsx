// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import LandingPage from "./pages/LandingPage";
import JobListing from "./pages/JobListing";
import SavedJob from "./pages/SavedJob";
import "./App.css";
import { ThemeProvider } from "@/components/theme-provider"
import OnBoarding from "./pages/OnBoarding";
import MyJobs from "./pages/MyJobs";
import ProtectedRoute from "./components/ProtectedRoute";
import PostJob from "./pages/PostJob";

const App = ({children}) => {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* <RouterProvider router={appRouter} /> */}
      {children}
    </ThemeProvider>
  );
}

export default App;