import { useState } from 'react';
import { Card, Table, Badge, Button, Form, InputGroup, Row, Col, Modal } from 'react-bootstrap';
import { 
  FaSearch, FaFileInvoice, FaPrint, FaEnvelope, FaDownload, 
  FaFilter, FaCalendarAlt, FaEye, FaReceipt
} from 'react-icons/fa';

const TransactionHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('today');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('all');
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Sample transaction data (in a real app, this would come from an API)
  const transactions = [
    {
      id: 'TXN-123456',
      date: '2023-11-10',
      time: '14:30:25',
      amount: 1250.00,
      paymentMethod: 'card',
      cardType: 'Visa',
      cardLast4: '4242',
      status: 'completed',
      customer: 'John Doe',
      orderType: 'dine-in',
      tableNumber: '5',
      items: [
        { name: 'Chicken Biryani', quantity: 2, price: 350, total: 700 },
        { name: 'Butter Naan', quantity: 4, price: 50, total: 200 },
        { name: 'Paneer Tikka', quantity: 1, price: 250, total: 250 }
      ],
      subtotal: 1150,
      tax: 57.50,
      tip: 100,
      total: 1250.00
    },
    {
      id: 'TXN-123457',
      date: '2023-11-10',
      time: '15:45:12',
      amount: 850.00,
      paymentMethod: 'upi',
      upiId: 'john@okbank',
      status: 'completed',
      customer: 'Sarah Smith',
      orderType: 'takeaway',
      items: [
        { name: 'Veg Pulao', quantity: 1, price: 200, total: 200 },
        { name: 'Dal Tadka', quantity: 1, price: 150, total: 150 },
        { name: 'Raita', quantity: 1, price: 50, total: 50 },
        { name: 'Gulab Jamun', quantity: 2, price: 60, total: 120 }
      ],
      subtotal: 520,
      tax: 26.00,
      tip: 0,
      total: 546.00
    },
    {
      id: 'TXN-123458',
      date: '2023-11-09',
      time: '19:20:45',
      amount: 1800.00,
      paymentMethod: 'cash',
      status: 'completed',
      customer: 'Mike Johnson',
      orderType: 'dine-in',
      tableNumber: '8',
      items: [
        { name: 'Tandoori Chicken', quantity: 1, price: 450, total: 450 },
        { name: 'Butter Chicken', quantity: 1, price: 350, total: 350 },
        { name: 'Garlic Naan', quantity: 3, price: 60, total: 180 },
        { name: 'Jeera Rice', quantity: 2, price: 150, total: 300 },
        { name: 'Gulab Jamun', quantity: 4, price: 60, total: 240 }
      ],
      subtotal: 1520,
      tax: 76.00,
      tip: 200,
      total: 1796.00
    },
    {
      id: 'TXN-123459',
      date: '2023-11-09',
      time: '13:15:30',
      amount: 650.00,
      paymentMethod: 'card',
      cardType: 'Mastercard',
      cardLast4: '5678',
      status: 'refunded',
      customer: 'Emily Davis',
      orderType: 'delivery',
      items: [
        { name: 'Paneer Butter Masala', quantity: 1, price: 300, total: 300 },
        { name: 'Butter Naan', quantity: 2, price: 50, total: 100 },
        { name: 'Jeera Rice', quantity: 1, price: 150, total: 150 }
      ],
      subtotal: 550,
      tax: 27.50,
      tip: 70,
      total: 647.50
    },
    {
      id: 'TXN-123460',
      date: '2023-11-08',
      time: '20:05:18',
      amount: 2200.00,
      paymentMethod: 'split',
      splitMethods: [
        { method: 'card', amount: 1100.00 },
        { method: 'cash', amount: 1100.00 }
      ],
      status: 'completed',
      customer: 'Robert Brown',
      orderType: 'dine-in',
      tableNumber: '12',
      items: [
        { name: 'Tandoori Platter', quantity: 1, price: 850, total: 850 },
        { name: 'Dal Makhani', quantity: 1, price: 250, total: 250 },
        { name: 'Butter Naan', quantity: 4, price: 50, total: 200 },
        { name: 'Jeera Rice', quantity: 2, price: 150, total: 300 },
        { name: 'Gulab Jamun', quantity: 4, price: 60, total: 240 }
      ],
      subtotal: 1840,
      tax: 92.00,
      tip: 250,
      total: 2182.00
    }
  ];

  // Filter transactions based on search term, date range, and payment method
  const filteredTransactions = transactions.filter(transaction => {
    // Filter by search term
    const matchesSearch = 
      searchTerm === '' || 
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.customer.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by date range
    let matchesDateRange = true;
    const txnDate = new Date(transaction.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (dateRange === 'today') {
      matchesDateRange = txnDate.toDateString() === today.toDateString();
    } else if (dateRange === 'yesterday') {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      matchesDateRange = txnDate.toDateString() === yesterday.toDateString();
    } else if (dateRange === 'thisWeek') {
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
      matchesDateRange = txnDate >= weekStart;
    } else if (dateRange === 'thisMonth') {
      matchesDateRange = 
        txnDate.getMonth() === today.getMonth() && 
        txnDate.getFullYear() === today.getFullYear();
    } else if (dateRange === 'custom') {
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        matchesDateRange = txnDate >= start && txnDate <= end;
      }
    }
    
    // Filter by payment method
    const matchesPaymentMethod = 
      paymentMethod === 'all' || 
      transaction.paymentMethod === paymentMethod;
    
    return matchesSearch && matchesDateRange && matchesPaymentMethod;
  });

  // Handle view receipt
  const handleViewReceipt = (transaction) => {
    setSelectedTransaction(transaction);
    setShowReceiptModal(true);
  };

  // Get payment method badge color
  const getPaymentMethodBadge = (method) => {
    switch (method) {
      case 'card':
        return <Badge bg="primary">Card</Badge>;
      case 'cash':
        return <Badge bg="success">Cash</Badge>;
      case 'upi':
        return <Badge bg="info">UPI</Badge>;
      case 'split':
        return <Badge bg="warning">Split</Badge>;
      default:
        return <Badge bg="secondary">{method}</Badge>;
    }
  };

  // Get status badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge bg="success">Completed</Badge>;
      case 'refunded':
        return <Badge bg="danger">Refunded</Badge>;
      case 'pending':
        return <Badge bg="warning">Pending</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  return (
    <>
      <Card>
        <Card.Header>
          <h5 className="mb-0">Transaction History</h5>
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col md={4}>
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
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
                  <option value="thisWeek">This Week</option>
                  <option value="thisMonth">This Month</option>
                  <option value="custom">Custom Range</option>
                </Form.Select>
              </InputGroup>
            </Col>
            <Col md={3}>
              <InputGroup>
                <InputGroup.Text>
                  <FaFilter />
                </InputGroup.Text>
                <Form.Select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="all">All Methods</option>
                  <option value="card">Card</option>
                  <option value="cash">Cash</option>
                  <option value="upi">UPI</option>
                  <option value="split">Split Payment</option>
                </Form.Select>
              </InputGroup>
            </Col>
            <Col md={2}>
              <Button variant="outline-primary" className="w-100">
                <FaDownload className="me-1" /> Export
              </Button>
            </Col>
          </Row>

          {dateRange === 'custom' && (
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
          )}

          <div className="table-responsive">
            <Table hover>
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Date & Time</th>
                  <th>Customer</th>
                  <th>Order Type</th>
                  <th>Payment Method</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.id}</td>
                    <td>
                      {transaction.date}
                      <div><small className="text-muted">{transaction.time}</small></div>
                    </td>
                    <td>{transaction.customer}</td>
                    <td>
                      {transaction.orderType === 'dine-in' 
                        ? `Dine-in (Table ${transaction.tableNumber})` 
                        : transaction.orderType.charAt(0).toUpperCase() + transaction.orderType.slice(1)}
                    </td>
                    <td>
                      {getPaymentMethodBadge(transaction.paymentMethod)}
                      {transaction.paymentMethod === 'card' && (
                        <div><small className="text-muted">{transaction.cardType} *{transaction.cardLast4}</small></div>
                      )}
                    </td>
                    <td>₹{transaction.amount.toFixed(2)}</td>
                    <td>{getStatusBadge(transaction.status)}</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-1"
                        onClick={() => handleViewReceipt(transaction)}
                      >
                        <FaEye />
                      </Button>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                      >
                        <FaPrint />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* Receipt Modal */}
      <Modal
        show={showReceiptModal}
        onHide={() => setShowReceiptModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Receipt Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTransaction && (
            <div className="receipt">
              <div className="text-center mb-4">
                <h5>SmartPOS Restaurant</h5>
                <p className="mb-0">123 Main Street, City</p>
                <p className="mb-0">Phone: 123-456-7890</p>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Receipt #:</span>
                <span>{selectedTransaction.id}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Date & Time:</span>
                <span>{selectedTransaction.date} {selectedTransaction.time}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Customer:</span>
                <span>{selectedTransaction.customer}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Order Type:</span>
                <span>
                  {selectedTransaction.orderType === 'dine-in' 
                    ? `Dine-in (Table ${selectedTransaction.tableNumber})` 
                    : selectedTransaction.orderType.charAt(0).toUpperCase() + selectedTransaction.orderType.slice(1)}
                </span>
              </div>
              
              <hr />
              
              <div className="mb-3">
                <h6>Items</h6>
                <Table size="sm">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th className="text-center">Qty</th>
                      <th className="text-end">Price</th>
                      <th className="text-end">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedTransaction.items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td className="text-center">{item.quantity}</td>
                        <td className="text-end">₹{item.price.toFixed(2)}</td>
                        <td className="text-end">₹{item.total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>₹{selectedTransaction.subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tax:</span>
                  <span>₹{selectedTransaction.tax.toFixed(2)}</span>
                </div>
                {selectedTransaction.tip > 0 && (
                  <div className="d-flex justify-content-between mb-2">
                    <span>Tip:</span>
                    <span>₹{selectedTransaction.tip.toFixed(2)}</span>
                  </div>
                )}
                <div className="d-flex justify-content-between fw-bold">
                  <span>Total:</span>
                  <span>₹{selectedTransaction.total.toFixed(2)}</span>
                </div>
              </div>
              
              <hr />
              
              <div className="mb-3">
                <h6>Payment Information</h6>
                <div className="d-flex justify-content-between mb-2">
                  <span>Payment Method:</span>
                  <span>
                    {selectedTransaction.paymentMethod === 'card' 
                      ? `${selectedTransaction.cardType} *${selectedTransaction.cardLast4}` 
                      : selectedTransaction.paymentMethod === 'upi'
                      ? `UPI (${selectedTransaction.upiId})`
                      : selectedTransaction.paymentMethod === 'split'
                      ? 'Split Payment'
                      : 'Cash'}
                  </span>
                </div>
                {selectedTransaction.paymentMethod === 'split' && (
                  <div>
                    {selectedTransaction.splitMethods.map((method, index) => (
                      <div key={index} className="d-flex justify-content-between mb-1">
                        <span>{method.method.charAt(0).toUpperCase() + method.method.slice(1)}:</span>
                        <span>₹{method.amount.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="d-flex justify-content-between mb-2">
                  <span>Status:</span>
                  <span>{getStatusBadge(selectedTransaction.status)}</span>
                </div>
              </div>
              
              <div className="text-center mt-4">
                <p className="mb-0">Thank you for your visit!</p>
                <p className="mb-0">We hope to see you again soon.</p>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowReceiptModal(false)}>
            Close
          </Button>
          <Button variant="outline-primary">
            <FaPrint className="me-1" /> Print
          </Button>
          <Button variant="outline-primary">
            <FaEnvelope className="me-1" /> Email
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TransactionHistory;
