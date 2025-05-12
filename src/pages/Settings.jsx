import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Nav,
  Tab,
  InputGroup,
  Modal,
} from "react-bootstrap";
import {
  FaGlobe,
  FaEdit,
  FaImage,
  FaShoppingCart,
  FaDesktop,
  FaMobileAlt,
  FaTabletAlt,
  FaCog,
  FaPalette,
  FaCode,
  FaLink,
  FaCheck,
  FaEye,
  FaSave,
  FaStore,
  FaChartLine,
  FaMoneyBill,
  FaMotorcycle,
  FaMapMarkerAlt,
  FaPlus,
} from "react-icons/fa";
import OnlineOrderingDashboard from "../components/online/OnlineOrderingDashboard";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("website");
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [websiteTheme, setWebsiteTheme] = useState("modern");
  const [primaryColor, setPrimaryColor] = useState("#4361ee");
  const [logoImage, setLogoImage] = useState(null);
  const [previewDevice, setPreviewDevice] = useState("desktop");

  // Website themes
  const themes = [
    { id: "modern", name: "Modern", image: "modern-theme.jpg" },
    { id: "classic", name: "Classic", image: "classic-theme.jpg" },
    { id: "minimal", name: "Minimal", image: "minimal-theme.jpg" },
    { id: "bold", name: "Bold", image: "bold-theme.jpg" },
  ];

  // Handle theme selection
  const handleThemeSelect = (themeId) => {
    setWebsiteTheme(themeId);
  };

  // Handle preview
  const handlePreview = () => {
    setShowPreviewModal(true);
  };

  // Handle save website settings
  const handleSaveWebsite = () => {
    alert("Website settings saved successfully!");
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Website & Online Ordering</h5>
                <div className="d-flex gap-2">
                  <Button variant="outline-primary" onClick={handlePreview}>
                    <FaEye className="me-1" /> Preview
                  </Button>
                  <Button variant="primary" onClick={handleSaveWebsite}>
                    <FaSave className="me-1" /> Save Changes
                  </Button>
                </div>
              </div>

              <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
                <Row>
                  <Col md={3}>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="website">
                          <FaGlobe className="me-2" /> Website Builder
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="ordering">
                          <FaShoppingCart className="me-2" /> Online Ordering
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="dashboard">
                          <FaChartLine className="me-2" /> Order Dashboard
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="delivery">
                          <FaMotorcycle className="me-2" /> Delivery Settings
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="payment">
                          <FaMoneyBill className="me-2" /> Payment Gateway
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="appearance">
                          <FaPalette className="me-2" /> Appearance
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="domain">
                          <FaLink className="me-2" /> Domain & SEO
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="advanced">
                          <FaCog className="me-2" /> Advanced Settings
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col md={9}>
                    <Tab.Content>
                      <Tab.Pane eventKey="website">
                        <h5 className="mb-3">Website Builder</h5>
                        <p className="text-muted mb-4">
                          Create and customize your restaurant website. Choose a
                          theme, add your content, and publish your site.
                        </p>

                        <Form>
                          <Form.Group className="mb-3">
                            <Form.Label>Restaurant Name</Form.Label>
                            <Form.Control
                              type="text"
                              defaultValue="SmartPOS Restaurant"
                            />
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Restaurant Description</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              defaultValue="Welcome to our restaurant. We serve delicious food with great ambiance."
                            />
                          </Form.Group>

                          <Form.Group className="mb-4">
                            <Form.Label>Logo</Form.Label>
                            <div className="d-flex align-items-center">
                              <div
                                className="border rounded d-flex align-items-center justify-content-center me-3"
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  backgroundColor: "#f8f9fa",
                                }}
                              >
                                {logoImage ? (
                                  <img
                                    src={logoImage}
                                    alt="Logo"
                                    style={{
                                      maxWidth: "100%",
                                      maxHeight: "100%",
                                    }}
                                  />
                                ) : (
                                  <FaImage size={24} className="text-muted" />
                                )}
                              </div>
                              <Button variant="outline-secondary">
                                <FaImage className="me-1" /> Upload Logo
                              </Button>
                            </div>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Choose a Theme</Form.Label>
                            <Row>
                              {themes.map((theme) => (
                                <Col key={theme.id} md={3} className="mb-3">
                                  <div
                                    className={`border rounded p-2 text-center cursor-pointer ${
                                      websiteTheme === theme.id
                                        ? "border-primary"
                                        : ""
                                    }`}
                                    onClick={() => handleThemeSelect(theme.id)}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <div
                                      className="mb-2 bg-light d-flex align-items-center justify-content-center"
                                      style={{ height: "120px" }}
                                    >
                                      <FaDesktop
                                        size={40}
                                        className="text-muted"
                                      />
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center">
                                      {websiteTheme === theme.id && (
                                        <FaCheck className="text-primary me-1" />
                                      )}
                                      {theme.name}
                                    </div>
                                  </div>
                                </Col>
                              ))}
                            </Row>
                          </Form.Group>
                        </Form>
                      </Tab.Pane>

                      <Tab.Pane eventKey="ordering">
                        <h5 className="mb-3">Online Ordering Widget</h5>
                        <p className="text-muted mb-4">
                          Configure your online ordering system. Set up menu
                          items, delivery options, and payment methods.
                        </p>

                        <Form>
                          <Form.Group className="mb-3">
                            <Form.Check
                              type="switch"
                              id="enable-online-ordering"
                              label="Enable Online Ordering"
                              defaultChecked
                            />
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Ordering Button Text</Form.Label>
                            <Form.Control
                              type="text"
                              defaultValue="Order Online"
                            />
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Minimum Order Value</Form.Label>
                            <InputGroup>
                              <InputGroup.Text>₹</InputGroup.Text>
                              <Form.Control type="number" defaultValue="200" />
                            </InputGroup>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Delivery Options</Form.Label>
                            <div>
                              <Form.Check
                                type="checkbox"
                                id="delivery-option"
                                label="Home Delivery"
                                defaultChecked
                                className="mb-2"
                              />
                              <Form.Check
                                type="checkbox"
                                id="pickup-option"
                                label="Self Pickup"
                                defaultChecked
                                className="mb-2"
                              />
                              <Form.Check
                                type="checkbox"
                                id="dine-in-option"
                                label="Dine-in Reservation"
                                defaultChecked
                              />
                            </div>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Payment Methods</Form.Label>
                            <div>
                              <Form.Check
                                type="checkbox"
                                id="online-payment"
                                label="Online Payment"
                                defaultChecked
                                className="mb-2"
                              />
                              <Form.Check
                                type="checkbox"
                                id="cod-payment"
                                label="Cash on Delivery"
                                defaultChecked
                              />
                            </div>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Order Notifications</Form.Label>
                            <div>
                              <Form.Check
                                type="checkbox"
                                id="email-notification"
                                label="Email Notifications"
                                defaultChecked
                                className="mb-2"
                              />
                              <Form.Check
                                type="checkbox"
                                id="sms-notification"
                                label="SMS Notifications"
                                defaultChecked
                                className="mb-2"
                              />
                              <Form.Check
                                type="checkbox"
                                id="push-notification"
                                label="Push Notifications"
                                defaultChecked
                              />
                            </div>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Order Confirmation Message</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              defaultValue="Thank you for your order! Your order has been received and is being processed. You will receive a confirmation shortly."
                            />
                          </Form.Group>
                        </Form>
                      </Tab.Pane>

                      <Tab.Pane eventKey="dashboard">
                        <OnlineOrderingDashboard />
                      </Tab.Pane>

                      <Tab.Pane eventKey="delivery">
                        <h5 className="mb-3">Delivery Settings</h5>
                        <p className="text-muted mb-4">
                          Configure your delivery settings, zones, and delivery
                          partners.
                        </p>

                        <Form>
                          <Form.Group className="mb-3">
                            <Form.Label>Delivery Radius (km)</Form.Label>
                            <Form.Control type="number" defaultValue="5" />
                            <Form.Text className="text-muted">
                              Maximum distance for delivery from your restaurant
                            </Form.Text>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Delivery Fee</Form.Label>
                            <InputGroup>
                              <InputGroup.Text>₹</InputGroup.Text>
                              <Form.Control type="number" defaultValue="50" />
                            </InputGroup>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Free Delivery Above</Form.Label>
                            <InputGroup>
                              <InputGroup.Text>₹</InputGroup.Text>
                              <Form.Control type="number" defaultValue="500" />
                            </InputGroup>
                            <Form.Text className="text-muted">
                              Orders above this amount will have free delivery
                            </Form.Text>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>
                              Estimated Delivery Time (minutes)
                            </Form.Label>
                            <Form.Control type="number" defaultValue="45" />
                          </Form.Group>

                          <h6 className="mt-4 mb-3">Delivery Zones</h6>

                          <Card className="mb-3">
                            <Card.Body>
                              <div className="d-flex justify-content-between align-items-start mb-2">
                                <div>
                                  <h6 className="mb-1">Zone 1 (0-3 km)</h6>
                                  <p className="text-muted mb-0">
                                    Delivery Fee: ₹30
                                  </p>
                                </div>
                                <Button variant="outline-primary" size="sm">
                                  <FaEdit />
                                </Button>
                              </div>
                            </Card.Body>
                          </Card>

                          <Card className="mb-3">
                            <Card.Body>
                              <div className="d-flex justify-content-between align-items-start mb-2">
                                <div>
                                  <h6 className="mb-1">Zone 2 (3-5 km)</h6>
                                  <p className="text-muted mb-0">
                                    Delivery Fee: ₹50
                                  </p>
                                </div>
                                <Button variant="outline-primary" size="sm">
                                  <FaEdit />
                                </Button>
                              </div>
                            </Card.Body>
                          </Card>

                          <Card className="mb-3">
                            <Card.Body>
                              <div className="d-flex justify-content-between align-items-start mb-2">
                                <div>
                                  <h6 className="mb-1">Zone 3 (5-8 km)</h6>
                                  <p className="text-muted mb-0">
                                    Delivery Fee: ₹80
                                  </p>
                                </div>
                                <Button variant="outline-primary" size="sm">
                                  <FaEdit />
                                </Button>
                              </div>
                            </Card.Body>
                          </Card>

                          <Button variant="outline-primary" className="mb-4">
                            <FaPlus className="me-1" /> Add Delivery Zone
                          </Button>

                          <h6 className="mt-4 mb-3">Delivery Partners</h6>

                          <Form.Group className="mb-3">
                            <Form.Check
                              type="switch"
                              id="own-delivery"
                              label="Use Own Delivery Staff"
                              defaultChecked
                            />
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Check
                              type="switch"
                              id="third-party-delivery"
                              label="Use Third-Party Delivery Services"
                            />
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>
                              Third-Party Delivery Services
                            </Form.Label>
                            <div>
                              <Form.Check
                                type="checkbox"
                                id="service1"
                                label="Delivery Service 1"
                                className="mb-2"
                              />
                              <Form.Check
                                type="checkbox"
                                id="service2"
                                label="Delivery Service 2"
                                className="mb-2"
                              />
                              <Form.Check
                                type="checkbox"
                                id="service3"
                                label="Delivery Service 3"
                              />
                            </div>
                          </Form.Group>
                        </Form>
                      </Tab.Pane>

                      <Tab.Pane eventKey="payment">
                        <h5 className="mb-3">Payment Gateway Settings</h5>
                        <p className="text-muted mb-4">
                          Configure your payment gateway settings for online
                          ordering.
                        </p>

                        <Form>
                          <Form.Group className="mb-3">
                            <Form.Label>Payment Gateway</Form.Label>
                            <Form.Select defaultValue="razorpay">
                              <option value="razorpay">Razorpay</option>
                              <option value="stripe">Stripe</option>
                              <option value="paypal">PayPal</option>
                              <option value="paytm">Paytm</option>
                            </Form.Select>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>API Key</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter API key"
                            />
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>API Secret</Form.Label>
                            <Form.Control
                              type="password"
                              placeholder="Enter API secret"
                            />
                          </Form.Group>

                          <h6 className="mt-4 mb-3">
                            Accepted Payment Methods
                          </h6>

                          <Form.Group className="mb-3">
                            <div>
                              <Form.Check
                                type="checkbox"
                                id="credit-card"
                                label="Credit Card"
                                defaultChecked
                                className="mb-2"
                              />
                              <Form.Check
                                type="checkbox"
                                id="debit-card"
                                label="Debit Card"
                                defaultChecked
                                className="mb-2"
                              />
                              <Form.Check
                                type="checkbox"
                                id="net-banking"
                                label="Net Banking"
                                defaultChecked
                                className="mb-2"
                              />
                              <Form.Check
                                type="checkbox"
                                id="upi"
                                label="UPI"
                                defaultChecked
                                className="mb-2"
                              />
                              <Form.Check
                                type="checkbox"
                                id="wallet"
                                label="Wallet"
                                defaultChecked
                                className="mb-2"
                              />
                              <Form.Check
                                type="checkbox"
                                id="cod"
                                label="Cash on Delivery"
                                defaultChecked
                              />
                            </div>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Payment Success Page</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              defaultValue="Thank you for your payment! Your order has been confirmed and is being processed."
                            />
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Payment Failure Page</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              defaultValue="We're sorry, but your payment could not be processed. Please try again or choose a different payment method."
                            />
                          </Form.Group>
                        </Form>
                      </Tab.Pane>

                      <Tab.Pane eventKey="appearance">
                        <h5 className="mb-3">Appearance Settings</h5>
                        <p className="text-muted mb-4">
                          Customize the look and feel of your website and online
                          ordering widget.
                        </p>

                        <Form>
                          <Form.Group className="mb-3">
                            <Form.Label>Primary Color</Form.Label>
                            <div className="d-flex align-items-center">
                              <Form.Control
                                type="color"
                                value={primaryColor}
                                onChange={(e) =>
                                  setPrimaryColor(e.target.value)
                                }
                                className="me-2"
                              />
                              <Form.Control
                                type="text"
                                value={primaryColor}
                                onChange={(e) =>
                                  setPrimaryColor(e.target.value)
                                }
                                style={{ width: "120px" }}
                              />
                            </div>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Font</Form.Label>
                            <Form.Select defaultValue="Inter">
                              <option value="Inter">Inter</option>
                              <option value="Roboto">Roboto</option>
                              <option value="Open Sans">Open Sans</option>
                              <option value="Lato">Lato</option>
                              <option value="Poppins">Poppins</option>
                            </Form.Select>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Button Style</Form.Label>
                            <Form.Select defaultValue="rounded">
                              <option value="rounded">Rounded</option>
                              <option value="pill">Pill</option>
                              <option value="square">Square</option>
                            </Form.Select>
                          </Form.Group>
                        </Form>
                      </Tab.Pane>

                      <Tab.Pane eventKey="domain">
                        <h5 className="mb-3">Domain & SEO</h5>
                        <p className="text-muted mb-4">
                          Configure your domain settings and optimize your
                          website for search engines.
                        </p>

                        <Form>
                          <Form.Group className="mb-3">
                            <Form.Label>Domain Name</Form.Label>
                            <InputGroup>
                              <Form.Control
                                type="text"
                                defaultValue="myrestaurant"
                              />
                              <InputGroup.Text>.smartpos.com</InputGroup.Text>
                            </InputGroup>
                            <Form.Text className="text-muted">
                              Your website will be available at
                              myrestaurant.smartpos.com
                            </Form.Text>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Custom Domain</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="e.g., www.myrestaurant.com"
                            />
                            <Form.Text className="text-muted">
                              Connect your own domain name (additional setup
                              required)
                            </Form.Text>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Meta Title</Form.Label>
                            <Form.Control
                              type="text"
                              defaultValue="SmartPOS Restaurant - Delicious Food & Great Ambiance"
                            />
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Meta Description</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={2}
                              defaultValue="Welcome to SmartPOS Restaurant. We serve delicious food with great ambiance. Order online or book a table now."
                            />
                          </Form.Group>
                        </Form>
                      </Tab.Pane>

                      <Tab.Pane eventKey="advanced">
                        <h5 className="mb-3">Advanced Settings</h5>
                        <p className="text-muted mb-4">
                          Configure advanced settings for your website and
                          online ordering system.
                        </p>

                        <Form>
                          <Form.Group className="mb-3">
                            <Form.Label>Google Analytics ID</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="e.g., UA-XXXXXXXXX-X"
                            />
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Facebook Pixel ID</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="e.g., XXXXXXXXXXXXXXXXXX"
                            />
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Custom CSS</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={4}
                              placeholder="Add custom CSS here..."
                            />
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Custom JavaScript</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={4}
                              placeholder="Add custom JavaScript here..."
                            />
                          </Form.Group>
                        </Form>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Website Preview Modal */}
      <Modal
        show={showPreviewModal}
        onHide={() => setShowPreviewModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Website Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="bg-light p-2 d-flex justify-content-center gap-2 border-bottom">
            <Button
              variant={
                previewDevice === "desktop" ? "primary" : "outline-secondary"
              }
              size="sm"
              onClick={() => setPreviewDevice("desktop")}
            >
              <FaDesktop className="me-1" /> Desktop
            </Button>
            <Button
              variant={
                previewDevice === "tablet" ? "primary" : "outline-secondary"
              }
              size="sm"
              onClick={() => setPreviewDevice("tablet")}
            >
              <FaTabletAlt className="me-1" /> Tablet
            </Button>
            <Button
              variant={
                previewDevice === "mobile" ? "primary" : "outline-secondary"
              }
              size="sm"
              onClick={() => setPreviewDevice("mobile")}
            >
              <FaMobileAlt className="me-1" /> Mobile
            </Button>
          </div>
          <div
            className="d-flex justify-content-center align-items-center p-3"
            style={{
              height: "500px",
              overflow: "auto",
              backgroundColor: "#f8f9fa",
            }}
          >
            <div
              className="bg-white shadow-sm border rounded"
              style={{
                width:
                  previewDevice === "desktop"
                    ? "100%"
                    : previewDevice === "tablet"
                    ? "768px"
                    : "375px",
                height: "100%",
                overflow: "hidden",
              }}
            >
              <div className="p-3 text-center">
                <h4>Website Preview</h4>
                <p className="text-muted">
                  Preview of your website with the{" "}
                  {themes.find((t) => t.id === websiteTheme)?.name} theme
                </p>
                <div className="border p-5 d-flex flex-column align-items-center justify-content-center">
                  <FaDesktop size={50} className="mb-3 text-muted" />
                  <p>Website preview would appear here</p>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowPreviewModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Settings;
