import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Form, Dropdown } from 'react-bootstrap';
import { FaCheck, FaUtensils, FaClock, FaExclamationTriangle, FaFilter, FaSort, FaPrint, FaBell } from 'react-icons/fa';

const KitchenDisplay = () => {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('time');
  const [viewMode, setViewMode] = useState('grid');

  // Simulate fetching orders
  useEffect(() => {
    // In a real app, this would be an API call or websocket connection
    const demoOrders = [
      {
        id: 'ORD-001',
        table: 'Table 5',
        time: '10:15 AM',
        status: 'new',
        items: [
          { id: 1, name: 'Chicken Biryani', quantity: 2, notes: 'Extra spicy', status: 'new' },
          { id: 2, name: 'Butter Naan', quantity: 4, notes: '', status: 'new' },
          { id: 3, name: 'Paneer Tikka', quantity: 1, notes: 'No onions', status: 'new' }
        ],
        priority: 'high',
        orderType: 'dine-in',
        waiter: 'John',
        timeElapsed: '5 mins'
      },
      {
        id: 'ORD-002',
        table: 'Table 8',
        time: '10:05 AM',
        status: 'in-progress',
        items: [
          { id: 4, name: 'Veg Pulao', quantity: 1, notes: '', status: 'in-progress' },
          { id: 5, name: 'Dal Tadka', quantity: 1, notes: '', status: 'in-progress' },
          { id: 6, name: 'Raita', quantity: 1, notes: '', status: 'in-progress' }
        ],
        priority: 'medium',
        orderType: 'dine-in',
        waiter: 'Sarah',
        timeElapsed: '15 mins'
      },
      {
        id: 'ORD-003',
        table: 'Takeaway',
        time: '9:55 AM',
        status: 'ready',
        items: [
          { id: 7, name: 'Chicken Curry', quantity: 1, notes: '', status: 'ready' },
          { id: 8, name: 'Jeera Rice', quantity: 1, notes: '', status: 'ready' }
        ],
        priority: 'low',
        orderType: 'takeaway',
        waiter: 'N/A',
        timeElapsed: '25 mins'
      },
      {
        id: 'ORD-004',
        table: 'Table 3',
        time: '10:20 AM',
        status: 'new',
        items: [
          { id: 9, name: 'Masala Dosa', quantity: 2, notes: '', status: 'new' },
          { id: 10, name: 'Idli Sambar', quantity: 1, notes: 'Extra sambar', status: 'new' }
        ],
        priority: 'medium',
        orderType: 'dine-in',
        waiter: 'Mike',
        timeElapsed: '2 mins'
      },
      {
        id: 'ORD-005',
        table: 'Delivery',
        time: '10:00 AM',
        status: 'in-progress',
        items: [
          { id: 11, name: 'Butter Chicken', quantity: 1, notes: '', status: 'in-progress' },
          { id: 12, name: 'Garlic Naan', quantity: 2, notes: '', status: 'in-progress' },
          { id: 13, name: 'Gulab Jamun', quantity: 4, notes: '', status: 'in-progress' }
        ],
        priority: 'high',
        orderType: 'delivery',
        waiter: 'N/A',
        timeElapsed: '20 mins'
      }
    ];
    
    setOrders(demoOrders);
  }, []);

  // Update item status
  const updateItemStatus = (orderId, itemId, newStatus) => {
    setOrders(prevOrders => 
      prevOrders.map(order => {
        if (order.id === orderId) {
          const updatedItems = order.items.map(item => 
            item.id === itemId ? { ...item, status: newStatus } : item
          );
          
          // Check if all items are ready
          const allReady = updatedItems.every(item => item.status === 'ready');
          
          return { 
            ...order, 
            items: updatedItems,
            status: allReady ? 'ready' : 'in-progress'
          };
        }
        return order;
      })
    );
  };

  // Mark entire order as ready
  const markOrderReady = (orderId) => {
    setOrders(prevOrders => 
      prevOrders.map(order => {
        if (order.id === orderId) {
          const updatedItems = order.items.map(item => ({ ...item, status: 'ready' }));
          return { ...order, items: updatedItems, status: 'ready' };
        }
        return order;
      })
    );
  };

  // Filter orders based on status
  const filteredOrders = orders.filter(order => {
    if (filterStatus === 'all') return true;
    return order.status === filterStatus;
  });

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === 'time') {
      return a.time.localeCompare(b.time);
    } else if (sortBy === 'priority') {
      const priorityValue = { high: 3, medium: 2, low: 1 };
      return priorityValue[b.priority] - priorityValue[a.priority];
    }
    return 0;
  });

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'new': return 'warning';
      case 'in-progress': return 'primary';
      case 'ready': return 'success';
      default: return 'secondary';
    }
  };

  // Get priority badge color
  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'secondary';
    }
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Kitchen Display System</h5>
                <div className="d-flex gap-2">
                  <Dropdown>
                    <Dropdown.Toggle variant="outline-secondary" id="dropdown-filter">
                      <FaFilter className="me-1" /> {filterStatus === 'all' ? 'All Orders' : `${filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)} Orders`}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => setFilterStatus('all')}>All Orders</Dropdown.Item>
                      <Dropdown.Item onClick={() => setFilterStatus('new')}>New Orders</Dropdown.Item>
                      <Dropdown.Item onClick={() => setFilterStatus('in-progress')}>In Progress</Dropdown.Item>
                      <Dropdown.Item onClick={() => setFilterStatus('ready')}>Ready</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  
                  <Dropdown>
                    <Dropdown.Toggle variant="outline-secondary" id="dropdown-sort">
                      <FaSort className="me-1" /> Sort By
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => setSortBy('time')}>Time</Dropdown.Item>
                      <Dropdown.Item onClick={() => setSortBy('priority')}>Priority</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  
                  <Button variant="outline-secondary" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
                    {viewMode === 'grid' ? 'List View' : 'Grid View'}
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {viewMode === 'grid' ? (
          // Grid View
          sortedOrders.map(order => (
            <Col key={order.id} lg={4} md={6} className="mb-3">
              <Card className={`h-100 border-${getStatusBadgeColor(order.status)}`}>
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-0">{order.id}</h5>
                    <div className="text-muted small">{order.table}</div>
                  </div>
                  <div className="d-flex flex-column align-items-end">
                    <Badge bg={getStatusBadgeColor(order.status)} className="mb-1">
                      {order.status === 'new' ? 'New' : 
                       order.status === 'in-progress' ? 'In Progress' : 'Ready'}
                    </Badge>
                    <Badge bg={getPriorityBadgeColor(order.priority)}>
                      {order.priority.charAt(0).toUpperCase() + order.priority.slice(1)} Priority
                    </Badge>
                  </div>
                </Card.Header>
                <Card.Body>
                  <div className="d-flex justify-content-between mb-2">
                    <div><FaClock className="me-1" /> {order.time}</div>
                    <div>{order.timeElapsed}</div>
                  </div>
                  <div className="mb-2">
                    <strong>Type:</strong> {order.orderType === 'dine-in' ? 'Dine-in' : 
                                          order.orderType === 'takeaway' ? 'Takeaway' : 'Delivery'}
                  </div>
                  {order.waiter !== 'N/A' && (
                    <div className="mb-3">
                      <strong>Waiter:</strong> {order.waiter}
                    </div>
                  )}
                  <hr />
                  <h6>Items:</h6>
                  {order.items.map(item => (
                    <div key={item.id} className="d-flex justify-content-between align-items-center mb-2">
                      <div>
                        <div><strong>{item.quantity}x</strong> {item.name}</div>
                        {item.notes && <small className="text-muted">{item.notes}</small>}
                      </div>
                      <div>
                        {item.status === 'new' ? (
                          <Button 
                            size="sm" 
                            variant="outline-primary"
                            onClick={() => updateItemStatus(order.id, item.id, 'in-progress')}
                          >
                            Start
                          </Button>
                        ) : item.status === 'in-progress' ? (
                          <Button 
                            size="sm" 
                            variant="outline-success"
                            onClick={() => updateItemStatus(order.id, item.id, 'ready')}
                          >
                            Ready
                          </Button>
                        ) : (
                          <Badge bg="success">Ready</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </Card.Body>
                <Card.Footer>
                  <div className="d-flex justify-content-between">
                    <Button 
                      variant="outline-secondary" 
                      size="sm"
                    >
                      <FaPrint className="me-1" /> Print
                    </Button>
                    {order.status !== 'ready' && (
                      <Button 
                        variant="success" 
                        size="sm"
                        onClick={() => markOrderReady(order.id)}
                      >
                        <FaCheck className="me-1" /> Mark All Ready
                      </Button>
                    )}
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          // List View
          <Col>
            <Card>
              <Card.Body className="p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Table</th>
                        <th>Time</th>
                        <th>Items</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedOrders.map(order => (
                        <tr key={order.id}>
                          <td>{order.id}</td>
                          <td>{order.table}</td>
                          <td>
                            {order.time}
                            <div><small className="text-muted">{order.timeElapsed}</small></div>
                          </td>
                          <td>
                            {order.items.map(item => (
                              <div key={item.id} className="mb-1">
                                <Badge 
                                  bg={getStatusBadgeColor(item.status)}
                                  className="me-1"
                                >
                                  {item.quantity}
                                </Badge>
                                {item.name}
                              </div>
                            ))}
                          </td>
                          <td>
                            <Badge bg={getStatusBadgeColor(order.status)}>
                              {order.status === 'new' ? 'New' : 
                               order.status === 'in-progress' ? 'In Progress' : 'Ready'}
                            </Badge>
                          </td>
                          <td>
                            <Badge bg={getPriorityBadgeColor(order.priority)}>
                              {order.priority.charAt(0).toUpperCase() + order.priority.slice(1)}
                            </Badge>
                          </td>
                          <td>
                            {order.status !== 'ready' ? (
                              <Button 
                                variant="success" 
                                size="sm"
                                onClick={() => markOrderReady(order.id)}
                              >
                                <FaCheck className="me-1" /> Ready
                              </Button>
                            ) : (
                              <Button 
                                variant="outline-secondary" 
                                size="sm"
                              >
                                <FaPrint className="me-1" /> Print
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default KitchenDisplay;
