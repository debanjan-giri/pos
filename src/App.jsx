import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Context Provider
import { AppProvider } from "./context/AppContext";

// Layout Components
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";
import LoadingSpinner from "./components/ui/LoadingSpinner";

// Lazy load pages for code splitting
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Billing = lazy(() => import("./pages/Billing"));
const TableManagement = lazy(() => import("./pages/TableManagement"));
const MenuManagement = lazy(() => import("./pages/MenuManagement"));
const Inventory = lazy(() => import("./pages/Inventory"));
const Reports = lazy(() => import("./pages/Reports"));
const Customers = lazy(() => import("./pages/Customers"));
const Staff = lazy(() => import("./pages/Staff"));
const KitchenDisplay = lazy(() => import("./pages/KitchenDisplay"));
const TokenManagement = lazy(() => import("./pages/TokenManagement"));
const Settings = lazy(() => import("./pages/Settings"));

// Layout component with sidebar, header, and footer
const Layout = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content-wrapper">
          <Suspense fallback={<LoadingSpinner />}>
            <Outlet />
          </Suspense>
        </div>
        <Footer />
      </div>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/tables" element={<TableManagement />} />
            <Route path="/menu" element={<MenuManagement />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/kitchen" element={<KitchenDisplay />} />
            <Route path="/tokens" element={<TokenManagement />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
