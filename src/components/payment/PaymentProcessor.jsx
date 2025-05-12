import { useState } from 'react';
import { Modal, Button, Form, Row, Col, Card, Badge, Tabs, Tab, Alert } from 'react-bootstrap';
import { 
  FaMoneyBill, FaCreditCard, FaMobile, FaApplePay, FaGooglePay, FaPaypal, 
  FaQrcode, FaReceipt, FaPrint, FaEnvelope, FaCheck, FaTimes, FaInfoCircle
} from 'react-icons/fa';

const PaymentProcessor = ({ 
  show, 
  onHide, 
  orderTotal, 
  orderItems = [], 
  orderType = 'dine-in', 
  tableNumber = '', 
  customerInfo = null,
  onPaymentComplete 
}) => {
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [paymentTab, setPaymentTab] = useState('payment');
  const [cashReceived, setCashReceived] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // null, 'processing', 'success', 'failed'
  const [paymentError, setPaymentError] = useState('');
  const [receiptEmail, setReceiptEmail] = useState(customerInfo?.email || '');
  const [receiptPhone, setReceiptPhone] = useState(customerInfo?.phone || '');
  const [splitPayment, setSplitPayment] = useState(false);
  const [splitMethods, setSplitMethods] = useState([
    { method: 'cash', amount: 0 },
    { method: 'card', amount: 0 }
  ]);
  const [tipAmount, setTipAmount] = useState(0);
  const [tipPercentage, setTipPercentage] = useState(0);
  
  // Saved payment methods (in a real app, these would come from a database)
  const savedPaymentMethods = [
    { id: 1, type: 'card', name: 'HDFC Credit Card', last4: '4242', expiry: '12/25' },
    { id: 2, type: 'upi', name: 'Google Pay', id: 'user@okbank' }
  ];

  // Calculate change for cash payments
  const calculateChange = () => {
    if (!cashReceived) return 0;
    const change = parseFloat(cashReceived) - (orderTotal + tipAmount);
    return change > 0 ? change : 0;
  };

  // Calculate total with tip
  const calculateTotal = () => {
    return orderTotal + tipAmount;
  };

  // Handle tip selection
  const handleTipSelection = (percentage) => {
    setTipPercentage(percentage);
    setTipAmount((orderTotal * percentage) / 100);
  };

  // Handle custom tip amount
  const handleCustomTip = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setTipAmount(value);
    setTipPercentage(0); // Reset percentage when custom amount is entered
  };

  // Process the payment
  const processPayment = () => {
    setPaymentStatus('processing');
    setPaymentError('');
    
    // Simulate payment processing
    setTimeout(() => {
      // In a real app, this would be an API call to a payment gateway
      const success = Math.random() > 0.1; // 90% success rate for demo
      
      if (success) {
        setPaymentStatus('success');
        // Wait a moment before closing the modal
        setTimeout(() => {
          onPaymentComplete({
            method: splitPayment ? 'split' : paymentMethod,
            amount: calculateTotal(),
            tip: tipAmount,
            timestamp: new Date().toISOString(),
            reference: `TXN-${Math.floor(Math.random() * 1000000)}`
          });
        }, 1500);
      } else {
        setPaymentStatus('failed');
        setPaymentError('Transaction declined by the payment provider. Please try another payment method.');
      }
    }, 2000);
  };

  // Handle split payment changes
  const handleSplitMethodChange = (index, field, value) => {
    const updatedMethods = [...splitMethods];
    updatedMethods[index][field] = field === 'amount' ? parseFloat(value) || 0 : value;
    setSplitMethods(updatedMethods);
  };

  // Add another split payment method
  const addSplitMethod = () => {
    setSplitMethods([...splitMethods, { method: 'cash', amount: 0 }]);
  };

  // Remove a split payment method
  const removeSplitMethod = (index) => {
    const updatedMethods = splitMethods.filter((_, i) => i !== index);
    setSplitMethods(updatedMethods);
  };

  // Calculate total of split payments
  const calculateSplitTotal = () => {
    return splitMethods.reduce((sum, method) => sum + method.amount, 0);
  };

  // Check if split payment is valid
  const isSplitPaymentValid = () => {
    return Math.abs(calculateSplitTotal() - calculateTotal()) < 0.01;
  };

  // Render payment method options
  const renderPaymentMethods = () => (
    <div className="payment-methods mb-4">
      <h6 className="mb-3">Select Payment Method</h6>
      <Row className="g-2">
        <Col xs={4}>
          <Card 
            className={`text-center p-2 h-100 ${paymentMethod === 'cash' ? 'border-primary bg-light' : ''}`}
            onClick={() => setPaymentMethod('cash')}
            style={{ cursor: 'pointer' }}
          >
            <div className="d-flex flex-column align-items-center">
              <FaMoneyBill className={`mb-2 ${paymentMethod === 'cash' ? 'text-primary' : ''}`} size={24} />
              <div>Cash</div>
            </div>
          </Card>
        </Col>
        <Col xs={4}>
          <Card 
            className={`text-center p-2 h-100 ${paymentMethod === 'card' ? 'border-primary bg-light' : ''}`}
            onClick={() => setPaymentMethod('card')}
            style={{ cursor: 'pointer' }}
          >
            <div className="d-flex flex-column align-items-center">
              <FaCreditCard className={`mb-2 ${paymentMethod === 'card' ? 'text-primary' : ''}`} size={24} />
              <div>Card</div>
            </div>
          </Card>
        </Col>
        <Col xs={4}>
          <Card 
            className={`text-center p-2 h-100 ${paymentMethod === 'upi' ? 'border-primary bg-light' : ''}`}
            onClick={() => setPaymentMethod('upi')}
            style={{ cursor: 'pointer' }}
          >
            <div className="d-flex flex-column align-items-center">
              <FaMobile className={`mb-2 ${paymentMethod === 'upi' ? 'text-primary' : ''}`} size={24} />
              <div>UPI</div>
            </div>
          </Card>
        </Col>
        <Col xs={4}>
          <Card 
            className={`text-center p-2 h-100 ${paymentMethod === 'gpay' ? 'border-primary bg-light' : ''}`}
            onClick={() => setPaymentMethod('gpay')}
            style={{ cursor: 'pointer' }}
          >
            <div className="d-flex flex-column align-items-center">
              <FaGooglePay className={`mb-2 ${paymentMethod === 'gpay' ? 'text-primary' : ''}`} size={24} />
              <div>Google Pay</div>
            </div>
          </Card>
        </Col>
        <Col xs={4}>
          <Card 
            className={`text-center p-2 h-100 ${paymentMethod === 'applepay' ? 'border-primary bg-light' : ''}`}
            onClick={() => setPaymentMethod('applepay')}
            style={{ cursor: 'pointer' }}
          >
            <div className="d-flex flex-column align-items-center">
              <FaApplePay className={`mb-2 ${paymentMethod === 'applepay' ? 'text-primary' : ''}`} size={24} />
              <div>Apple Pay</div>
            </div>
          </Card>
        </Col>
        <Col xs={4}>
          <Card 
            className={`text-center p-2 h-100 ${paymentMethod === 'paypal' ? 'border-primary bg-light' : ''}`}
            onClick={() => setPaymentMethod('paypal')}
            style={{ cursor: 'pointer' }}
          >
            <div className="d-flex flex-column align-items-center">
              <FaPaypal className={`mb-2 ${paymentMethod === 'paypal' ? 'text-primary' : ''}`} size={24} />
              <div>PayPal</div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );

  // Render payment form based on selected method
  const renderPaymentForm = () => {
    if (splitPayment) {
      return (
        <div className="split-payment-form">
          <h6 className="mb-3">Split Payment</h6>
          {splitMethods.map((method, index) => (
            <Row key={index} className="mb-2 align-items-center">
              <Col xs={5}>
                <Form.Select 
                  value={method.method}
                  onChange={(e) => handleSplitMethodChange(index, 'method', e.target.value)}
                >
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                  <option value="upi">UPI</option>
                  <option value="gpay">Google Pay</option>
                </Form.Select>
              </Col>
              <Col xs={5}>
                <Form.Control 
                  type="number" 
                  placeholder="Amount" 
                  value={method.amount || ''}
                  onChange={(e) => handleSplitMethodChange(index, 'amount', e.target.value)}
                />
              </Col>
              <Col xs={2}>
                {splitMethods.length > 2 && (
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => removeSplitMethod(index)}
                  >
                    <FaTimes />
                  </Button>
                )}
              </Col>
            </Row>
          ))}
          
          <div className="d-flex justify-content-between align-items-center mt-3">
            <Button 
              variant="outline-primary" 
              size="sm"
              onClick={addSplitMethod}
            >
              + Add Payment Method
            </Button>
            <div>
              <span className={isSplitPaymentValid() ? 'text-success' : 'text-danger'}>
                {isSplitPaymentValid() ? 
                  <FaCheck className="me-1" /> : 
                  <FaInfoCircle className="me-1" />
                }
                Total: ₹{calculateSplitTotal().toFixed(2)}
              </span>
            </div>
          </div>
          
          {!isSplitPaymentValid() && (
            <Alert variant="warning" className="mt-2">
              Split payment total must equal the order total (₹{calculateTotal().toFixed(2)})
            </Alert>
          )}
        </div>
      );
    }

    switch (paymentMethod) {
      case 'cash':
        return (
          <Form.Group className="mb-3">
            <Form.Label>Amount Received</Form.Label>
            <Form.Control 
              type="number" 
              placeholder="Enter amount" 
              value={cashReceived}
              onChange={(e) => setCashReceived(e.target.value)}
            />
            <div className="d-flex justify-content-between mt-2">
              <span>Change:</span>
              <span>₹{calculateChange().toFixed(2)}</span>
            </div>
          </Form.Group>
        );
      
      case 'card':
        return (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Saved Cards</Form.Label>
              {savedPaymentMethods
                .filter(method => method.type === 'card')
                .map(card => (
                  <Card 
                    key={card.id}
                    className="mb-2 p-2"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setCardNumber(`XXXX XXXX XXXX ${card.last4}`);
                      setCardExpiry(card.expiry);
                      setCardCvv('***');
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div>{card.name}</div>
                        <div className="text-muted small">**** **** **** {card.last4}</div>
                      </div>
                      <FaCreditCard />
                    </div>
                  </Card>
                ))}
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Card Number</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter card number" 
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </Form.Group>
            
            <Row className="mb-3">
              <Col>
                <Form.Label>Expiry</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="MM/YY" 
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label>CVV</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="CVV" 
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value)}
                />
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Check 
                type="checkbox" 
                label="Save card for future payments" 
                checked={saveCard}
                onChange={(e) => setSaveCard(e.target.checked)}
              />
            </Form.Group>
          </>
        );
      
      case 'upi':
        return (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Saved UPI IDs</Form.Label>
              {savedPaymentMethods
                .filter(method => method.type === 'upi')
                .map(upi => (
                  <Card 
                    key={upi.id}
                    className="mb-2 p-2"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setUpiId(upi.id)}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div>{upi.name}</div>
                        <div className="text-muted small">{upi.id}</div>
                      </div>
                      <FaMobile />
                    </div>
                  </Card>
                ))}
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>UPI ID</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter UPI ID" 
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            </Form.Group>
            
            <div className="text-center mb-3">
              <FaQrcode size={150} className="mb-2" />
              <p className="mb-0">Scan to pay with any UPI app</p>
            </div>
          </>
        );
      
      default:
        return (
          <div className="text-center p-4">
            <FaQrcode size={150} className="mb-3" />
            <p>Scan to pay with {paymentMethod === 'gpay' ? 'Google Pay' : 
                               paymentMethod === 'applepay' ? 'Apple Pay' : 'PayPal'}</p>
            <p className="text-muted">Amount: ₹{calculateTotal().toFixed(2)}</p>
          </div>
        );
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {paymentStatus === 'processing' ? (
          <div className="text-center p-5">
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Processing payment...</span>
            </div>
            <h5>Processing Payment</h5>
            <p className="text-muted">Please wait while we process your payment...</p>
          </div>
        ) : paymentStatus === 'success' ? (
          <div className="text-center p-5">
            <div className="mb-3 text-success">
              <FaCheck size={50} />
            </div>
            <h5>Payment Successful!</h5>
            <p className="text-muted">Your payment has been processed successfully.</p>
          </div>
        ) : paymentStatus === 'failed' ? (
          <div className="text-center p-5">
            <div className="mb-3 text-danger">
              <FaTimes size={50} />
            </div>
            <h5>Payment Failed</h5>
            <p className="text-danger">{paymentError}</p>
            <Button variant="primary" onClick={() => setPaymentStatus(null)}>
              Try Again
            </Button>
          </div>
        ) : (
          <Tabs
            activeKey={paymentTab}
            onSelect={(k) => setPaymentTab(k)}
            className="mb-3"
          >
            <Tab eventKey="payment" title="Payment">
              <div className="order-summary mb-4">
                <h6 className="mb-3">Order Summary</h6>
                <div className="d-flex justify-content-between mb-2">
                  <span>Order Type:</span>
                  <Badge bg="info">
                    {orderType.charAt(0).toUpperCase() + orderType.slice(1)}
                    {orderType === 'dine-in' && tableNumber && ` - Table ${tableNumber}`}
                  </Badge>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>₹{orderTotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tip:</span>
                  <span>₹{tipAmount.toFixed(2)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold">
                  <span>Total:</span>
                  <span>₹{calculateTotal().toFixed(2)}</span>
                </div>
              </div>

              <div className="tip-selection mb-4">
                <h6 className="mb-2">Add Tip</h6>
                <div className="d-flex gap-2 mb-2">
                  {[0, 5, 10, 15, 20].map(percent => (
                    <Button
                      key={percent}
                      variant={tipPercentage === percent ? "primary" : "outline-primary"}
                      className="flex-grow-1"
                      onClick={() => handleTipSelection(percent)}
                    >
                      {percent === 0 ? 'No Tip' : `${percent}%`}
                    </Button>
                  ))}
                </div>
                <Form.Group>
                  <Form.Label>Custom Amount</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter custom tip amount"
                    value={tipPercentage === 0 && tipAmount > 0 ? tipAmount : ''}
                    onChange={handleCustomTip}
                  />
                </Form.Group>
              </div>

              <Form.Group className="mb-3">
                <Form.Check
                  type="switch"
                  id="split-payment"
                  label="Split Payment"
                  checked={splitPayment}
                  onChange={(e) => setSplitPayment(e.target.checked)}
                />
              </Form.Group>

              {splitPayment ? renderPaymentForm() : (
                <>
                  {renderPaymentMethods()}
                  {renderPaymentForm()}
                </>
              )}
            </Tab>
            <Tab eventKey="receipt" title="Receipt Options">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Email Receipt</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email address"
                    value={receiptEmail}
                    onChange={(e) => setReceiptEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>SMS Receipt</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter phone number"
                    value={receiptPhone}
                    onChange={(e) => setReceiptPhone(e.target.value)}
                  />
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button variant="outline-primary">
                    <FaPrint className="me-2" /> Print Receipt
                  </Button>
                  <Button variant="outline-primary">
                    <FaEnvelope className="me-2" /> Email Receipt
                  </Button>
                </div>
              </Form>
            </Tab>
          </Tabs>
        )}
      </Modal.Body>
      {paymentStatus === null && (
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button 
            variant="success" 
            onClick={processPayment}
            disabled={
              (splitPayment && !isSplitPaymentValid()) ||
              (!splitPayment && paymentMethod === 'cash' && (!cashReceived || parseFloat(cashReceived) < calculateTotal())) ||
              (!splitPayment && paymentMethod === 'card' && (!cardNumber || !cardExpiry || !cardCvv)) ||
              (!splitPayment && paymentMethod === 'upi' && !upiId)
            }
          >
            Pay ₹{calculateTotal().toFixed(2)}
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default PaymentProcessor;
