import { useState } from "react";
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
  ProgressBar,
  Tab,
  Nav,
} from "react-bootstrap";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaExclamationTriangle,
  FaBoxOpen,
  FaTruck,
  FaClipboardList,
  FaChartLine,
  FaReceipt,
  FaUtensils,
  FaClipboardCheck,
} from "react-icons/fa";
import ReactApexChart from "react-apexcharts";
import RealTimeInventory from "../components/inventory/RealTimeInventory";

const Inventory = () => {
  const [showItemModal, setShowItemModal] = useState(false);
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("inventory");

  // Sample inventory data
  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: "Rice",
      category: "Grains",
      quantity: 45,
      unit: "kg",
      threshold: 20,
      supplier: "ABC Suppliers",
      lastUpdated: "2023-11-01",
      expiryDate: "2024-05-15",
    },
    {
      id: 2,
      name: "Chicken",
      category: "Meat",
      quantity: 15,
      unit: "kg",
      threshold: 10,
      supplier: "Fresh Meats",
      lastUpdated: "2023-11-03",
      expiryDate: "2023-11-10",
    },
    {
      id: 3,
      name: "Tomatoes",
      category: "Vegetables",
      quantity: 8,
      unit: "kg",
      threshold: 5,
      supplier: "Green Farms",
      lastUpdated: "2023-11-04",
      expiryDate: "2023-11-12",
    },
    {
      id: 4,
      name: "Onions",
      category: "Vegetables",
      quantity: 25,
      unit: "kg",
      threshold: 10,
      supplier: "Green Farms",
      lastUpdated: "2023-11-02",
      expiryDate: "2023-12-15",
    },
    {
      id: 5,
      name: "Flour",
      category: "Grains",
      quantity: 30,
      unit: "kg",
      threshold: 15,
      supplier: "ABC Suppliers",
      lastUpdated: "2023-10-28",
      expiryDate: "2024-04-20",
    },
    {
      id: 6,
      name: "Cooking Oil",
      category: "Oils",
      quantity: 18,
      unit: "liter",
      threshold: 10,
      supplier: "Kitchen Essentials",
      lastUpdated: "2023-10-30",
      expiryDate: "2024-02-15",
    },
    {
      id: 7,
      name: "Milk",
      category: "Dairy",
      quantity: 12,
      unit: "liter",
      threshold: 15,
      supplier: "Dairy Fresh",
      lastUpdated: "2023-11-05",
      expiryDate: "2023-11-12",
    },
    {
      id: 8,
      name: "Cheese",
      category: "Dairy",
      quantity: 5,
      unit: "kg",
      threshold: 3,
      supplier: "Dairy Fresh",
      lastUpdated: "2023-11-03",
      expiryDate: "2023-11-25",
    },
    {
      id: 9,
      name: "Soft Drinks",
      category: "Beverages",
      quantity: 48,
      unit: "bottles",
      threshold: 24,
      supplier: "Beverage World",
      lastUpdated: "2023-10-25",
      expiryDate: "2024-03-15",
    },
    {
      id: 10,
      name: "Spices Mix",
      category: "Spices",
      quantity: 3,
      unit: "kg",
      threshold: 2,
      supplier: "Spice Masters",
      lastUpdated: "2023-10-20",
      expiryDate: "2024-01-20",
    },
  ]);

  // Sample suppliers data
  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: "ABC Suppliers",
      contact: "9876543210",
      email: "abc@example.com",
      address: "123 Main St, City",
      items: ["Rice", "Flour", "Pulses"],
    },
    {
      id: 2,
      name: "Fresh Meats",
      contact: "8765432109",
      email: "fresh@example.com",
      address: "456 Market Rd, City",
      items: ["Chicken", "Mutton", "Fish"],
    },
    {
      id: 3,
      name: "Green Farms",
      contact: "7654321098",
      email: "green@example.com",
      address: "789 Garden St, City",
      items: ["Tomatoes", "Onions", "Vegetables"],
    },
    {
      id: 4,
      name: "Kitchen Essentials",
      contact: "6543210987",
      email: "kitchen@example.com",
      address: "101 Cook Rd, City",
      items: ["Cooking Oil", "Ghee"],
    },
    {
      id: 5,
      name: "Dairy Fresh",
      contact: "5432109876",
      email: "dairy@example.com",
      address: "202 Milk St, City",
      items: ["Milk", "Cheese", "Butter"],
    },
  ]);

  // Sample purchase orders data
  const [purchaseOrders, setPurchaseOrders] = useState([
    {
      id: "PO-001",
      supplier: "ABC Suppliers",
      date: "2023-11-01",
      items: 3,
      status: "Delivered",
      total: 5600,
    },
    {
      id: "PO-002",
      supplier: "Fresh Meats",
      date: "2023-11-02",
      items: 2,
      status: "Pending",
      total: 3200,
    },
    {
      id: "PO-003",
      supplier: "Green Farms",
      date: "2023-11-03",
      items: 4,
      status: "Delivered",
      total: 1800,
    },
    {
      id: "PO-004",
      supplier: "Dairy Fresh",
      date: "2023-11-04",
      items: 2,
      status: "In Transit",
      total: 2400,
    },
    {
      id: "PO-005",
      supplier: "Kitchen Essentials",
      date: "2023-11-05",
      items: 1,
      status: "Pending",
      total: 3500,
    },
  ]);

  const handleAddItem = () => {
    setShowItemModal(true);
  };

  const handleAddSupplier = () => {
    setShowSupplierModal(true);
  };

  const handleAddPurchase = () => {
    setShowPurchaseModal(true);
  };

  const handleSaveItem = () => {
    // Save item logic would go here
    setShowItemModal(false);
    alert("Inventory item added successfully!");
  };

  const handleSaveSupplier = () => {
    // Save supplier logic would go here
    setShowSupplierModal(false);
    alert("Supplier added successfully!");
  };

  const handleSavePurchase = () => {
    // Save purchase order logic would go here
    setShowPurchaseModal(false);
    alert("Purchase order created successfully!");
  };

  const filteredInventory = searchTerm
    ? inventory.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : inventory;

  // Chart options for inventory levels
  const inventoryChartOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return (
          val +
          " " +
          inventory.find(
            (item) => item.name === this.w.globals.labels[this.dataPointIndex]
          ).unit
        );
      },
      offsetX: 30,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["#fff"],
    },
    xaxis: {
      categories: inventory.map((item) => item.name),
    },
    yaxis: {
      title: {
        text: "Quantity",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
    colors: ["#007bff"],
  };

  const inventoryChartSeries = [
    {
      name: "Quantity",
      data: inventory.map((item) => item.quantity),
    },
  ];

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Inventory Management</h5>
                <div>
                  <Button
                    variant="outline-primary"
                    className="me-2"
                    onClick={handleAddSupplier}
                  >
                    <FaPlus className="me-1" /> Add Supplier
                  </Button>
                  <Button
                    variant="outline-success"
                    className="me-2"
                    onClick={handleAddPurchase}
                  >
                    <FaPlus className="me-1" /> Create Purchase Order
                  </Button>
                  <Button variant="primary" onClick={handleAddItem}>
                    <FaPlus className="me-1" /> Add Inventory Item
                  </Button>
                </div>
              </div>

              <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
                <Nav variant="tabs" className="mb-3">
                  <Nav.Item>
                    <Nav.Link eventKey="inventory">
                      <FaBoxOpen className="me-1" /> Inventory
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="realtime">
                      <FaChartLine className="me-1" /> Real-Time Tracking
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="recipes">
                      <FaUtensils className="me-1" /> Recipe Management
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="suppliers">
                      <FaTruck className="me-1" /> Suppliers
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="purchase">
                      <FaClipboardList className="me-1" /> Purchase Orders
                    </Nav.Link>
                  </Nav.Item>
                </Nav>

                <Tab.Content>
                  <Tab.Pane eventKey="realtime">
                    <RealTimeInventory />
                  </Tab.Pane>

                  <Tab.Pane eventKey="recipes">
                    <Card className="mb-4">
                      <Card.Header className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Recipe Management</h5>
                        <Button variant="primary" size="sm">
                          <FaPlus className="me-1" /> Add Recipe
                        </Button>
                      </Card.Header>
                      <Card.Body>
                        <InputGroup className="mb-3">
                          <InputGroup.Text>
                            <FaSearch />
                          </InputGroup.Text>
                          <Form.Control placeholder="Search recipes..." />
                        </InputGroup>

                        <Table hover responsive>
                          <thead>
                            <tr>
                              <th>Recipe Name</th>
                              <th>Category</th>
                              <th>Ingredients</th>
                              <th>Cost</th>
                              <th>Selling Price</th>
                              <th>Profit Margin</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Chicken Biryani</td>
                              <td>Main Course</td>
                              <td>8 items</td>
                              <td>₹120.50</td>
                              <td>₹320.00</td>
                              <td>62.3%</td>
                              <td>
                                <Button
                                  variant="outline-primary"
                                  size="sm"
                                  className="me-1"
                                >
                                  <FaEdit />
                                </Button>
                                <Button
                                  variant="outline-info"
                                  size="sm"
                                  className="me-1"
                                >
                                  <FaClipboardCheck />
                                </Button>
                                <Button variant="outline-danger" size="sm">
                                  <FaTrash />
                                </Button>
                              </td>
                            </tr>
                            <tr>
                              <td>Paneer Butter Masala</td>
                              <td>Main Course</td>
                              <td>6 items</td>
                              <td>₹95.75</td>
                              <td>₹280.00</td>
                              <td>65.8%</td>
                              <td>
                                <Button
                                  variant="outline-primary"
                                  size="sm"
                                  className="me-1"
                                >
                                  <FaEdit />
                                </Button>
                                <Button
                                  variant="outline-info"
                                  size="sm"
                                  className="me-1"
                                >
                                  <FaClipboardCheck />
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
                  </Tab.Pane>

                  <Tab.Pane eventKey="inventory">
                    <InputGroup className="mb-3">
                      <InputGroup.Text>
                        <FaSearch />
                      </InputGroup.Text>
                      <Form.Control
                        placeholder="Search inventory items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </InputGroup>

                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>Item Name</th>
                          <th>Category</th>
                          <th>Quantity</th>
                          <th>Status</th>
                          <th>Supplier</th>
                          <th>Expiry Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredInventory.map((item) => (
                          <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>
                              {item.quantity} {item.unit}
                              <ProgressBar
                                className="mt-1"
                                variant={
                                  item.quantity <= item.threshold / 2
                                    ? "danger"
                                    : item.quantity <= item.threshold
                                    ? "warning"
                                    : "success"
                                }
                                now={
                                  (item.quantity / (item.threshold * 2)) * 100
                                }
                                style={{ height: "5px" }}
                              />
                            </td>
                            <td>
                              {item.quantity <= item.threshold / 2 ? (
                                <Badge bg="danger">Critical</Badge>
                              ) : item.quantity <= item.threshold ? (
                                <Badge bg="warning">Low Stock</Badge>
                              ) : (
                                <Badge bg="success">In Stock</Badge>
                              )}
                            </td>
                            <td>{item.supplier}</td>
                            <td>
                              {item.expiryDate}
                              {new Date(item.expiryDate) <=
                                new Date(
                                  new Date().setDate(new Date().getDate() + 7)
                                ) && (
                                <FaExclamationTriangle className="ms-2 text-warning" />
                              )}
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

                  <Tab.Pane eventKey="suppliers">
                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>Supplier Name</th>
                          <th>Contact</th>
                          <th>Email</th>
                          <th>Address</th>
                          <th>Items Supplied</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {suppliers.map((supplier) => (
                          <tr key={supplier.id}>
                            <td>{supplier.name}</td>
                            <td>{supplier.contact}</td>
                            <td>{supplier.email}</td>
                            <td>{supplier.address}</td>
                            <td>
                              {supplier.items.map((item, idx) => (
                                <Badge
                                  key={idx}
                                  bg="secondary"
                                  className="me-1"
                                >
                                  {item}
                                </Badge>
                              ))}
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

                  <Tab.Pane eventKey="purchase">
                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>PO Number</th>
                          <th>Supplier</th>
                          <th>Date</th>
                          <th>Items</th>
                          <th>Total</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {purchaseOrders.map((order) => (
                          <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.supplier}</td>
                            <td>{order.date}</td>
                            <td>{order.items}</td>
                            <td>₹{order.total}</td>
                            <td>
                              <Badge
                                bg={
                                  order.status === "Delivered"
                                    ? "success"
                                    : order.status === "In Transit"
                                    ? "info"
                                    : "warning"
                                }
                              >
                                {order.status}
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
                </Tab.Content>
              </Tab.Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg={8} className="mb-3">
          <Card className="h-100">
            <Card.Header>
              <h5 className="mb-0">Inventory Levels</h5>
            </Card.Header>
            <Card.Body>
              <ReactApexChart
                options={inventoryChartOptions}
                series={inventoryChartSeries}
                type="bar"
                height={350}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4} className="mb-3">
          <Card className="h-100">
            <Card.Header>
              <h5 className="mb-0">Low Stock Alerts</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex flex-column gap-2">
                {inventory
                  .filter((item) => item.quantity <= item.threshold)
                  .map((item) => (
                    <Card key={item.id} className="border-0 shadow-sm">
                      <Card.Body className="p-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-1">{item.name}</h6>
                            <div className="text-muted small">
                              {item.quantity} {item.unit} remaining
                            </div>
                          </div>
                          <Badge
                            bg={
                              item.quantity <= item.threshold / 2
                                ? "danger"
                                : "warning"
                            }
                          >
                            {item.quantity <= item.threshold / 2
                              ? "Critical"
                              : "Low"}
                          </Badge>
                        </div>
                        <ProgressBar
                          className="mt-2"
                          variant={
                            item.quantity <= item.threshold / 2
                              ? "danger"
                              : "warning"
                          }
                          now={(item.quantity / item.threshold) * 100}
                          style={{ height: "5px" }}
                        />
                      </Card.Body>
                    </Card>
                  ))}

                {inventory.filter((item) => item.quantity <= item.threshold)
                  .length === 0 && (
                  <div className="text-center text-muted py-5">
                    <p>No low stock items</p>
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Add Inventory Item Modal */}
      <Modal
        show={showItemModal}
        onHide={() => setShowItemModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Inventory Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Item Name</Form.Label>
              <Form.Control type="text" placeholder="Enter item name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control type="text" placeholder="Enter category" />
            </Form.Group>
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control type="number" placeholder="Enter quantity" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Unit</Form.Label>
                  <Form.Select>
                    <option value="kg">kg</option>
                    <option value="liter">liter</option>
                    <option value="pieces">pieces</option>
                    <option value="bottles">bottles</option>
                    <option value="packets">packets</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Low Stock Threshold</Form.Label>
              <Form.Control type="number" placeholder="Enter threshold" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Supplier</Form.Label>
              <Form.Select>
                <option value="">Select Supplier</option>
                {suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.name}>
                    {supplier.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowItemModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveItem}>
            Add Item
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Supplier Modal */}
      <Modal
        show={showSupplierModal}
        onHide={() => setShowSupplierModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Supplier</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Supplier Name</Form.Label>
              <Form.Control type="text" placeholder="Enter supplier name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control type="tel" placeholder="Enter contact number" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
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
              <Form.Label>Items Supplied</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Enter items (comma separated)"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowSupplierModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveSupplier}>
            Add Supplier
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Create Purchase Order Modal */}
      <Modal
        show={showPurchaseModal}
        onHide={() => setShowPurchaseModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Purchase Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Supplier</Form.Label>
              <Form.Select>
                <option value="">Select Supplier</option>
                {suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.name}>
                    {supplier.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Items</Form.Label>
              <div className="border rounded p-3">
                <div className="mb-2">
                  <Button variant="outline-primary" size="sm">
                    <FaPlus className="me-1" /> Add Item
                  </Button>
                </div>
                <Table size="sm">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Unit</th>
                      <th>Price</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Form.Select size="sm">
                          <option value="">Select Item</option>
                          {inventory.map((item) => (
                            <option key={item.id} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                        </Form.Select>
                      </td>
                      <td>
                        <Form.Control
                          type="number"
                          size="sm"
                          placeholder="Qty"
                        />
                      </td>
                      <td>kg</td>
                      <td>
                        <Form.Control
                          type="number"
                          size="sm"
                          placeholder="Price"
                        />
                      </td>
                      <td>₹0</td>
                      <td>
                        <Button variant="outline-danger" size="sm">
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Form.Group>
            <div className="d-flex justify-content-between mb-3">
              <span>Total Amount:</span>
              <span className="fw-bold">₹0</span>
            </div>
            <Form.Group className="mb-3">
              <Form.Label>Notes</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter notes" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowPurchaseModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSavePurchase}>
            Create Order
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Inventory;
