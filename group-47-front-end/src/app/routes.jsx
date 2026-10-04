import { createBrowserRouter, Navigate } from "react-router";
import ProtectedRoute from "../routes/ProtectedRoute";
import AppShell from "../layouts/AppShell";
import LandingPage from "../pages/LandingPage";
import AuthPage from "../pages/AuthPage";
import DashboardPage from "../pages/DashboardPage";
import ProjectsPage from "../pages/ProjectsPage";
import ProjectDetailPage from "../pages/ProjectDetailPage";
import DatabasePage from "../pages/DatabasePage";
import ApiKeysPage from "../pages/ApiKeysPage";
import StoragePage from "../pages/StoragePage";
import UsagePage from "../pages/UsagePage";
import DocsPage from "../pages/DocsPage";
import SettingsPage from "../pages/SettingsPage";
import NotFoundPage from "../pages/NotFoundPage";

export const router = createBrowserRouter([
  { path: "/", Component: LandingPage },
  { path: "/login", element: <AuthPage mode="login" /> },
  { path: "/register", element: <AuthPage mode="register" /> },
  { path: "/forgot-password", element: <AuthPage mode="forgot" /> },
  { path: "/reset-password", element: <AuthPage mode="reset" /> },
  {
    element: <ProtectedRoute />,
    children: [{
      Component: AppShell,
      children: [
        { index: true, element: <Navigate to="/dashboard" replace /> },
        { path: "dashboard", Component: DashboardPage },
        { path: "projects", Component: ProjectsPage },
        { path: "projects/:projectId", Component: ProjectDetailPage },
        { path: "projects/:projectId/database", Component: DatabasePage },
        { path: "projects/:projectId/api-keys", Component: ApiKeysPage },
        { path: "projects/:projectId/storage", Component: StoragePage },
        { path: "projects/:projectId/usage", Component: UsagePage },
        { path: "projects/:projectId/settings", Component: SettingsPage },
        { path: "settings", Component: SettingsPage },
      ],
    }],
  },
  { path: "/docs", Component: DocsPage },
  { path: "*", Component: NotFoundPage },
]);
