import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
  Table,
  Badge,
  InputGroup,
  Tab,
  Nav,
} from "react-bootstrap";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaEnvelope,
  FaWhatsapp,
  FaStar,
  FaUser,
  FaGift,
  FaHistory,
  FaWallet,
  FaPaperPlane,
  FaCommentAlt,
  FaBell,
} from "react-icons/fa";
import ReactApexChart from "react-apexcharts";
import { useLocation } from "react-router-dom";

const Customers = () => {
  const location = useLocation();
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showLoyaltyModal, setShowLoyaltyModal] = useState(false);
  const [showSmsModal, setShowSmsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [activeTab, setActiveTab] = useState("customers");

  // Parse the tab from URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get("tab");
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [location]);

  // Sample customers data
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "John Doe",
      phone: "9876543210",
      email: "john@example.com",
      visits: 12,
      lastVisit: "2023-11-01",
      totalSpent: 15600,
      loyaltyPoints: 780,
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "8765432109",
      email: "jane@example.com",
      visits: 8,
      lastVisit: "2023-10-25",
      totalSpent: 9200,
      loyaltyPoints: 460,
    },
    {
      id: 3,
      name: "Robert Johnson",
      phone: "7654321098",
      email: "robert@example.com",
      visits: 5,
      lastVisit: "2023-10-15",
      totalSpent: 6500,
      loyaltyPoints: 325,
    },
    {
      id: 4,
      name: "Emily Davis",
      phone: "6543210987",
      email: "emily@example.com",
      visits: 15,
      lastVisit: "2023-11-02",
      totalSpent: 18900,
      loyaltyPoints: 945,
    },
    {
      id: 5,
      name: "Michael Wilson",
      phone: "5432109876",
      email: "michael@example.com",
      visits: 3,
      lastVisit: "2023-09-20",
      totalSpent: 3800,
      loyaltyPoints: 190,
    },
    {
      id: 6,
      name: "Sarah Thompson",
      phone: "4321098765",
      email: "sarah@example.com",
      visits: 7,
      lastVisit: "2023-10-10",
      totalSpent: 8400,
      loyaltyPoints: 420,
    },
    {
      id: 7,
      name: "David Brown",
      phone: "3210987654",
      email: "david@example.com",
      visits: 10,
      lastVisit: "2023-10-28",
      totalSpent: 12500,
      loyaltyPoints: 625,
    },
    {
      id: 8,
      name: "Lisa Anderson",
      phone: "2109876543",
      email: "lisa@example.com",
      visits: 4,
      lastVisit: "2023-09-15",
      totalSpent: 5200,
      loyaltyPoints: 260,
    },
  ]);

  // Sample feedback data
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      customer: "John Doe",
      rating: 4,
      comment: "Great food and service!",
      date: "2023-11-01",
      responded: true,
    },
    {
      id: 2,
      customer: "Jane Smith",
      rating: 5,
      comment: "Excellent experience, will definitely come back.",
      date: "2023-10-25",
      responded: true,
    },
    {
      id: 3,
      customer: "Robert Johnson",
      rating: 3,
      comment: "Food was good but service was slow.",
      date: "2023-10-15",
      responded: false,
    },
    {
      id: 4,
      customer: "Emily Davis",
      rating: 5,
      comment: "Amazing food and ambiance!",
      date: "2023-11-02",
      responded: false,
    },
    {
      id: 5,
      customer: "Michael Wilson",
      rating: 2,
      comment: "Food was cold when served.",
      date: "2023-09-20",
      responded: true,
    },
  ]);

  // Sample loyalty program data
  const loyaltyLevels = [
    { level: "Bronze", points: 0, benefits: ["5% off on birthdays"] },
    {
      level: "Silver",
      points: 500,
      benefits: ["5% off on birthdays", "10% off on weekdays"],
    },
    {
      level: "Gold",
      points: 1000,
      benefits: [
        "5% off on birthdays",
        "10% off on weekdays",
        "Free dessert with every meal",
      ],
    },
    {
      level: "Platinum",
      points: 2000,
      benefits: [
        "5% off on birthdays",
        "15% off anytime",
        "Free dessert with every meal",
        "Priority seating",
      ],
    },
  ];

  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    setShowCustomerModal(true);
  };

  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
    setShowCustomerModal(true);
  };

  const handleAddFeedback = () => {
    setShowFeedbackModal(true);
  };

  const handleAddLoyaltyPoints = (customer) => {
    setSelectedCustomer(customer);
    setShowLoyaltyModal(true);
  };

  const handleSaveCustomer = () => {
    // Save customer logic would go here
    setShowCustomerModal(false);
    if (!selectedCustomer) {
      alert("Customer added successfully!");
    } else {
      alert("Customer updated successfully!");
    }
  };

  const handleSaveFeedback = () => {
    // Save feedback logic would go here
    setShowFeedbackModal(false);
    alert("Feedback added successfully!");
  };

  const handleSaveLoyaltyPoints = () => {
    // Save loyalty points logic would go here
    setShowLoyaltyModal(false);
    alert("Loyalty points added successfully!");
  };

  const filteredCustomers = searchTerm
    ? customers.filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.phone.includes(searchTerm) ||
          customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : customers;

  // Chart options for customer visits
  const customerVisitsOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: {
      title: {
        text: "Visits",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " visits";
        },
      },
    },
    colors: ["#007bff"],
  };

  const customerVisitsSeries = [
    {
      name: "Visits",
      data: [30, 40, 45, 50, 49, 60, 70, 91, 85, 87, 90, 85],
    },
  ];

  // Chart options for feedback ratings
  const feedbackRatingsOptions = {
    chart: {
      type: "pie",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    labels: ["5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Star"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    colors: ["#28a745", "#20c997", "#ffc107", "#fd7e14", "#dc3545"],
  };

  const feedbackRatingsSeries = [2, 1, 1, 1, 0]; // Count of each rating

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Customer Management</h5>
                <div>
                  <Button
                    variant="outline-primary"
                    className="me-2"
                    onClick={handleAddFeedback}
                  >
                    <FaPlus className="me-1" /> Add Feedback
                  </Button>
                  <Button variant="primary" onClick={handleAddCustomer}>
                    <FaPlus className="me-1" /> Add Customer
                  </Button>
                </div>
              </div>

              <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
                <Nav variant="tabs" className="mb-3">
                  <Nav.Item>
                    <Nav.Link eventKey="customers">
                      <FaUser className="me-1" /> Customers
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="feedback">
                      <FaCommentAlt className="me-1" /> Feedback
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="loyalty">
                      <FaWallet className="me-1" /> Loyalty Program
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="marketing">
                      <FaEnvelope className="me-1" /> SMS Marketing
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="analytics">
                      <FaHistory className="me-1" /> Customer Analytics
                    </Nav.Link>
                  </Nav.Item>
                </Nav>

                <Tab.Content>
                  <Tab.Pane eventKey="customers">
                    <InputGroup className="mb-3">
                      <InputGroup.Text>
                        <FaSearch />
                      </InputGroup.Text>
                      <Form.Control
                        placeholder="Search customers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </InputGroup>

                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Contact</th>
                          <th>Visits</th>
                          <th>Last Visit</th>
                          <th>Total Spent</th>
                          <th>Loyalty Points</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCustomers.map((customer) => (
                          <tr key={customer.id}>
                            <td>{customer.name}</td>
                            <td>
                              {customer.phone}
                              <div>
                                <small className="text-muted">
                                  {customer.email}
                                </small>
                              </div>
                            </td>
                            <td>{customer.visits}</td>
                            <td>{customer.lastVisit}</td>
                            <td>₹{customer.totalSpent.toLocaleString()}</td>
                            <td>
                              <Badge bg="info">
                                {customer.loyaltyPoints} pts
                              </Badge>
                              <div>
                                <small>
                                  {customer.loyaltyPoints >= 2000
                                    ? "Platinum"
                                    : customer.loyaltyPoints >= 1000
                                    ? "Gold"
                                    : customer.loyaltyPoints >= 500
                                    ? "Silver"
                                    : "Bronze"}
                                </small>
                              </div>
                            </td>
                            <td>
                              <Button
                                variant="outline-primary"
                                size="sm"
                                className="me-1"
                                onClick={() => handleEditCustomer(customer)}
                              >
                                <FaEdit />
                              </Button>
                              <Button
                                variant="outline-success"
                                size="sm"
                                className="me-1"
                                onClick={() => handleAddLoyaltyPoints(customer)}
                              >
                                <FaWallet />
                              </Button>
                              <Button
                                variant="outline-info"
                                size="sm"
                                className="me-1"
                              >
                                <FaWhatsapp />
                              </Button>
                              <Button variant="outline-secondary" size="sm">
                                <FaEnvelope />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Tab.Pane>

                  <Tab.Pane eventKey="feedback">
                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>Customer</th>
                          <th>Rating</th>
                          <th>Comment</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {feedback.map((item) => (
                          <tr key={item.id}>
                            <td>{item.customer}</td>
                            <td>
                              {[...Array(5)].map((_, i) => (
                                <FaStar
                                  key={i}
                                  className={
                                    i < item.rating
                                      ? "text-warning"
                                      : "text-muted"
                                  }
                                  style={{ marginRight: "2px" }}
                                />
                              ))}
                            </td>
                            <td>{item.comment}</td>
                            <td>{item.date}</td>
                            <td>
                              <Badge
                                bg={item.responded ? "success" : "warning"}
                              >
                                {item.responded ? "Responded" : "Pending"}
                              </Badge>
                            </td>
                            <td>
                              <Button
                                variant="outline-primary"
                                size="sm"
                                className="me-1"
                              >
                                <FaEdit />
                              </Button>
                              <Button variant="outline-danger" size="sm">
                                <FaTrash />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Tab.Pane>

                  <Tab.Pane eventKey="loyalty">
                    <Row>
                      {loyaltyLevels.map((level, idx) => (
                        <Col key={idx} md={3} className="mb-3">
                          <Card
                            className={`h-100 ${
                              level.level === "Bronze"
                                ? "border-secondary"
                                : level.level === "Silver"
                                ? "border-info"
                                : level.level === "Gold"
                                ? "border-warning"
                                : "border-danger"
                            }`}
                          >
                            <Card.Header
                              className={`text-white ${
                                level.level === "Bronze"
                                  ? "bg-secondary"
                                  : level.level === "Silver"
                                  ? "bg-info"
                                  : level.level === "Gold"
                                  ? "bg-warning"
                                  : "bg-danger"
                              }`}
                            >
                              <h5 className="mb-0">{level.level}</h5>
                            </Card.Header>
                            <Card.Body>
                              <div className="mb-3 text-center">
                                <h6>{level.points}+ Points</h6>
                              </div>
                              <h6>Benefits:</h6>
                              <ul>
                                {level.benefits.map((benefit, i) => (
                                  <li key={i}>{benefit}</li>
                                ))}
                              </ul>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>

                    <Card className="mt-3">
                      <Card.Header>
                        <h6 className="mb-0">Loyalty Settings</h6>
                      </Card.Header>
                      <Card.Body>
                        <Form>
                          <Row>
                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Points per ₹100 spent</Form.Label>
                                <Form.Control type="number" defaultValue="5" />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Points Expiry (days)</Form.Label>
                                <Form.Control
                                  type="number"
                                  defaultValue="365"
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Button variant="primary">Save Settings</Button>
                        </Form>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>

                  <Tab.Pane eventKey="marketing">
                    <Row className="mb-4">
                      <Col>
                        <Card>
                          <Card.Header className="d-flex justify-content-between align-items-center">
                            <h6 className="mb-0">SMS Marketing Campaigns</h6>
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => setShowSmsModal(true)}
                            >
                              <FaPlus className="me-1" /> New Campaign
                            </Button>
                          </Card.Header>
                          <Card.Body className="p-0">
                            <Table hover responsive className="mb-0">
                              <thead>
                                <tr>
                                  <th>Campaign Name</th>
                                  <th>Message</th>
                                  <th>Recipients</th>
                                  <th>Status</th>
                                  <th>Scheduled</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Weekend Special</td>
                                  <td>
                                    Get 20% off on all main courses this
                                    weekend!
                                  </td>
                                  <td>All Customers (45)</td>
                                  <td>
                                    <Badge bg="success">Sent</Badge>
                                  </td>
                                  <td>2023-11-03 10:00 AM</td>
                                  <td>
                                    <Button
                                      variant="outline-primary"
                                      size="sm"
                                      className="me-1"
                                    >
                                      <FaEdit />
                                    </Button>
                                    <Button variant="outline-danger" size="sm">
                                      <FaTrash />
                                    </Button>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Loyalty Bonus</td>
                                  <td>
                                    Dear Gold & Platinum members, enjoy a free
                                    dessert on your next visit!
                                  </td>
                                  <td>Gold & Platinum (12)</td>
                                  <td>
                                    <Badge bg="warning">Scheduled</Badge>
                                  </td>
                                  <td>2023-11-10 09:00 AM</td>
                                  <td>
                                    <Button
                                      variant="outline-primary"
                                      size="sm"
                                      className="me-1"
                                    >
                                      <FaEdit />
                                    </Button>
                                    <Button variant="outline-danger" size="sm">
                                      <FaTrash />
                                    </Button>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Birthday Wishes</td>
                                  <td>
                                    Happy Birthday! Enjoy a complimentary
                                    dessert on your special day.
                                  </td>
                                  <td>November Birthdays (8)</td>
                                  <td>
                                    <Badge bg="info">Draft</Badge>
                                  </td>
                                  <td>Not scheduled</td>
                                  <td>
                                    <Button
                                      variant="outline-primary"
                                      size="sm"
                                      className="me-1"
                                    >
                                      <FaEdit />
                                    </Button>
                                    <Button variant="outline-danger" size="sm">
                                      <FaTrash />
                                    </Button>
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6} className="mb-3">
                        <Card className="h-100">
                          <Card.Header>
                            <h6 className="mb-0">SMS Templates</h6>
                          </Card.Header>
                          <Card.Body>
                            <div className="mb-3 border-bottom pb-3">
                              <h6>Welcome Message</h6>
                              <p className="text-muted mb-2">
                                Welcome to [Restaurant Name]! Thank you for
                                signing up. Show this SMS to get 10% off on your
                                first order.
                              </p>
                              <div>
                                <Button
                                  variant="outline-primary"
                                  size="sm"
                                  className="me-1"
                                >
                                  <FaEdit />
                                </Button>
                                <Button variant="outline-danger" size="sm">
                                  <FaTrash />
                                </Button>
                              </div>
                            </div>
                            <div className="mb-3 border-bottom pb-3">
                              <h6>Birthday Wish</h6>
                              <p className="text-muted mb-2">
                                Happy Birthday [Customer Name]! Enjoy a
                                complimentary dessert on your special day at
                                [Restaurant Name].
                              </p>
                              <div>
                                <Button
                                  variant="outline-primary"
                                  size="sm"
                                  className="me-1"
                                >
                                  <FaEdit />
                                </Button>
                                <Button variant="outline-danger" size="sm">
                                  <FaTrash />
                                </Button>
                              </div>
                            </div>
                            <div>
                              <h6>Special Offer</h6>
                              <p className="text-muted mb-2">
                                Exclusive offer for you! Get [Discount]% off on
                                your next visit to [Restaurant Name]. Valid till
                                [Date].
                              </p>
                              <div>
                                <Button
                                  variant="outline-primary"
                                  size="sm"
                                  className="me-1"
                                >
                                  <FaEdit />
                                </Button>
                                <Button variant="outline-danger" size="sm">
                                  <FaTrash />
                                </Button>
                              </div>
                            </div>
                          </Card.Body>
                          <Card.Footer>
                            <Button variant="primary" size="sm">
                              <FaPlus className="me-1" /> Add Template
                            </Button>
                          </Card.Footer>
                        </Card>
                      </Col>

                      <Col md={6} className="mb-3">
                        <Card className="h-100">
                          <Card.Header>
                            <h6 className="mb-0">SMS Statistics</h6>
                          </Card.Header>
                          <Card.Body>
                            <div className="d-flex justify-content-between mb-3">
                              <div className="text-center">
                                <h3 className="mb-1">45</h3>
                                <div className="text-muted">Total Sent</div>
                              </div>
                              <div className="text-center">
                                <h3 className="mb-1">42</h3>
                                <div className="text-muted">Delivered</div>
                              </div>
                              <div className="text-center">
                                <h3 className="mb-1">18</h3>
                                <div className="text-muted">Opened</div>
                              </div>
                              <div className="text-center">
                                <h3 className="mb-1">5</h3>
                                <div className="text-muted">Clicked</div>
                              </div>
                            </div>

                            <div className="mb-3">
                              <h6>SMS Credits</h6>
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <span className="text-muted">
                                    Available:{" "}
                                  </span>
                                  <span className="fw-bold">255 credits</span>
                                </div>
                                <Button variant="outline-primary" size="sm">
                                  Buy Credits
                                </Button>
                              </div>
                            </div>

                            <div>
                              <h6>Recent Activity</h6>
                              <ul className="list-unstyled">
                                <li className="mb-2">
                                  <div className="d-flex justify-content-between">
                                    <span>Weekend Special campaign sent</span>
                                    <small className="text-muted">
                                      2 days ago
                                    </small>
                                  </div>
                                </li>
                                <li className="mb-2">
                                  <div className="d-flex justify-content-between">
                                    <span>Purchased 500 SMS credits</span>
                                    <small className="text-muted">
                                      1 week ago
                                    </small>
                                  </div>
                                </li>
                                <li>
                                  <div className="d-flex justify-content-between">
                                    <span>New template created</span>
                                    <small className="text-muted">
                                      2 weeks ago
                                    </small>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Tab.Pane>

                  <Tab.Pane eventKey="analytics">
                    <Row>
                      <Col lg={6} className="mb-3">
                        <Card className="h-100">
                          <Card.Header>
                            <h6 className="mb-0">Customer Visits (2023)</h6>
                          </Card.Header>
                          <Card.Body>
                            <ReactApexChart
                              options={customerVisitsOptions}
                              series={customerVisitsSeries}
                              type="bar"
                              height={350}
                            />
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col lg={6} className="mb-3">
                        <Card className="h-100">
                          <Card.Header>
                            <h6 className="mb-0">Feedback Ratings</h6>
                          </Card.Header>
                          <Card.Body>
                            <ReactApexChart
                              options={feedbackRatingsOptions}
                              series={feedbackRatingsSeries}
                              type="pie"
                              height={350}
                            />
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Add/Edit Customer Modal */}
      <Modal
        show={showCustomerModal}
        onHide={() => setShowCustomerModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedCustomer ? "Edit Customer" : "Add Customer"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                defaultValue={selectedCustomer?.name || ""}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter phone number"
                defaultValue={selectedCustomer?.phone || ""}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                defaultValue={selectedCustomer?.email || ""}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Birthday</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Anniversary</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter address"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Notes</Form.Label>
              <Form.Control as="textarea" rows={2} placeholder="Enter notes" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowCustomerModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveCustomer}>
            {selectedCustomer ? "Update Customer" : "Add Customer"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Feedback Modal */}
      <Modal
        show={showFeedbackModal}
        onHide={() => setShowFeedbackModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Customer</Form.Label>
              <Form.Select>
                <option value="">Select Customer</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rating</Form.Label>
              <div className="d-flex">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <div key={rating} className="me-3">
                    <Form.Check
                      type="radio"
                      id={`rating-${rating}`}
                      name="rating"
                      label={rating}
                    />
                  </div>
                ))}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter feedback comment"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                defaultValue={new Date().toISOString().split("T")[0]}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowFeedbackModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveFeedback}>
            Add Feedback
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Loyalty Points Modal */}
      <Modal
        show={showLoyaltyModal}
        onHide={() => setShowLoyaltyModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Loyalty Points</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCustomer && (
            <Form>
              <div className="mb-3">
                <h6>Customer: {selectedCustomer.name}</h6>
                <p className="mb-1">
                  Current Points:{" "}
                  <Badge bg="info">{selectedCustomer.loyaltyPoints} pts</Badge>
                </p>
                <p className="mb-0">
                  Level:{" "}
                  {selectedCustomer.loyaltyPoints >= 2000
                    ? "Platinum"
                    : selectedCustomer.loyaltyPoints >= 1000
                    ? "Gold"
                    : selectedCustomer.loyaltyPoints >= 500
                    ? "Silver"
                    : "Bronze"}
                </p>
              </div>
              <Form.Group className="mb-3">
                <Form.Label>Points to Add</Form.Label>
                <Form.Control type="number" placeholder="Enter points" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Reason</Form.Label>
                <Form.Select>
                  <option value="purchase">Purchase</option>
                  <option value="birthday">Birthday Bonus</option>
                  <option value="anniversary">Anniversary Bonus</option>
                  <option value="referral">Referral Bonus</option>
                  <option value="other">Other</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Enter notes"
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowLoyaltyModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveLoyaltyPoints}>
            Add Points
          </Button>
        </Modal.Footer>
      </Modal>

      {/* SMS Campaign Modal */}
      <Modal
        show={showSmsModal}
        onHide={() => setShowSmsModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create SMS Campaign</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Campaign Name</Form.Label>
              <Form.Control type="text" placeholder="Enter campaign name" />
            </Form.Group>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Recipient Group</Form.Label>
                  <Form.Select>
                    <option value="">Select Recipients</option>
                    <option value="all">All Customers</option>
                    <option value="platinum">Platinum Members</option>
                    <option value="gold">Gold Members</option>
                    <option value="silver">Silver Members</option>
                    <option value="bronze">Bronze Members</option>
                    <option value="inactive">Inactive Customers</option>
                    <option value="custom">Custom Selection</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Schedule</Form.Label>
                  <Form.Select>
                    <option value="now">Send Immediately</option>
                    <option value="schedule">Schedule for Later</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Message Template</Form.Label>
              <Form.Select className="mb-2">
                <option value="">Select Template or Create New</option>
                <option value="welcome">Welcome Message</option>
                <option value="birthday">Birthday Wish</option>
                <option value="special">Special Offer</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Message Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter your message content here..."
                defaultValue="Get 20% off on all main courses this weekend at SmartPOS Restaurant! Valid Friday to Sunday. Show this SMS to avail the offer."
              />
              <Form.Text className="text-muted">
                Available variables: [Customer Name], [Restaurant Name],
                [Discount], [Date], [Points]
              </Form.Text>
            </Form.Group>

            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Form.Label className="mb-0">Preview</Form.Label>
                <span className="text-muted small">Characters: 118/160</span>
              </div>
              <div className="border rounded p-3 bg-light">
                Get 20% off on all main courses this weekend at SmartPOS
                Restaurant! Valid Friday to Sunday. Show this SMS to avail the
                offer.
              </div>
            </div>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Estimated Recipients</Form.Label>
                  <div className="border rounded p-2">
                    <strong>45</strong> customers will receive this message
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Estimated Cost</Form.Label>
                  <div className="border rounded p-2">
                    <strong>45</strong> SMS credits will be used
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSmsModal(false)}>
            Cancel
          </Button>
          <Button variant="outline-primary" className="me-2">
            Save as Draft
          </Button>
          <Button variant="primary">
            <FaPaperPlane className="me-1" /> Send Campaign
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Customers;
