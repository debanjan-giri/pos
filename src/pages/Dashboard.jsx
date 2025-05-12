import { Container, Row, Col, Card, Button } from "react-bootstrap";
import {
  FaReceipt,
  FaUtensils,
  FaUsers,
  FaBoxes,
  FaArrowUp,
  FaArrowDown,
  FaEllipsisH,
  FaChartLine,
  FaShoppingBag,
  FaRegClock,
} from "react-icons/fa";
import SalesChart from "../components/charts/SalesChart";
import InventoryChart from "../components/charts/InventoryChart";

const Dashboard = () => {
  // Sample data for dashboard stats
  const stats = [
    {
      title: "Today's Sales",
      value: "₹24,500",
      icon: <FaReceipt />,
      color: "primary",
      trend: "+12.5%",
      trendUp: true,
    },
    {
      title: "Active Tables",
      value: "12/20",
      icon: <FaUtensils />,
      color: "success",
      trend: "+3",
      trendUp: true,
    },
    {
      title: "Customers Today",
      value: "85",
      icon: <FaUsers />,
      color: "info",
      trend: "+18.2%",
      trendUp: true,
    },
    {
      title: "Low Stock Items",
      value: "8",
      icon: <FaBoxes />,
      color: "warning",
      trend: "-2",
      trendUp: false,
    },
  ];

  // Sample data for recent orders
  const recentOrders = [
    {
      id: "#ORD-001",
      table: "Table 5",
      amount: "₹1,250",
      status: "Completed",
      time: "10 mins ago",
    },
    {
      id: "#ORD-002",
      table: "Takeaway",
      amount: "₹850",
      status: "Preparing",
      time: "15 mins ago",
    },
    {
      id: "#ORD-003",
      table: "Table 12",
      amount: "₹2,100",
      status: "Served",
      time: "25 mins ago",
    },
    {
      id: "#ORD-004",
      table: "Delivery",
      amount: "₹950",
      status: "Out for Delivery",
      time: "30 mins ago",
    },
    {
      id: "#ORD-005",
      table: "Table 3",
      amount: "₹1,800",
      status: "Completed",
      time: "45 mins ago",
    },
  ];

  // Sample data for popular items
  const popularItems = [
    {
      name: "Butter Chicken",
      category: "Main Course",
      sold: 42,
      revenue: "₹12,600",
    },
    { name: "Paneer Tikka", category: "Starters", sold: 38, revenue: "₹7,600" },
    { name: "Veg Biryani", category: "Rice", sold: 35, revenue: "₹8,750" },
    {
      name: "Chocolate Brownie",
      category: "Dessert",
      sold: 30,
      revenue: "₹4,500",
    },
    { name: "Masala Dosa", category: "Breakfast", sold: 28, revenue: "₹5,600" },
  ];

  return (
    <Container fluid className="py-3">
      <Row className="mb-4 align-items-center">
        <Col>
          <h4 className="mb-0 fw-bold">Welcome back, Admin!</h4>
          <p className="text-muted">
            Here's what's happening with your restaurant today.
          </p>
        </Col>
        <Col xs="auto">
          <div className="d-flex gap-2">
            <Button
              variant="outline-secondary"
              size="sm"
              className="btn-custom-outline"
            >
              <FaRegClock className="me-1" /> Today
            </Button>
            <Button variant="primary" size="sm" className="btn-custom-primary">
              <FaChartLine className="me-1" /> Generate Report
            </Button>
          </div>
        </Col>
      </Row>

      {/* Stats Row */}
      <Row className="mb-4">
        {stats.map((stat, index) => (
          <Col key={index} md={3} sm={6} className="mb-3">
            <div className="stat-card">
              <div
                className={`stat-icon bg-${stat.color.toLowerCase()}`}
                
              >
                {stat.icon}
              </div>
              <div className="stat-title">{stat.title}</div>
              <div className="d-flex justify-content-between align-items-end">
                <div className="stat-value">{stat.value}</div>
                <div
                  className={`small ${
                    stat.trendUp ? "text-success" : "text-danger"
                  } d-flex align-items-center`}
                >
                  {stat.trendUp ? (
                    <FaArrowUp size={10} className="me-1" />
                  ) : (
                    <FaArrowDown size={10} className="me-1" />
                  )}
                  {stat.trend}
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Charts Row */}
      <Row className="mb-4">
        <Col lg={8} className="mb-3">
          <SalesChart />
        </Col>
        <Col lg={4} className="mb-3">
          <InventoryChart />
        </Col>
      </Row>

      {/* Recent Orders & Popular Items */}
      <Row>
        <Col lg={6} className="mb-3">
          <div className="dashboard-card h-100">
            <div className="dashboard-card-header">
              <div className="dashboard-card-title">Recent Orders</div>
              <div className="d-flex gap-2">
                <Button
                  variant="light"
                  size="sm"
                  className="rounded-circle p-1"
                >
                  <FaEllipsisH size={14} />
                </Button>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="btn-custom-outline"
                >
                  View All
                </Button>
              </div>
            </div>
            <div className="dashboard-card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="border-0">Order ID</th>
                      <th className="border-0">Table</th>
                      <th className="border-0">Amount</th>
                      <th className="border-0">Status</th>
                      <th className="border-0">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order, index) => (
                      <tr key={index} className="align-middle">
                        <td className="fw-medium">{order.id}</td>
                        <td>{order.table}</td>
                        <td className="fw-medium">{order.amount}</td>
                        <td>
                          <span
                            className={`badge rounded-pill ${
                              order.status === "Completed"
                                ? "bg-success-subtle text-success"
                                : order.status === "Preparing"
                                ? "bg-warning-subtle text-warning"
                                : order.status === "Served"
                                ? "bg-info-subtle text-info"
                                : "bg-primary-subtle text-primary"
                            } px-3 py-2`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="text-muted">{order.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Col>
        <Col lg={6} className="mb-3">
          <div className="dashboard-card h-100">
            <div className="dashboard-card-header">
              <div className="dashboard-card-title">Popular Items</div>
              <div className="d-flex gap-2">
                <Button
                  variant="light"
                  size="sm"
                  className="rounded-circle p-1"
                >
                  <FaEllipsisH size={14} />
                </Button>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="btn-custom-outline"
                >
                  View All
                </Button>
              </div>
            </div>
            <div className="dashboard-card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="border-0">Item Name</th>
                      <th className="border-0">Category</th>
                      <th className="border-0">Sold</th>
                      <th className="border-0">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {popularItems.map((item, index) => (
                      <tr key={index} className="align-middle">
                        <td className="fw-medium">{item.name}</td>
                        <td>
                          <span className="badge bg-light text-dark rounded-pill px-3 py-2">
                            {item.category}
                          </span>
                        </td>
                        <td className="fw-medium">{item.sold}</td>
                        <td className="fw-medium text-success">
                          {item.revenue}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
