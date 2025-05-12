import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
  Tab,
  Nav,
  Table,
  Badge,
  InputGroup,
  Dropdown,
} from "react-bootstrap";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaExchangeAlt,
  FaUsers,
  FaUtensils,
  FaClock,
  FaCalendarAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
  FaSearch,
  FaFilter,
  FaCheckCircle,
  FaTimesCircle,
  FaUserFriends,
  FaPrint,
  FaMobileAlt,
  FaLink,
  FaDownload,
} from "react-icons/fa";

const TableManagement = () => {
  const [showTableModal, setShowTableModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [showQRCodeModal, setShowQRCodeModal] = useState(false);
  const [showReservationSourcesModal, setShowReservationSourcesModal] =
    useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [transferToTable, setTransferToTable] = useState(null);
  const [floorPlan, setFloorPlan] = useState("ground-floor");
  const [activeTab, setActiveTab] = useState("tables");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSource, setFilterSource] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDate, setFilterDate] = useState("");

  // Sample tables data
  const tables = {
    "ground-floor": Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      name: `Table ${i + 1}`,
      capacity: Math.floor(Math.random() * 3) + 2, // 2-4 people
      status:
        Math.random() > 0.7
          ? "occupied"
          : Math.random() > 0.5
          ? "reserved"
          : "available",
      order:
        Math.random() > 0.7
          ? {
              id: `ORD-00${i + 1}`,
              items: Math.floor(Math.random() * 5) + 1,
              amount: Math.floor(Math.random() * 2000) + 500,
              time: `${Math.floor(Math.random() * 60) + 10} mins ago`,
            }
          : null,
    })),
    "first-floor": Array.from({ length: 8 }, (_, i) => ({
      id: i + 13,
      name: `Table ${i + 13}`,
      capacity: Math.floor(Math.random() * 3) + 4, // 4-6 people
      status:
        Math.random() > 0.7
          ? "occupied"
          : Math.random() > 0.5
          ? "reserved"
          : "available",
      order:
        Math.random() > 0.7
          ? {
              id: `ORD-00${i + 13}`,
              items: Math.floor(Math.random() * 5) + 1,
              amount: Math.floor(Math.random() * 2000) + 500,
              time: `${Math.floor(Math.random() * 60) + 10} mins ago`,
            }
          : null,
    })),
    outdoor: Array.from({ length: 5 }, (_, i) => ({
      id: i + 21,
      name: `Table ${i + 21}`,
      capacity: Math.floor(Math.random() * 3) + 2, // 2-4 people
      status:
        Math.random() > 0.7
          ? "occupied"
          : Math.random() > 0.5
          ? "reserved"
          : "available",
      order:
        Math.random() > 0.7
          ? {
              id: `ORD-00${i + 21}`,
              items: Math.floor(Math.random() * 5) + 1,
              amount: Math.floor(Math.random() * 2000) + 500,
              time: `${Math.floor(Math.random() * 60) + 10} mins ago`,
            }
          : null,
    })),
  };

  // Sample reservations data
  const reservations = [
    {
      id: 1,
      name: "John Doe",
      phone: "9876543210",
      email: "john.doe@example.com",
      guests: 4,
      time: "7:00 PM",
      date: "2023-11-05",
      table: "Table 5",
      status: "confirmed",
      source: "direct",
      notes: "Birthday celebration",
      created: "2023-10-30",
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "8765432109",
      email: "jane.smith@example.com",
      guests: 2,
      time: "8:30 PM",
      date: "2023-11-05",
      table: "Table 8",
      status: "confirmed",
      source: "website",
      notes: "Window seat preferred",
      created: "2023-10-31",
    },
    {
      id: 3,
      name: "Robert Johnson",
      phone: "7654321098",
      email: "robert.j@example.com",
      guests: 6,
      time: "7:30 PM",
      date: "2023-11-06",
      table: "Table 15",
      status: "pending",
      source: "zomato",
      notes: "Anniversary dinner",
      created: "2023-11-01",
    },
    {
      id: 4,
      name: "Emily Davis",
      phone: "6543210987",
      email: "emily.d@example.com",
      guests: 3,
      time: "6:45 PM",
      date: "2023-11-06",
      table: "Table 3",
      status: "confirmed",
      source: "direct",
      notes: "",
      created: "2023-11-01",
    },
    {
      id: 5,
      name: "Michael Wilson",
      phone: "5432109876",
      email: "michael.w@example.com",
      guests: 5,
      time: "8:00 PM",
      date: "2023-11-07",
      table: "Table 18",
      status: "pending",
      source: "swiggy",
      notes: "Vegetarian guests",
      created: "2023-11-02",
    },
    {
      id: 6,
      name: "Priya Sharma",
      phone: "9876543220",
      email: "priya.s@example.com",
      guests: 4,
      time: "7:15 PM",
      date: "2023-11-07",
      table: "Table 10",
      status: "confirmed",
      source: "website",
      notes: "",
      created: "2023-11-02",
    },
    {
      id: 7,
      name: "Rahul Patel",
      phone: "8765432119",
      email: "rahul.p@example.com",
      guests: 2,
      time: "8:45 PM",
      date: "2023-11-08",
      table: "Table 7",
      status: "confirmed",
      source: "dineout",
      notes: "Business dinner",
      created: "2023-11-03",
    },
  ];

  // Reservation sources
  const reservationSources = [
    { id: "direct", name: "Direct / Phone", color: "primary", active: true },
    { id: "website", name: "Website", color: "success", active: true },
    { id: "zomato", name: "Zomato", color: "danger", active: true },
    { id: "swiggy", name: "Swiggy", color: "warning", active: true },
    { id: "dineout", name: "Dineout", color: "info", active: true },
    { id: "eazydiner", name: "EazyDiner", color: "secondary", active: false },
  ];

  // Sample waitlist data
  const waitlist = [
    {
      id: 1,
      name: "Sarah Thompson",
      phone: "9876543211",
      guests: 2,
      time: "6:30 PM",
      waitTime: "~15 mins",
    },
    {
      id: 2,
      name: "David Brown",
      phone: "8765432100",
      guests: 4,
      time: "7:15 PM",
      waitTime: "~25 mins",
    },
    {
      id: 3,
      name: "Lisa Anderson",
      phone: "7654321099",
      guests: 3,
      time: "7:45 PM",
      waitTime: "~40 mins",
    },
  ];

  const handleTableClick = (table) => {
    setSelectedTable(table);
    setShowTableModal(true);
  };

  const handleTransferTable = (table) => {
    setSelectedTable(table);
    setShowTransferModal(true);
  };

  const handleTransferConfirm = () => {
    // Transfer logic would go here
    setShowTransferModal(false);
    alert(
      `Order transferred from ${selectedTable.name} to ${transferToTable.name}`
    );
  };

  const handleAddReservation = () => {
    setShowReservationModal(true);
  };

  const handleReservationConfirm = () => {
    // Reservation logic would go here
    setShowReservationModal(false);
    alert("Reservation added successfully!");
  };

  // Filter reservations based on search term, source, status, and date
  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      searchTerm === "" ||
      reservation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.phone.includes(searchTerm) ||
      reservation.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSource =
      filterSource === "all" || reservation.source === filterSource;
    const matchesStatus =
      filterStatus === "all" || reservation.status === filterStatus;
    const matchesDate = filterDate === "" || reservation.date === filterDate;

    return matchesSearch && matchesSource && matchesStatus && matchesDate;
  });

  // Handle adding a new waitlist entry
  const handleAddWaitlist = () => {
    setShowWaitlistModal(true);
  };

  // Handle saving a waitlist entry
  const handleWaitlistConfirm = () => {
    setShowWaitlistModal(false);
    alert("Customer added to waitlist successfully!");
  };

  // Handle showing QR code modal
  const handleShowQRCode = () => {
    setShowQRCodeModal(true);
  };

  // Handle showing reservation sources modal
  const handleShowReservationSources = () => {
    setShowReservationSourcesModal(true);
  };

  // Get source badge color
  const getSourceBadgeColor = (source) => {
    const sourceObj = reservationSources.find((s) => s.id === source);
    return sourceObj ? sourceObj.color : "secondary";
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Table & Reservation Management</h5>
                <div className="d-flex gap-2">
                  <Button
                    variant="outline-secondary"
                    onClick={handleShowQRCode}
                  >
                    <FaPrint className="me-1" /> Scan & Order
                  </Button>
                  <Button
                    variant="outline-primary"
                    onClick={handleShowReservationSources}
                  >
                    <FaGlobe className="me-1" /> Reservation Sources
                  </Button>
                  <Button variant="outline-success" onClick={handleAddWaitlist}>
                    <FaUsers className="me-1" /> Add to Waitlist
                  </Button>
                  <Button variant="primary" onClick={handleAddReservation}>
                    <FaCalendarAlt className="me-1" /> Add Reservation
                  </Button>
                </div>
              </div>

              <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
                <Nav variant="tabs" className="mb-3">
                  <Nav.Item>
                    <Nav.Link eventKey="tables">
                      <FaUtensils className="me-1" /> Tables
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="reservations">
                      <FaCalendarAlt className="me-1" /> Reservations
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="waitlist">
                      <FaUserFriends className="me-1" /> Waitlist
                    </Nav.Link>
                  </Nav.Item>
                </Nav>

                <Tab.Content>
                  <Tab.Pane eventKey="tables">
                    <Nav variant="pills" className="mb-3">
                      <Nav.Item>
                        <Nav.Link
                          active={floorPlan === "ground-floor"}
                          onClick={() => setFloorPlan("ground-floor")}
                        >
                          Ground Floor
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          active={floorPlan === "first-floor"}
                          onClick={() => setFloorPlan("first-floor")}
                        >
                          First Floor
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          active={floorPlan === "outdoor"}
                          onClick={() => setFloorPlan("outdoor")}
                        >
                          Outdoor
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>

                    <div className="table-layout">
                      {tables[floorPlan].map((table) => (
                        <div
                          key={table.id}
                          className={`table-item ${table.status}`}
                          onClick={() => handleTableClick(table)}
                        >
                          <div>{table.name}</div>
                          <small>{table.capacity} Seats</small>
                        </div>
                      ))}
                    </div>
                  </Tab.Pane>

                  <Tab.Pane eventKey="reservations">
                    <Row className="mb-3">
                      <Col md={4}>
                        <InputGroup>
                          <InputGroup.Text>
                            <FaSearch />
                          </InputGroup.Text>
                          <Form.Control
                            placeholder="Search reservations..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </InputGroup>
                      </Col>
                      <Col md={8}>
                        <div className="d-flex gap-2 justify-content-end">
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="outline-secondary"
                              id="dropdown-source"
                            >
                              <FaFilter className="me-1" /> Source:{" "}
                              {filterSource === "all"
                                ? "All"
                                : reservationSources.find(
                                    (s) => s.id === filterSource
                                  )?.name || "All"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item
                                onClick={() => setFilterSource("all")}
                              >
                                All Sources
                              </Dropdown.Item>
                              <Dropdown.Divider />
                              {reservationSources
                                .filter((s) => s.active)
                                .map((source) => (
                                  <Dropdown.Item
                                    key={source.id}
                                    onClick={() => setFilterSource(source.id)}
                                  >
                                    {source.name}
                                  </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                          </Dropdown>

                          <Dropdown>
                            <Dropdown.Toggle
                              variant="outline-secondary"
                              id="dropdown-status"
                            >
                              <FaFilter className="me-1" /> Status:{" "}
                              {filterStatus === "all"
                                ? "All"
                                : filterStatus.charAt(0).toUpperCase() +
                                  filterStatus.slice(1)}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item
                                onClick={() => setFilterStatus("all")}
                              >
                                All Statuses
                              </Dropdown.Item>
                              <Dropdown.Divider />
                              <Dropdown.Item
                                onClick={() => setFilterStatus("confirmed")}
                              >
                                Confirmed
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => setFilterStatus("pending")}
                              >
                                Pending
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>

                          <Form.Control
                            type="date"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                            style={{ width: "auto" }}
                          />
                        </div>
                      </Col>
                    </Row>

                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Contact</th>
                          <th>Guests</th>
                          <th>Date & Time</th>
                          <th>Table</th>
                          <th>Source</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredReservations.map((reservation) => (
                          <tr key={reservation.id}>
                            <td>{reservation.name}</td>
                            <td>
                              <div>
                                <FaPhoneAlt
                                  className="me-1 text-muted"
                                  size={12}
                                />{" "}
                                {reservation.phone}
                              </div>
                              <div>
                                <FaEnvelope
                                  className="me-1 text-muted"
                                  size={12}
                                />{" "}
                                {reservation.email}
                              </div>
                            </td>
                            <td>{reservation.guests}</td>
                            <td>
                              {reservation.date}
                              <div>
                                <small>{reservation.time}</small>
                              </div>
                            </td>
                            <td>{reservation.table}</td>
                            <td>
                              <Badge
                                bg={getSourceBadgeColor(reservation.source)}
                              >
                                {reservationSources.find(
                                  (s) => s.id === reservation.source
                                )?.name || reservation.source}
                              </Badge>
                            </td>
                            <td>
                              <Badge
                                bg={
                                  reservation.status === "confirmed"
                                    ? "success"
                                    : "warning"
                                }
                              >
                                {reservation.status}
                              </Badge>
                            </td>
                            <td>
                              <div className="d-flex gap-1">
                                <Button variant="outline-primary" size="sm">
                                  <FaEdit />
                                </Button>
                                <Button variant="outline-danger" size="sm">
                                  <FaTrash />
                                </Button>
                                {reservation.status === "pending" && (
                                  <Button variant="outline-success" size="sm">
                                    <FaCheckCircle />
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Tab.Pane>

                  <Tab.Pane eventKey="waitlist">
                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Guests</th>
                          <th>Time</th>
                          <th>Wait Time</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {waitlist.map((entry) => (
                          <tr key={entry.id}>
                            <td>
                              {entry.name}
                              <div>
                                <small className="text-muted">
                                  {entry.phone}
                                </small>
                              </div>
                            </td>
                            <td>{entry.guests}</td>
                            <td>{entry.time}</td>
                            <td>{entry.waitTime}</td>
                            <td>
                              <div className="d-flex gap-1">
                                <Button variant="success" size="sm">
                                  <FaUtensils className="me-1" /> Seat
                                </Button>
                                <Button variant="outline-primary" size="sm">
                                  <FaEdit />
                                </Button>
                                <Button variant="outline-danger" size="sm">
                                  <FaTrash />
                                </Button>
                              </div>
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

      {/* Table Details Modal */}
      <Modal
        show={showTableModal}
        onHide={() => setShowTableModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedTable?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTable && (
            <>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Status:</span>
                  <Badge
                    bg={
                      selectedTable.status === "available"
                        ? "success"
                        : selectedTable.status === "occupied"
                        ? "danger"
                        : "warning"
                    }
                  >
                    {selectedTable.status.charAt(0).toUpperCase() +
                      selectedTable.status.slice(1)}
                  </Badge>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Capacity:</span>
                  <span>{selectedTable.capacity} Seats</span>
                </div>
              </div>

              {selectedTable.status === "occupied" && selectedTable.order && (
                <div className="mb-3">
                  <h6>Current Order</h6>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Order ID:</span>
                    <span>{selectedTable.order.id}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Items:</span>
                    <span>{selectedTable.order.items}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Amount:</span>
                    <span>₹{selectedTable.order.amount}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Time:</span>
                    <span>{selectedTable.order.time}</span>
                  </div>
                </div>
              )}

              <div className="d-grid gap-2">
                {selectedTable.status === "available" && (
                  <Button variant="primary">
                    <FaPlus className="me-1" /> New Order
                  </Button>
                )}
                {selectedTable.status === "occupied" && (
                  <>
                    <Button variant="primary">
                      <FaEdit className="me-1" /> Edit Order
                    </Button>
                    <Button
                      variant="warning"
                      onClick={() => handleTransferTable(selectedTable)}
                    >
                      <FaExchangeAlt className="me-1" /> Transfer Table
                    </Button>
                    <Button variant="success">
                      <FaUtensils className="me-1" /> Bill Out
                    </Button>
                  </>
                )}
                {selectedTable.status === "reserved" && (
                  <Button variant="primary">
                    <FaUsers className="me-1" /> Seat Guests
                  </Button>
                )}
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>

      {/* Transfer Table Modal */}
      <Modal
        show={showTransferModal}
        onHide={() => setShowTransferModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Transfer {selectedTable?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Select a table to transfer the order to:</p>
          <div
            className="table-layout"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
            }}
          >
            {Object.values(tables)
              .flat()
              .filter(
                (table) =>
                  table.status === "available" && table.id !== selectedTable?.id
              )
              .map((table) => (
                <div
                  key={table.id}
                  className={`table-item ${table.status} ${
                    transferToTable?.id === table.id
                      ? "border border-primary border-3"
                      : ""
                  }`}
                  onClick={() => setTransferToTable(table)}
                >
                  {table.name}
                </div>
              ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowTransferModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleTransferConfirm}
            disabled={!transferToTable}
          >
            Transfer
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Reservation Modal */}
      <Modal
        show={showReservationModal}
        onHide={() => setShowReservationModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Reservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" />
            </Form.Group>
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="tel" placeholder="Enter phone number" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Number of Guests</Form.Label>
                  <Form.Control type="number" min="1" placeholder="Guests" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Table</Form.Label>
                  <Form.Select>
                    <option>Select Table</option>
                    {Object.values(tables)
                      .flat()
                      .map((table) => (
                        <option key={table.id} value={table.id}>
                          {table.name} ({table.capacity} seats)
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Time</Form.Label>
                  <Form.Control type="time" />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Reservation Source</Form.Label>
              <Form.Select>
                <option value="">Select Source</option>
                {reservationSources
                  .filter((s) => s.active)
                  .map((source) => (
                    <option key={source.id} value={source.id}>
                      {source.name}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Special Requests</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter any special requests"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowReservationModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleReservationConfirm}>
            Add Reservation
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Waitlist Modal */}
      <Modal
        show={showWaitlistModal}
        onHide={() => setShowWaitlistModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add to Waitlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="tel" placeholder="Enter phone number" />
            </Form.Group>
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Number of Guests</Form.Label>
                  <Form.Control type="number" min="1" placeholder="Guests" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Estimated Wait Time</Form.Label>
                  <Form.Select>
                    <option value="~10 mins">~10 minutes</option>
                    <option value="~15 mins">~15 minutes</option>
                    <option value="~20 mins">~20 minutes</option>
                    <option value="~30 mins">~30 minutes</option>
                    <option value="~45 mins">~45 minutes</option>
                    <option value="~60 mins">~60 minutes</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Enter any notes"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowWaitlistModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleWaitlistConfirm}>
            Add to Waitlist
          </Button>
        </Modal.Footer>
      </Modal>

      {/* QR Code Modal */}
      <Modal
        show={showQRCodeModal}
        onHide={() => setShowQRCodeModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Scan & Order QR Codes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-3">
            Generate QR codes for tables to enable contactless ordering.
            Customers can scan these codes to view the menu and place orders
            directly from their phones.
          </p>

          <Row className="mb-4">
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Select Table</Form.Label>
                <Form.Select>
                  <option value="">All Tables</option>
                  {Object.values(tables)
                    .flat()
                    .map((table) => (
                      <option key={table.id} value={table.id}>
                        {table.name}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>QR Code Type</Form.Label>
                <Form.Select>
                  <option value="menu">Menu Only</option>
                  <option value="order">Order Placement</option>
                  <option value="full">Full Experience</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>QR Code Size</Form.Label>
                <Form.Select>
                  <option value="small">Small (100x100)</option>
                  <option value="medium" selected>
                    Medium (200x200)
                  </option>
                  <option value="large">Large (300x300)</option>
                  <option value="xlarge">Extra Large (400x400)</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  id="include-logo"
                  label="Include Restaurant Logo"
                  defaultChecked
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  id="include-table-number"
                  label="Include Table Number"
                  defaultChecked
                />
              </Form.Group>
            </Col>

            <Col md={8}>
              <div className="text-center p-4 border rounded mb-3">
                <div className="mb-3">
                  <FaPrint size={200} />
                </div>
                <h5>Table 5 QR Code</h5>
                <p className="text-muted mb-0">Scan to order from Table 5</p>
              </div>

              <div className="d-flex gap-2 justify-content-center">
                <Button variant="outline-primary">
                  <FaPrint className="me-1" /> Print QR Code
                </Button>
                <Button variant="outline-secondary">
                  <FaDownload className="me-1" /> Download
                </Button>
                <Button variant="outline-info">
                  <FaLink className="me-1" /> Share Link
                </Button>
              </div>
            </Col>
          </Row>

          <Card className="mb-3">
            <Card.Header>
              <h6 className="mb-0">Scan & Order Settings</h6>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Landing Page Title</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue="Welcome to SmartPOS Restaurant"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Welcome Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      defaultValue="Scan the QR code on your table to browse our menu and place your order directly from your phone."
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Order Confirmation Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      defaultValue="Thank you for your order! Your food will be served shortly."
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="switch"
                      id="enable-payment"
                      label="Enable Online Payment"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <Form.Check
                    type="switch"
                    id="enable-scan-order"
                    label="Enable Scan & Order Feature"
                    defaultChecked
                  />
                </div>
                <Button variant="primary" size="sm">
                  Save Settings
                </Button>
              </div>
            </Card.Body>
          </Card>

          <div className="d-flex align-items-center gap-3 p-3 bg-light rounded">
            <FaMobileAlt size={24} className="text-primary" />
            <div>
              <h6 className="mb-1">Mobile Preview</h6>
              <p className="mb-0 text-muted">
                See how your Scan & Order page will look on a mobile device
              </p>
            </div>
            <Button variant="outline-primary" className="ms-auto">
              Preview
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowQRCodeModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Reservation Sources Modal */}
      <Modal
        show={showReservationSourcesModal}
        onHide={() => setShowReservationSourcesModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Manage Reservation Sources</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-3">
            Configure and manage different reservation sources to track where
            your bookings are coming from.
          </p>

          <Table hover responsive>
            <thead>
              <tr>
                <th>Source Name</th>
                <th>Color</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservationSources.map((source) => (
                <tr key={source.id}>
                  <td>
                    <strong>{source.name}</strong>
                    <div>
                      <small className="text-muted">ID: {source.id}</small>
                    </div>
                  </td>
                  <td>
                    <Badge bg={source.color} style={{ width: "60px" }}>
                      &nbsp;
                    </Badge>
                  </td>
                  <td>
                    <Badge bg={source.active ? "success" : "secondary"}>
                      {source.active ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td>
                    <div className="d-flex gap-1">
                      <Button variant="outline-primary" size="sm">
                        <FaEdit />
                      </Button>
                      <Button variant="outline-danger" size="sm">
                        <FaTrash />
                      </Button>
                      <Button
                        variant={
                          source.active
                            ? "outline-secondary"
                            : "outline-success"
                        }
                        size="sm"
                      >
                        {source.active ? <FaTimesCircle /> : <FaCheckCircle />}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Button variant="primary" className="mt-2">
            <FaPlus className="me-1" /> Add New Source
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowReservationSourcesModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TableManagement;
