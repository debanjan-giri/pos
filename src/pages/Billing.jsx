import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Tab,
  Nav,
  Table,
  Modal,
  Badge,
} from "react-bootstrap";
import {
  FaPlus,
  FaMinus,
  FaTrash,
  FaUtensils,
  FaMotorcycle,
  FaShoppingBag,
  FaSave,
  FaHistory,
  FaReceipt,
  FaUser,
  FaSearch,
  FaQrcode,
  FaTabletAlt,
} from "react-icons/fa";
import PaymentProcessor from "../components/payment/PaymentProcessor";
import TransactionHistory from "../components/payment/TransactionHistory";

const Billing = () => {
  const [orderType, setOrderType] = useState("dine-in");
  const [selectedTable, setSelectedTable] = useState(null);
  const [cart, setCart] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showTransactionHistory, setShowTransactionHistory] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [activeTab, setActiveTab] = useState("menu");
  const [searchTerm, setSearchTerm] = useState("");
  const [customerInfo, setCustomerInfo] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [tableSidePayment, setTableSidePayment] = useState(false);

  // Sample menu data
  const menuCategories = [
    { id: "starters", name: "Starters" },
    { id: "main-course", name: "Main Course" },
    { id: "rice", name: "Rice & Breads" },
    { id: "desserts", name: "Desserts" },
    { id: "beverages", name: "Beverages" },
  ];

  const menuItems = [
    {
      id: 1,
      name: "Paneer Tikka",
      category: "starters",
      price: 220,
      veg: true,
    },
    { id: 2, name: "Chicken 65", category: "starters", price: 250, veg: false },
    {
      id: 3,
      name: "Veg Manchurian",
      category: "starters",
      price: 180,
      veg: true,
    },
    {
      id: 4,
      name: "Butter Chicken",
      category: "main-course",
      price: 320,
      veg: false,
    },
    {
      id: 5,
      name: "Paneer Butter Masala",
      category: "main-course",
      price: 280,
      veg: true,
    },
    {
      id: 6,
      name: "Dal Makhani",
      category: "main-course",
      price: 220,
      veg: true,
    },
    { id: 7, name: "Jeera Rice", category: "rice", price: 150, veg: true },
    { id: 8, name: "Butter Naan", category: "rice", price: 40, veg: true },
    { id: 9, name: "Gulab Jamun", category: "desserts", price: 80, veg: true },
    { id: 10, name: "Ice Cream", category: "desserts", price: 120, veg: true },
    { id: 11, name: "Soft Drink", category: "beverages", price: 60, veg: true },
    {
      id: 12,
      name: "Masala Chai",
      category: "beverages",
      price: 40,
      veg: true,
    },
  ];

  // Sample tables data
  const tables = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: `Table ${i + 1}`,
    status:
      Math.random() > 0.7
        ? "occupied"
        : Math.random() > 0.5
        ? "reserved"
        : "available",
  }));

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    const existingItem = cart.find((item) => item.id === itemId);

    if (existingItem.quantity === 1) {
      setCart(cart.filter((item) => item.id !== itemId));
    } else {
      setCart(
        cart.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };

  const deleteFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.05; // 5% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleTableSelect = (table) => {
    if (table.status === "available" || table.status === "occupied") {
      setSelectedTable(table);
    }
  };

  const handleOrderTypeChange = (type) => {
    setOrderType(type);
    setSelectedTable(null);
  };

  const handlePayment = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentComplete = (paymentDetails) => {
    // Add the transaction to recent transactions
    const newTransaction = {
      id: `TXN-${Math.floor(Math.random() * 1000000)}`,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      amount: paymentDetails.amount,
      paymentMethod: paymentDetails.method,
      status: "completed",
      customer: customerInfo?.name || "Guest",
      orderType: orderType,
      tableNumber: selectedTable?.name || "",
      items: cart.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
      })),
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      tip: paymentDetails.tip || 0,
      total: paymentDetails.amount,
    };

    setRecentTransactions([newTransaction, ...recentTransactions]);
    setShowPaymentModal(false);
    setCart([]);
    setSelectedTable(null);
  };

  const handleToggleTransactionHistory = () => {
    setShowTransactionHistory(!showTransactionHistory);
  };

  const handleAddCustomer = () => {
    setShowCustomerModal(true);
  };

  const handleSaveCustomer = (customer) => {
    setCustomerInfo(customer);
    setShowCustomerModal(false);
  };

  const handleToggleTableSidePayment = () => {
    setTableSidePayment(!tableSidePayment);
  };

  const filteredMenuItems = searchTerm
    ? menuItems.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : menuItems;

  return (
    <Container fluid>
      <Row>
        {/* Order Panel */}
        <Col lg={5} className="mb-3">
          <Card className="h-100">
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">New Order</h5>
                <div className="btn-group">
                  <Button
                    variant={
                      orderType === "dine-in" ? "primary" : "outline-primary"
                    }
                    onClick={() => handleOrderTypeChange("dine-in")}
                  >
                    <FaUtensils className="me-1" /> Dine-in
                  </Button>
                  <Button
                    variant={
                      orderType === "takeaway" ? "primary" : "outline-primary"
                    }
                    onClick={() => handleOrderTypeChange("takeaway")}
                  >
                    <FaShoppingBag className="me-1" /> Takeaway
                  </Button>
                  <Button
                    variant={
                      orderType === "delivery" ? "primary" : "outline-primary"
                    }
                    onClick={() => handleOrderTypeChange("delivery")}
                  >
                    <FaMotorcycle className="me-1" /> Delivery
                  </Button>
                </div>
              </div>
            </Card.Header>
            <Card.Body className="d-flex flex-column">
              {orderType === "dine-in" && (
                <div className="mb-3">
                  <h6>Select Table</h6>
                  <div
                    className="table-layout"
                    style={{
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(80px, 1fr))",
                    }}
                  >
                    {tables.map((table) => (
                      <div
                        key={table.id}
                        className={`table-item ${table.status} ${
                          selectedTable?.id === table.id
                            ? "border border-primary border-3"
                            : ""
                        }`}
                        onClick={() => handleTableSelect(table)}
                      >
                        {table.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex-grow-1 overflow-auto mb-3">
                <h6>Order Items</h6>
                {cart.length === 0 ? (
                  <div className="text-center text-muted py-5">
                    <p>No items added to the order</p>
                  </div>
                ) : (
                  <Table hover>
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => (
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          <td>{item.quantity}</td>
                          <td>₹{item.price}</td>
                          <td>₹{item.price * item.quantity}</td>
                          <td>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="me-1"
                              onClick={() => addToCart(item)}
                            >
                              <FaPlus />
                            </Button>
                            <Button
                              variant="outline-warning"
                              size="sm"
                              className="me-1"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <FaMinus />
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => deleteFromCart(item.id)}
                            >
                              <FaTrash />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </div>

              <div className="mt-auto">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>₹{calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tax (5%):</span>
                  <span>₹{calculateTax().toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-3 fw-bold">
                  <span>Total:</span>
                  <span>₹{calculateTotal().toFixed(2)}</span>
                </div>

                <div className="mb-3">
                  {customerInfo ? (
                    <div className="d-flex justify-content-between align-items-center border rounded p-2">
                      <div>
                        <strong>{customerInfo.name}</strong>
                        <div className="small text-muted">
                          {customerInfo.phone}
                        </div>
                      </div>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={handleAddCustomer}
                      >
                        Change
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline-primary"
                      className="w-100"
                      onClick={handleAddCustomer}
                    >
                      <FaUser className="me-1" /> Add Customer
                    </Button>
                  )}
                </div>

                <div className="d-flex gap-2">
                  <Button
                    variant="success"
                    className="w-100"
                    onClick={handlePayment}
                    disabled={
                      cart.length === 0 ||
                      (orderType === "dine-in" && !selectedTable)
                    }
                  >
                    Pay Now
                  </Button>
                  {orderType === "dine-in" && selectedTable && (
                    <Button
                      variant={tableSidePayment ? "primary" : "outline-primary"}
                      onClick={handleToggleTableSidePayment}
                      title="Tableside Payment"
                    >
                      <FaTabletAlt />
                    </Button>
                  )}
                  <Button
                    variant="outline-secondary"
                    onClick={() => setActiveTab("transactions")}
                    title="Transaction History"
                  >
                    <FaHistory />
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Panel (Menu/Transactions) */}
        <Col lg={7} className="mb-3">
          <Card className="h-100">
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <Nav variant="pills" className="nav-tabs-light">
                  <Nav.Item>
                    <Nav.Link
                      active={activeTab === "menu"}
                      onClick={() => setActiveTab("menu")}
                    >
                      Menu
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      active={activeTab === "transactions"}
                      onClick={() => setActiveTab("transactions")}
                    >
                      Transaction History
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                {activeTab === "menu" && (
                  <Form.Control
                    type="search"
                    placeholder="Search menu items..."
                    className="w-50"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                )}
              </div>
            </Card.Header>
            <Card.Body>
              {activeTab === "menu" ? (
                <Tab.Container defaultActiveKey={menuCategories[0].id}>
                  <Nav variant="tabs" className="mb-3">
                    {menuCategories.map((category) => (
                      <Nav.Item key={category.id}>
                        <Nav.Link eventKey={category.id}>
                          {category.name}
                        </Nav.Link>
                      </Nav.Item>
                    ))}
                  </Nav>
                  <Tab.Content>
                    {menuCategories.map((category) => (
                      <Tab.Pane key={category.id} eventKey={category.id}>
                        <Row>
                          {filteredMenuItems
                            .filter((item) => item.category === category.id)
                            .map((item) => (
                              <Col key={item.id} md={4} sm={6} className="mb-3">
                                <Card
                                  className="h-100 cursor-pointer"
                                  onClick={() => addToCart(item)}
                                  style={{ cursor: "pointer" }}
                                >
                                  <Card.Body className="d-flex flex-column">
                                    <div className="d-flex justify-content-between align-items-start">
                                      <div>
                                        <h6 className="mb-1">{item.name}</h6>
                                        <span
                                          className={`badge ${
                                            item.veg
                                              ? "bg-success"
                                              : "bg-danger"
                                          }`}
                                        >
                                          {item.veg ? "Veg" : "Non-Veg"}
                                        </span>
                                      </div>
                                      <h5 className="mb-0">₹{item.price}</h5>
                                    </div>
                                    <Button
                                      variant="outline-primary"
                                      size="sm"
                                      className="mt-auto align-self-end"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        addToCart(item);
                                      }}
                                    >
                                      <FaPlus className="me-1" /> Add
                                    </Button>
                                  </Card.Body>
                                </Card>
                              </Col>
                            ))}
                        </Row>
                      </Tab.Pane>
                    ))}
                  </Tab.Content>
                </Tab.Container>
              ) : (
                <TransactionHistory />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Customer Modal */}
      <Modal
        show={showCustomerModal}
        onHide={() => setShowCustomerModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Customer Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter customer name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="tel" placeholder="Enter phone number" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email address" />
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
          <Button
            variant="primary"
            onClick={() =>
              handleSaveCustomer({
                name: "John Doe", // In a real app, this would come from the form
                phone: "9876543210",
                email: "john@example.com",
              })
            }
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Payment Processor */}
      <PaymentProcessor
        show={showPaymentModal}
        onHide={() => setShowPaymentModal(false)}
        orderTotal={calculateTotal()}
        orderItems={cart}
        orderType={orderType}
        tableNumber={selectedTable?.name || ""}
        customerInfo={customerInfo}
        onPaymentComplete={handlePaymentComplete}
      />
    </Container>
  );
};

export default Billing;
