import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Form, Modal, Table } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaBell, FaPrint, FaCheck, FaExclamationTriangle, FaClock } from 'react-icons/fa';
import ReactApexChart from 'react-apexcharts';

const TokenManagement = () => {
  const [tokens, setTokens] = useState([]);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [showDisplayModal, setShowDisplayModal] = useState(false);
  const [selectedToken, setSelectedToken] = useState(null);
  const [nextTokenNumber, setNextTokenNumber] = useState(101);

  // Simulate fetching tokens
  useEffect(() => {
    // In a real app, this would be an API call
    const demoTokens = [
      {
        id: 1,
        tokenNumber: 100,
        customerName: 'Rahul Sharma',
        orderType: 'takeaway',
        items: 3,
        status: 'ready',
        createdAt: '10:15 AM',
        estimatedTime: '10 mins',
        phoneNumber: '9876543210',
        orderAmount: 450
      },
      {
        id: 2,
        tokenNumber: 99,
        customerName: 'Priya Patel',
        orderType: 'takeaway',
        items: 2,
        status: 'in-progress',
        createdAt: '10:05 AM',
        estimatedTime: '15 mins',
        phoneNumber: '9876543211',
        orderAmount: 350
      },
      {
        id: 3,
        tokenNumber: 98,
        customerName: 'Amit Kumar',
        orderType: 'delivery',
        items: 4,
        status: 'ready',
        createdAt: '9:55 AM',
        estimatedTime: '20 mins',
        phoneNumber: '9876543212',
        orderAmount: 650
      },
      {
        id: 4,
        tokenNumber: 97,
        customerName: 'Sneha Gupta',
        orderType: 'takeaway',
        items: 1,
        status: 'completed',
        createdAt: '9:45 AM',
        estimatedTime: '5 mins',
        phoneNumber: '9876543213',
        orderAmount: 150
      },
      {
        id: 5,
        tokenNumber: 96,
        customerName: 'Vikram Singh',
        orderType: 'delivery',
        items: 3,
        status: 'in-progress',
        createdAt: '9:35 AM',
        estimatedTime: '25 mins',
        phoneNumber: '9876543214',
        orderAmount: 550
      }
    ];
    
    setTokens(demoTokens);
  }, []);

  // Create a new token
  const handleCreateToken = () => {
    setSelectedToken(null);
    setShowTokenModal(true);
  };

  // Edit existing token
  const handleEditToken = (token) => {
    setSelectedToken(token);
    setShowTokenModal(true);
  };

  // Save token
  const handleSaveToken = () => {
    if (!selectedToken) {
      // Create new token
      const newToken = {
        id: tokens.length + 1,
        tokenNumber: nextTokenNumber,
        customerName: 'New Customer',
        orderType: 'takeaway',
        items: 2,
        status: 'in-progress',
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        estimatedTime: '15 mins',
        phoneNumber: '9876543215',
        orderAmount: 300
      };
      
      setTokens([newToken, ...tokens]);
      setNextTokenNumber(nextTokenNumber + 1);
    } else {
      // Update existing token
      setTokens(tokens.map(token => 
        token.id === selectedToken.id ? { ...token, ...selectedToken } : token
      ));
    }
    
    setShowTokenModal(false);
  };

  // Update token status
  const updateTokenStatus = (id, newStatus) => {
    setTokens(prevTokens => 
      prevTokens.map(token => 
        token.id === id ? { ...token, status: newStatus } : token
      )
    );
  };

  // Delete token
  const handleDeleteToken = (id) => {
    setTokens(tokens.filter(token => token.id !== id));
  };

  // Show display screen
  const handleShowDisplay = () => {
    setShowDisplayModal(true);
  };

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'in-progress': return 'primary';
      case 'ready': return 'success';
      case 'completed': return 'secondary';
      default: return 'warning';
    }
  };

  // Token distribution chart
  const tokenDistributionOptions = {
    chart: {
      type: 'donut',
      height: 250,
      toolbar: {
        show: false
      }
    },
    labels: ['In Progress', 'Ready', 'Completed'],
    colors: ['#4361ee', '#2bc155', '#6c757d'],
    legend: {
      position: 'bottom'
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  const tokenDistributionSeries = [
    tokens.filter(token => token.status === 'in-progress').length,
    tokens.filter(token => token.status === 'ready').length,
    tokens.filter(token => token.status === 'completed').length
  ];

  // Wait time chart
  const waitTimeOptions = {
    chart: {
      type: 'bar',
      height: 250,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM'],
    },
    yaxis: {
      title: {
        text: 'Minutes'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " mins"
        }
      }
    },
    colors: ['#4361ee']
  };

  const waitTimeSeries = [{
    name: 'Average Wait Time',
    data: [12, 15, 18, 22, 16]
  }];

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Token Management System</h5>
                <div className="d-flex gap-2">
                  <Button variant="outline-primary" onClick={handleShowDisplay}>
                    <FaBell className="me-1" /> Show Display Screen
                  </Button>
                  <Button variant="primary" onClick={handleCreateToken}>
                    <FaPlus className="me-1" /> Create New Token
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Active Tokens</h5>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead>
                    <tr>
                      <th>Token #</th>
                      <th>Customer</th>
                      <th>Type</th>
                      <th>Items</th>
                      <th>Created</th>
                      <th>Est. Time</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tokens
                      .filter(token => token.status !== 'completed')
                      .map(token => (
                        <tr key={token.id}>
                          <td>
                            <strong>{token.tokenNumber}</strong>
                          </td>
                          <td>
                            {token.customerName}
                            <div><small className="text-muted">{token.phoneNumber}</small></div>
                          </td>
                          <td>{token.orderType === 'takeaway' ? 'Takeaway' : 'Delivery'}</td>
                          <td>{token.items}</td>
                          <td>{token.createdAt}</td>
                          <td>{token.estimatedTime}</td>
                          <td>
                            <Badge bg={getStatusBadgeColor(token.status)}>
                              {token.status === 'in-progress' ? 'In Progress' : 
                               token.status === 'ready' ? 'Ready' : 'Completed'}
                            </Badge>
                          </td>
                          <td>
                            <div className="d-flex gap-1">
                              {token.status === 'in-progress' && (
                                <Button 
                                  variant="outline-success" 
                                  size="sm"
                                  onClick={() => updateTokenStatus(token.id, 'ready')}
                                >
                                  <FaCheck />
                                </Button>
                              )}
                              {token.status === 'ready' && (
                                <Button 
                                  variant="outline-secondary" 
                                  size="sm"
                                  onClick={() => updateTokenStatus(token.id, 'completed')}
                                >
                                  <FaCheck />
                                </Button>
                              )}
                              <Button 
                                variant="outline-primary" 
                                size="sm"
                                onClick={() => handleEditToken(token)}
                              >
                                <FaEdit />
                              </Button>
                              <Button 
                                variant="outline-danger" 
                                size="sm"
                                onClick={() => handleDeleteToken(token.id)}
                              >
                                <FaTrash />
                              </Button>
                              <Button 
                                variant="outline-secondary" 
                                size="sm"
                              >
                                <FaPrint />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <h5 className="mb-0">Completed Tokens</h5>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead>
                    <tr>
                      <th>Token #</th>
                      <th>Customer</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Created</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tokens
                      .filter(token => token.status === 'completed')
                      .map(token => (
                        <tr key={token.id}>
                          <td>
                            <strong>{token.tokenNumber}</strong>
                          </td>
                          <td>
                            {token.customerName}
                            <div><small className="text-muted">{token.phoneNumber}</small></div>
                          </td>
                          <td>{token.orderType === 'takeaway' ? 'Takeaway' : 'Delivery'}</td>
                          <td>₹{token.orderAmount}</td>
                          <td>{token.createdAt}</td>
                          <td>
                            <Badge bg={getStatusBadgeColor(token.status)}>
                              Completed
                            </Badge>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Token Distribution</h5>
            </Card.Header>
            <Card.Body>
              <ReactApexChart 
                options={tokenDistributionOptions} 
                series={tokenDistributionSeries} 
                type="donut" 
                height={250} 
              />
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <h5 className="mb-0">Average Wait Time</h5>
            </Card.Header>
            <Card.Body>
              <ReactApexChart 
                options={waitTimeOptions} 
                series={waitTimeSeries} 
                type="bar" 
                height={250} 
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Create/Edit Token Modal */}
      <Modal show={showTokenModal} onHide={() => setShowTokenModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedToken ? 'Edit Token' : 'Create New Token'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter customer name" 
                defaultValue={selectedToken?.customerName || ''}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control 
                type="tel" 
                placeholder="Enter phone number" 
                defaultValue={selectedToken?.phoneNumber || ''}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Order Type</Form.Label>
              <Form.Select defaultValue={selectedToken?.orderType || 'takeaway'}>
                <option value="takeaway">Takeaway</option>
                <option value="delivery">Delivery</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Number of Items</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Enter number of items" 
                defaultValue={selectedToken?.items || 1}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Estimated Time</Form.Label>
              <Form.Select defaultValue={selectedToken?.estimatedTime || '15 mins'}>
                <option value="5 mins">5 minutes</option>
                <option value="10 mins">10 minutes</option>
                <option value="15 mins">15 minutes</option>
                <option value="20 mins">20 minutes</option>
                <option value="25 mins">25 minutes</option>
                <option value="30 mins">30 minutes</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Order Amount</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Enter order amount" 
                defaultValue={selectedToken?.orderAmount || 0}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTokenModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveToken}>
            {selectedToken ? 'Update Token' : 'Create Token'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Display Screen Modal */}
      <Modal 
        show={showDisplayModal} 
        onHide={() => setShowDisplayModal(false)} 
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Token Display Screen</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white p-0">
          <div className="p-3 bg-primary text-white text-center">
            <h3 className="mb-0">NOW SERVING</h3>
          </div>
          <div className="d-flex">
            <div className="flex-grow-1 p-4 text-center border-end border-secondary">
              <h6 className="text-muted mb-2">READY FOR PICKUP</h6>
              <div className="d-flex flex-wrap justify-content-center gap-3 mt-3">
                {tokens
                  .filter(token => token.status === 'ready')
                  .map(token => (
                    <div key={token.id} className="bg-success text-white p-3 rounded" style={{ minWidth: '80px' }}>
                      <h2 className="mb-0">{token.tokenNumber}</h2>
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex-grow-1 p-4 text-center">
              <h6 className="text-muted mb-2">IN PREPARATION</h6>
              <div className="d-flex flex-wrap justify-content-center gap-3 mt-3">
                {tokens
                  .filter(token => token.status === 'in-progress')
                  .map(token => (
                    <div key={token.id} className="bg-primary text-white p-3 rounded" style={{ minWidth: '80px' }}>
                      <h2 className="mb-0">{token.tokenNumber}</h2>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="p-3 bg-secondary text-white text-center">
            <h5 className="mb-0">Thank you for your patience!</h5>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowDisplayModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TokenManagement;
