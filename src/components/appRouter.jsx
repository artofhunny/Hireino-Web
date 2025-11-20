import AppLayout from "@/layout/AppLayout";
import LandingPage from "@/pages/LandingPage";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import JobListing from "@/pages/JobListing";
import SavedJob from "@/pages/SavedJob";
import OnBoarding from "@/pages/OnBoarding";
import MyJobs from "@/pages/MyJobs";
import PostJob from "@/pages/PostJob";
import Job from "@/pages/Job";

const appRouter = createBrowserRouter([
    {
      element: <AppLayout/>,
      children: [
        {
          path: '/',
          element: <LandingPage />
        },
        {
          path: '/jobs',
          element: <ProtectedRoute>
            <JobListing />
          </ProtectedRoute>
        },
        {
          path: '/saved-jobs',
          element: <ProtectedRoute>
            <SavedJob />
          </ProtectedRoute> 
        },
        {
          path: '/onboarding',
          element: <ProtectedRoute>
            <OnBoarding />
          </ProtectedRoute> 
        },
        {
          path: '/my-jobs',
          element: <ProtectedRoute>
            <MyJobs />
          </ProtectedRoute> 
        },
        {
          path: '/post-job',
          element: <ProtectedRoute>
            <PostJob />
          </ProtectedRoute> 
        },
        {
          path: '/job/:id',
          element: <ProtectedRoute>
            <Job />
          </ProtectedRoute> 
        },
      ]
    }
  ]);

  export default appRouter;