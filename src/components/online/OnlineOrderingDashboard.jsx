import { useState } from 'react';
import { Card, Row, Col, Button, Badge, Table, Form, InputGroup, Tabs, Tab, Alert, Dropdown } from 'react-bootstrap';
import { 
  FaShoppingCart, FaMotorcycle, FaStore, FaMapMarkerAlt, FaSearch, 
  FaFilter, FaCalendarAlt, FaExclamationTriangle, FaCheck, FaTimes, 
  FaUtensils, FaPhoneAlt, FaUser, FaMoneyBill, FaCreditCard, FaWallet,
  FaPrint, FaBell, FaExternalLinkAlt, FaEye, FaEdit, FaTrash, FaSync
} from 'react-icons/fa';

const OnlineOrderingDashboard = () => {
  const [activeTab, setActiveTab] = useState('newOrders');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSource, setFilterSource] = useState('all');
  const [dateRange, setDateRange] = useState('today');
  
  // Sample orders data
  const orders = [
    {
      id: 'OD-12345',
      customer: {
        name: 'John Doe',
        phone: '9876543210',
        address: '123 Main St, Apartment 4B, City',
        email: 'john@example.com'
      },
      items: [
        { id: 1, name: 'Chicken Biryani', quantity: 2, price: 320, total: 640, notes: 'Extra spicy' },
        { id: 2, name: 'Butter Naan', quantity: 4, price: 40, total: 160, notes: '' },
        { id: 3, name: 'Paneer Tikka', quantity: 1, price: 220, total: 220, notes: 'No onions' }
      ],
      orderType: 'delivery',
      source: 'website',
      status: 'new',
      paymentMethod: 'online',
      paymentStatus: 'paid',
      subtotal: 1020,
      tax: 51,
      deliveryFee: 50,
      discount: 0,
      total: 1121,
      orderTime: '2023-11-10 14:30:25',
      estimatedDelivery: '2023-11-10 15:15:00',
      deliveryPartner: 'Express Delivery',
      notes: 'Please ring the doorbell twice'
    },
    {
      id: 'OD-12346',
      customer: {
        name: 'Sarah Smith',
        phone: '8765432109',
        address: '456 Park Ave, City',
        email: 'sarah@example.com'
      },
      items: [
        { id: 4, name: 'Veg Pulao', quantity: 1, price: 180, total: 180, notes: '' },
        { id: 5, name: 'Dal Tadka', quantity: 1, price: 150, total: 150, notes: '' },
        { id: 6, name: 'Raita', quantity: 1, price: 50, total: 50, notes: '' },
        { id: 7, name: 'Gulab Jamun', quantity: 2, price: 60, total: 120, notes: '' }
      ],
      orderType: 'pickup',
      source: 'mobile_app',
      status: 'preparing',
      paymentMethod: 'card',
      paymentStatus: 'paid',
      subtotal: 500,
      tax: 25,
      deliveryFee: 0,
      discount: 50,
      total: 475,
      orderTime: '2023-11-10 13:45:10',
      estimatedPickup: '2023-11-10 14:15:00',
      notes: 'Allergic to nuts'
    },
    {
      id: 'OD-12347',
      customer: {
        name: 'Mike Johnson',
        phone: '7654321098',
        address: '789 Oak St, City',
        email: 'mike@example.com'
      },
      items: [
        { id: 8, name: 'Tandoori Chicken', quantity: 1, price: 350, total: 350, notes: '' },
        { id: 9, name: 'Butter Chicken', quantity: 1, price: 320, total: 320, notes: '' },
        { id: 10, name: 'Garlic Naan', quantity: 3, price: 50, total: 150, notes: '' },
        { id: 11, name: 'Jeera Rice', quantity: 2, price: 150, total: 300, notes: '' }
      ],
      orderType: 'delivery',
      source: 'food_aggregator',
      status: 'out_for_delivery',
      paymentMethod: 'cash',
      paymentStatus: 'pending',
      subtotal: 1120,
      tax: 56,
      deliveryFee: 60,
      discount: 0,
      total: 1236,
      orderTime: '2023-11-10 12:30:15',
      estimatedDelivery: '2023-11-10 13:20:00',
      deliveryPartner: 'Swift Delivery',
      notes: ''
    },
    {
      id: 'OD-12348',
      customer: {
        name: 'Emily Davis',
        phone: '6543210987',
        address: '101 Pine St, City',
        email: 'emily@example.com'
      },
      items: [
        { id: 12, name: 'Paneer Butter Masala', quantity: 1, price: 280, total: 280, notes: '' },
        { id: 13, name: 'Butter Naan', quantity: 2, price: 40, total: 80, notes: '' },
        { id: 14, name: 'Jeera Rice', quantity: 1, price: 150, total: 150, notes: '' }
      ],
      orderType: 'delivery',
      source: 'website',
      status: 'delivered',
      paymentMethod: 'online',
      paymentStatus: 'paid',
      subtotal: 510,
      tax: 25.5,
      deliveryFee: 50,
      discount: 0,
      total: 585.5,
      orderTime: '2023-11-10 11:15:30',
      deliveredTime: '2023-11-10 12:05:45',
      deliveryPartner: 'Express Delivery',
      notes: ''
    },
    {
      id: 'OD-12349',
      customer: {
        name: 'Robert Brown',
        phone: '5432109876',
        address: '',
        email: 'robert@example.com'
      },
      items: [
        { id: 15, name: 'Masala Dosa', quantity: 2, price: 120, total: 240, notes: '' },
        { id: 16, name: 'Idli Sambar', quantity: 1, price: 80, total: 80, notes: '' },
        { id: 17, name: 'Filter Coffee', quantity: 2, price: 40, total: 80, notes: '' }
      ],
      orderType: 'pickup',
      source: 'mobile_app',
      status: 'completed',
      paymentMethod: 'wallet',
      paymentStatus: 'paid',
      subtotal: 400,
      tax: 20,
      deliveryFee: 0,
      discount: 40,
      total: 380,
      orderTime: '2023-11-10 09:30:20',
      pickedupTime: '2023-11-10 10:00:15',
      notes: ''
    }
  ];
  
  // Filter orders based on tab, search term, and filters
  const filteredOrders = orders.filter(order => {
    // Filter by tab
    if (activeTab === 'newOrders' && order.status !== 'new') return false;
    if (activeTab === 'preparing' && order.status !== 'preparing') return false;
    if (activeTab === 'readyForPickup' && order.status !== 'ready_for_pickup') return false;
    if (activeTab === 'outForDelivery' && order.status !== 'out_for_delivery') return false;
    if (activeTab === 'completed' && !['delivered', 'completed'].includes(order.status)) return false;
    if (activeTab === 'cancelled' && order.status !== 'cancelled') return false;
    
    // Filter by search term
    if (searchTerm && !order.id.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !order.customer.phone.includes(searchTerm)) {
      return false;
    }
    
    // Filter by status
    if (filterStatus !== 'all' && order.status !== filterStatus) return false;
    
    // Filter by source
    if (filterSource !== 'all' && order.source !== filterSource) return false;
    
    return true;
  });
  
  // Handle order selection
  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };
  
  // Handle order status update
  const handleStatusUpdate = (orderId, newStatus) => {
    // In a real app, this would update the order status in the database
    console.log(`Updating order ${orderId} to status: ${newStatus}`);
    
    // For demo purposes, we'll just show an alert
    alert(`Order ${orderId} status updated to ${newStatus}`);
  };
  
  // Get status badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return <Badge bg="primary">New</Badge>;
      case 'preparing':
        return <Badge bg="info">Preparing</Badge>;
      case 'ready_for_pickup':
        return <Badge bg="warning">Ready for Pickup</Badge>;
      case 'out_for_delivery':
        return <Badge bg="warning">Out for Delivery</Badge>;
      case 'delivered':
        return <Badge bg="success">Delivered</Badge>;
      case 'completed':
        return <Badge bg="success">Completed</Badge>;
      case 'cancelled':
        return <Badge bg="danger">Cancelled</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };
  
  // Get order type icon
  const getOrderTypeIcon = (type) => {
    switch (type) {
      case 'delivery':
        return <FaMotorcycle className="text-primary" />;
      case 'pickup':
        return <FaStore className="text-success" />;
      default:
        return <FaShoppingCart className="text-secondary" />;
    }
  };
  
  // Get payment method icon
  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case 'cash':
        return <FaMoneyBill className="text-success" />;
      case 'card':
        return <FaCreditCard className="text-primary" />;
      case 'online':
        return <FaCreditCard className="text-info" />;
      case 'wallet':
        return <FaWallet className="text-warning" />;
      default:
        return <FaMoneyBill className="text-secondary" />;
    }
  };
  
  // Get source badge
  const getSourceBadge = (source) => {
    switch (source) {
      case 'website':
        return <Badge bg="primary">Website</Badge>;
      case 'mobile_app':
        return <Badge bg="info">Mobile App</Badge>;
      case 'food_aggregator':
        return <Badge bg="warning">Food Aggregator</Badge>;
      default:
        return <Badge bg="secondary">{source}</Badge>;
    }
  };
  
  return (
    <>
      <Card className="mb-4">
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Online Ordering Dashboard</h5>
            <div className="d-flex gap-2">
              <Button variant="outline-primary" className="d-flex align-items-center">
                <FaSync className="me-1" /> Refresh
              </Button>
              <Button variant="primary" className="d-flex align-items-center">
                <FaExternalLinkAlt className="me-1" /> View Online Store
              </Button>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <Row className="mb-4">
            <Col md={3} sm={6} className="mb-3">
              <Card className="h-100 border-primary">
                <Card.Body className="d-flex flex-column align-items-center">
                  <div className="d-flex justify-content-between align-items-center w-100 mb-3">
                    <h6 className="text-muted mb-0">New Orders</h6>
                    <FaShoppingCart className="text-primary" />
                  </div>
                  <h3 className="mb-0">3</h3>
                  <div className="text-muted mt-2">Last order 5 mins ago</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} sm={6} className="mb-3">
              <Card className="h-100">
                <Card.Body className="d-flex flex-column align-items-center">
                  <div className="d-flex justify-content-between align-items-center w-100 mb-3">
                    <h6 className="text-muted mb-0">Preparing</h6>
                    <FaUtensils className="text-info" />
                  </div>
                  <h3 className="mb-0">2</h3>
                  <div className="text-muted mt-2">Est. completion in 15 mins</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} sm={6} className="mb-3">
              <Card className="h-100">
                <Card.Body className="d-flex flex-column align-items-center">
                  <div className="d-flex justify-content-between align-items-center w-100 mb-3">
                    <h6 className="text-muted mb-0">Out for Delivery</h6>
                    <FaMotorcycle className="text-warning" />
                  </div>
                  <h3 className="mb-0">1</h3>
                  <div className="text-muted mt-2">Est. delivery in 25 mins</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} sm={6} className="mb-3">
              <Card className="h-100">
                <Card.Body className="d-flex flex-column align-items-center">
                  <div className="d-flex justify-content-between align-items-center w-100 mb-3">
                    <h6 className="text-muted mb-0">Completed Today</h6>
                    <FaCheck className="text-success" />
                  </div>
                  <h3 className="mb-0">12</h3>
                  <div className="text-muted mt-2">Total: ₹8,450</div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          <Row className="mb-3">
            <Col md={4}>
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search orders by ID, customer, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={3}>
              <InputGroup>
                <InputGroup.Text>
                  <FaFilter />
                </InputGroup.Text>
                <Form.Select
                  value={filterSource}
                  onChange={(e) => setFilterSource(e.target.value)}
                >
                  <option value="all">All Sources</option>
                  <option value="website">Website</option>
                  <option value="mobile_app">Mobile App</option>
                  <option value="food_aggregator">Food Aggregator</option>
                </Form.Select>
              </InputGroup>
            </Col>
            <Col md={3}>
              <InputGroup>
                <InputGroup.Text>
                  <FaCalendarAlt />
                </InputGroup.Text>
                <Form.Select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="last7days">Last 7 Days</option>
                  <option value="last30days">Last 30 Days</option>
                  <option value="custom">Custom Range</option>
                </Form.Select>
              </InputGroup>
            </Col>
            <Col md={2}>
              <Button variant="outline-primary" className="w-100">
                <FaSync className="me-1" /> Refresh
              </Button>
            </Col>
          </Row>
          
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-3"
          >
            <Tab eventKey="newOrders" title={<span><Badge bg="primary" className="me-1">3</Badge> New Orders</span>}>
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Order Time</th>
                    <th>Type</th>
                    <th>Source</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>
                        {order.customer.name}
                        <div><small className="text-muted">{order.customer.phone}</small></div>
                      </td>
                      <td>{order.items.length} items</td>
                      <td>₹{order.total.toFixed(2)}</td>
                      <td>{order.orderTime}</td>
                      <td>{getOrderTypeIcon(order.orderType)} {order.orderType}</td>
                      <td>{getSourceBadge(order.source)}</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-1"
                          onClick={() => handleOrderSelect(order)}
                        >
                          <FaEye />
                        </Button>
                        <Button
                          variant="outline-success"
                          size="sm"
                          className="me-1"
                          onClick={() => handleStatusUpdate(order.id, 'preparing')}
                        >
                          <FaCheck /> Accept
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                        >
                          <FaTimes /> Reject
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {filteredOrders.length === 0 && (
                    <tr>
                      <td colSpan="8" className="text-center py-4">
                        <p className="mb-0">No orders found</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey="preparing" title="Preparing">
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Order Time</th>
                    <th>Type</th>
                    <th>Source</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>
                        {order.customer.name}
                        <div><small className="text-muted">{order.customer.phone}</small></div>
                      </td>
                      <td>{order.items.length} items</td>
                      <td>₹{order.total.toFixed(2)}</td>
                      <td>{order.orderTime}</td>
                      <td>{getOrderTypeIcon(order.orderType)} {order.orderType}</td>
                      <td>{getSourceBadge(order.source)}</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-1"
                          onClick={() => handleOrderSelect(order)}
                        >
                          <FaEye />
                        </Button>
                        <Button
                          variant="outline-success"
                          size="sm"
                          onClick={() => handleStatusUpdate(order.id, order.orderType === 'delivery' ? 'out_for_delivery' : 'ready_for_pickup')}
                        >
                          <FaCheck /> {order.orderType === 'delivery' ? 'Ready for Delivery' : 'Ready for Pickup'}
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {filteredOrders.length === 0 && (
                    <tr>
                      <td colSpan="8" className="text-center py-4">
                        <p className="mb-0">No orders found</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey="readyForPickup" title="Ready for Pickup">
              <p>Ready for pickup orders will be displayed here</p>
            </Tab>
            <Tab eventKey="outForDelivery" title="Out for Delivery">
              <p>Out for delivery orders will be displayed here</p>
            </Tab>
            <Tab eventKey="completed" title="Completed">
              <p>Completed orders will be displayed here</p>
            </Tab>
            <Tab eventKey="cancelled" title="Cancelled">
              <p>Cancelled orders will be displayed here</p>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
      
      {/* Order Details Modal */}
      {selectedOrder && showOrderDetails && (
        <Card className="mb-4">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Order Details: {selectedOrder.id}</h5>
            <Button variant="outline-secondary" onClick={() => setShowOrderDetails(false)}>
              Close
            </Button>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <h6>Customer Information</h6>
                <Table>
                  <tbody>
                    <tr>
                      <td><FaUser className="me-2" /> Name</td>
                      <td>{selectedOrder.customer.name}</td>
                    </tr>
                    <tr>
                      <td><FaPhoneAlt className="me-2" /> Phone</td>
                      <td>{selectedOrder.customer.phone}</td>
                    </tr>
                    {selectedOrder.customer.email && (
                      <tr>
                        <td><FaEnvelope className="me-2" /> Email</td>
                        <td>{selectedOrder.customer.email}</td>
                      </tr>
                    )}
                    {selectedOrder.customer.address && (
                      <tr>
                        <td><FaMapMarkerAlt className="me-2" /> Address</td>
                        <td>{selectedOrder.customer.address}</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Col>
              <Col md={6}>
                <h6>Order Information</h6>
                <Table>
                  <tbody>
                    <tr>
                      <td>Order Type</td>
                      <td>{getOrderTypeIcon(selectedOrder.orderType)} {selectedOrder.orderType}</td>
                    </tr>
                    <tr>
                      <td>Order Time</td>
                      <td>{selectedOrder.orderTime}</td>
                    </tr>
                    <tr>
                      <td>Status</td>
                      <td>{getStatusBadge(selectedOrder.status)}</td>
                    </tr>
                    <tr>
                      <td>Payment Method</td>
                      <td>{getPaymentMethodIcon(selectedOrder.paymentMethod)} {selectedOrder.paymentMethod}</td>
                    </tr>
                    <tr>
                      <td>Payment Status</td>
                      <td>
                        {selectedOrder.paymentStatus === 'paid' ? (
                          <Badge bg="success">Paid</Badge>
                        ) : (
                          <Badge bg="warning">Pending</Badge>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
            
            <h6>Order Items</h6>
            <Table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.price.toFixed(2)}</td>
                    <td>₹{item.total.toFixed(2)}</td>
                    <td>{item.notes || '-'}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" className="text-end">Subtotal:</td>
                  <td>₹{selectedOrder.subtotal.toFixed(2)}</td>
                  <td></td>
                </tr>
                <tr>
                  <td colSpan="3" className="text-end">Tax:</td>
                  <td>₹{selectedOrder.tax.toFixed(2)}</td>
                  <td></td>
                </tr>
                {selectedOrder.deliveryFee > 0 && (
                  <tr>
                    <td colSpan="3" className="text-end">Delivery Fee:</td>
                    <td>₹{selectedOrder.deliveryFee.toFixed(2)}</td>
                    <td></td>
                  </tr>
                )}
                {selectedOrder.discount > 0 && (
                  <tr>
                    <td colSpan="3" className="text-end">Discount:</td>
                    <td>-₹{selectedOrder.discount.toFixed(2)}</td>
                    <td></td>
                  </tr>
                )}
                <tr className="fw-bold">
                  <td colSpan="3" className="text-end">Total:</td>
                  <td>₹{selectedOrder.total.toFixed(2)}</td>
                  <td></td>
                </tr>
              </tfoot>
            </Table>
            
            {selectedOrder.notes && (
              <div className="mb-3">
                <h6>Order Notes</h6>
                <p>{selectedOrder.notes}</p>
              </div>
            )}
            
            <div className="d-flex gap-2 justify-content-end">
              <Button variant="outline-primary">
                <FaPrint className="me-1" /> Print Order
              </Button>
              {selectedOrder.status === 'new' && (
                <>
                  <Button 
                    variant="success"
                    onClick={() => handleStatusUpdate(selectedOrder.id, 'preparing')}
                  >
                    <FaCheck className="me-1" /> Accept Order
                  </Button>
                  <Button 
                    variant="danger"
                    onClick={() => handleStatusUpdate(selectedOrder.id, 'cancelled')}
                  >
                    <FaTimes className="me-1" /> Reject Order
                  </Button>
                </>
              )}
              {selectedOrder.status === 'preparing' && (
                <Button 
                  variant="success"
                  onClick={() => handleStatusUpdate(selectedOrder.id, selectedOrder.orderType === 'delivery' ? 'out_for_delivery' : 'ready_for_pickup')}
                >
                  <FaCheck className="me-1" /> Mark as {selectedOrder.orderType === 'delivery' ? 'Ready for Delivery' : 'Ready for Pickup'}
                </Button>
              )}
              {selectedOrder.status === 'ready_for_pickup' && (
                <Button 
                  variant="success"
                  onClick={() => handleStatusUpdate(selectedOrder.id, 'completed')}
                >
                  <FaCheck className="me-1" /> Mark as Picked Up
                </Button>
              )}
              {selectedOrder.status === 'out_for_delivery' && (
                <Button 
                  variant="success"
                  onClick={() => handleStatusUpdate(selectedOrder.id, 'delivered')}
                >
                  <FaCheck className="me-1" /> Mark as Delivered
                </Button>
              )}
            </div>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default OnlineOrderingDashboard;
