import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Dropdown, Button } from "react-bootstrap";
import {
  FaBell,
  FaUser,
  FaCog,
  FaMoon,
  FaSun,
  FaSearch,
  FaSignOutAlt,
  FaUserCog,
  FaUserCircle,
} from "react-icons/fa";

const Header = () => {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "Low stock alert: Chicken",
      time: "10 mins ago",
      type: "warning",
    },
    {
      id: 2,
      text: "New order #1234 received",
      time: "15 mins ago",
      type: "info",
    },
    {
      id: 3,
      text: "Staff check-in: John Doe",
      time: "30 mins ago",
      type: "success",
    },
  ]);

  // Get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    switch (path) {
      case "/":
        return "Dashboard";
      case "/billing":
        return "Billing";
      case "/tables":
        return "Table & Reservation Management";
      case "/menu":
        return "Menu Management";
      case "/inventory":
        return "Inventory & Stock";
      case "/reports":
        return "Reports & Analytics";
      case "/customers":
        return "Customer Management";
      case "/staff":
        return "Staff Management";
      case "/kitchen":
        return "Kitchen Display System";
      case "/tokens":
        return "Token Management System";
      case "/settings":
        return "Website & Online Ordering";
      default:
        return "SmartPOS";
    }
  };

  const markAllAsRead = () => {
    setNotifications([]);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Toggle dark mode class on document body
    if (!darkMode) {
      document.documentElement.classList.add("dark-theme");
    } else {
      document.documentElement.classList.remove("dark-theme");
    }
  };

  return (
    <div className="header">
      <div className="d-flex align-items-center">
        <div className="header-title">{getPageTitle()}</div>
        <div className="d-none d-md-flex ms-4 position-relative">
          <input
            type="text"
            className="form-control form-control-sm rounded-pill ps-4 pe-5"
            placeholder="Search..."
            style={{
              backgroundColor: "var(--neutral-100)",
              border: "none",
              width: "220px",
            }}
          />
          <FaSearch
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--neutral-500)",
            }}
          />
        </div>
      </div>
      <div className="header-actions">
        <Button
          variant="link"
          className="header-action-item p-0"
          onClick={toggleDarkMode}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </Button>

        <Dropdown align="end">
          <Dropdown.Toggle as="div" className="header-action-item">
            <FaBell />
            {notifications.length > 0 && (
              <span className="header-action-badge">
                {notifications.length}
              </span>
            )}
          </Dropdown.Toggle>

          <Dropdown.Menu
            className="shadow-lg border-0"
            style={{ minWidth: "320px" }}
          >
            <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
              <span className="fw-bold">Notifications</span>
              {notifications.length > 0 && (
                <Button
                  variant="link"
                  size="sm"
                  className="p-0 text-decoration-none"
                  onClick={markAllAsRead}
                >
                  Mark all as read
                </Button>
              )}
            </div>
            <div style={{ maxHeight: "350px", overflowY: "auto" }}>
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <Dropdown.Item
                    key={notification.id}
                    className="border-bottom px-3 py-2"
                  >
                    <div className="d-flex align-items-start">
                      <div
                        className={`me-2 rounded-circle d-flex align-items-center justify-content-center`}
                        style={{
                          width: "36px",
                          height: "36px",
                          backgroundColor:
                            notification.type === "warning"
                              ? "rgba(251, 191, 36, 0.1)"
                              : notification.type === "success"
                              ? "rgba(74, 222, 128, 0.1)"
                              : "rgba(96, 165, 250, 0.1)",
                          color:
                            notification.type === "warning"
                              ? "var(--warning)"
                              : notification.type === "success"
                              ? "var(--success)"
                              : "var(--info)",
                        }}
                      >
                        <FaBell size={14} />
                      </div>
                      <div className="flex-grow-1">
                        <div className="fw-medium">{notification.text}</div>
                        <div className="text-muted small">
                          {notification.time}
                        </div>
                      </div>
                    </div>
                  </Dropdown.Item>
                ))
              ) : (
                <div className="p-4 text-center text-muted">
                  <div className="mb-2">
                    <FaBell size={24} className="text-muted opacity-50" />
                  </div>
                  <p className="mb-0">No new notifications</p>
                </div>
              )}
            </div>
            {notifications.length > 0 && (
              <div className="p-2 border-top text-center">
                <Button
                  variant="link"
                  size="sm"
                  className="text-decoration-none"
                >
                  View all notifications
                </Button>
              </div>
            )}
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown align="end">
          <Dropdown.Toggle as="div" className="header-user">
            <div className="header-user-avatar">
              <FaUserCircle size={20} />
            </div>
            <div className="header-user-info">
              <div className="header-user-name">Admin User</div>
              <div className="header-user-role">Administrator</div>
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu className="shadow-lg border-0">
            <Dropdown.Item>
              <FaUserCircle className="me-2 text-muted" /> My Profile
            </Dropdown.Item>
            <Dropdown.Item>
              <FaUserCog className="me-2 text-muted" /> Account Settings
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className="text-danger">
              <FaSignOutAlt className="me-2" /> Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
