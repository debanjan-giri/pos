import { Link, useLocation } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  FaHome,
  FaReceipt,
  FaUtensils,
  FaClipboardList,
  FaBoxes,
  FaChartBar,
  FaUsers,
  FaUserFriends,
  FaBars,
  FaCashRegister,
  FaSignOutAlt,
  FaCog,
  FaUserCircle,
  FaAngleRight,
  FaTicketAlt,
  FaCalendarAlt,
  FaGlobe,
  FaEnvelope,
  FaCommentAlt,
  FaWallet,
} from "react-icons/fa";
import { useAppContext } from "../../context/AppContext";

const Sidebar = () => {
  const location = useLocation();
  const { sidebarCollapsed: collapsed, toggleSidebar } = useAppContext();

  // Menu items grouped by category
  const menuCategories = [
    {
      category: "Main",
      items: [{ path: "/", icon: <FaHome />, text: "Dashboard" }],
    },
    {
      category: "Operations",
      items: [
        { path: "/billing", icon: <FaReceipt />, text: "Billing" },
        { path: "/kitchen", icon: <FaTicketAlt />, text: "Kitchen Display" },
        { path: "/tokens", icon: <FaTicketAlt />, text: "Token Management" },
        { path: "/tables", icon: <FaCalendarAlt />, text: "Reservations" },
      ],
    },
    {
      category: "Management",
      items: [
        { path: "/menu", icon: <FaClipboardList />, text: "Menu" },
        { path: "/inventory", icon: <FaBoxes />, text: "Inventory" },
        { path: "/reports", icon: <FaChartBar />, text: "Reports" },
      ],
    },
    {
      category: "Customer",
      items: [
        { path: "/customers", icon: <FaUsers />, text: "Customers" },
        { path: "/customers?tab=loyalty", icon: <FaWallet />, text: "Loyalty" },
        {
          path: "/customers?tab=feedback",
          icon: <FaCommentAlt />,
          text: "Feedback",
        },
        {
          path: "/customers?tab=marketing",
          icon: <FaEnvelope />,
          text: "SMS Marketing",
        },
      ],
    },
    {
      category: "System",
      items: [
        { path: "/staff", icon: <FaUserFriends />, text: "Staff" },
        {
          path: "/tables?tab=qrcode",
          icon: <FaUserFriends />,
          text: "Scan & Order",
        },
        { path: "/settings", icon: <FaGlobe />, text: "Website & Online" },
      ],
    },
  ];

  // Toggle sidebar is now handled by the context

  // Function to render menu item with tooltip when collapsed
  const renderMenuItem = (item) => {
    const isActive = location.pathname === item.path;
    const menuItem = (
      <Link
        to={item.path}
        className={`sidebar-menu-item ${isActive ? "active" : ""}`}
      >
        <span className="sidebar-menu-item-icon">{item.icon}</span>
        <span className="sidebar-menu-item-text">{item.text}</span>
        {!collapsed && isActive && (
          <span className="sidebar-menu-item-indicator">
            <FaAngleRight />
          </span>
        )}
      </Link>
    );

    if (collapsed) {
      return (
        <OverlayTrigger
          placement="right"
          overlay={<Tooltip id={`tooltip-${item.path}`}>{item.text}</Tooltip>}
        >
          <li key={item.path}>{menuItem}</li>
        </OverlayTrigger>
      );
    }

    return <li key={item.path}>{menuItem}</li>;
  };

  return (
    <div className={`sidebar ${collapsed ? "sidebar-collapsed" : ""}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon-wrapper">
            <FaCashRegister className="sidebar-logo-icon" />
          </div>
          <span>SmartPOS</span>
        </div>
        <button
          onClick={toggleSidebar}
          className="sidebar-toggle"
          aria-label="Toggle sidebar"
        >
          <FaBars />
        </button>
      </div>

      <div className="sidebar-content">
        {menuCategories.map((category, index) => (
          <div key={index} className="sidebar-category">
            {!collapsed && (
              <div className="sidebar-category-header">
                <span>{category.category}</span>
              </div>
            )}
            <ul className="sidebar-menu">
              {category.items.map((item) => renderMenuItem(item))}
            </ul>
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        {!collapsed ? (
          <div className="sidebar-user-info">
            <div className="sidebar-user-avatar">
              <FaUserCircle />
            </div>
            <div className="sidebar-user-details">
              <div className="sidebar-user-name">Admin User</div>
              <div className="sidebar-user-role">Administrator</div>
            </div>
            <div className="sidebar-user-actions">
              <Link to="/settings" className="sidebar-action-button">
                <FaCog />
              </Link>
              <Link to="/logout" className="sidebar-action-button">
                <FaSignOutAlt />
              </Link>
            </div>
          </div>
        ) : (
          <div className="sidebar-user-collapsed">
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip id="tooltip-user">Admin User</Tooltip>}
            >
              <div className="sidebar-user-avatar">
                <FaUserCircle />
              </div>
            </OverlayTrigger>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
