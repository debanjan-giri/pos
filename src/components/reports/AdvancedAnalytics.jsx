import { useState } from 'react';
import { Card, Row, Col, Form, Button, Tabs, Tab, Table, Badge, Dropdown } from 'react-bootstrap';
import { 
  FaChartLine, FaChartBar, FaChartPie, FaChartArea, FaDownload, 
  FaCalendarAlt, FaFilter, FaUsers, FaUtensils, FaBoxOpen, FaMoneyBill,
  FaArrowUp, FaArrowDown, FaEquals, FaExclamationTriangle, FaInfoCircle
} from 'react-icons/fa';
import ReactApexChart from 'react-apexcharts';

const AdvancedAnalytics = () => {
  const [dateRange, setDateRange] = useState('last30');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [showPredictions, setShowPredictions] = useState(true);
  const [comparisonPeriod, setComparisonPeriod] = useState('previousPeriod');
  const [activeTab, setActiveTab] = useState('overview');
  
  // Sample data for charts and tables
  const salesData = {
    dates: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    revenue: [18500, 19200, 21500, 22800, 24100, 28500, 32100, 34500, 36800, 38200, 42500, 45800],
    predictions: [null, null, null, null, null, null, null, null, null, null, null, 48200, 51500, 53800],
    orders: [320, 332, 350, 365, 380, 412, 435, 450, 480, 495, 520, 550],
    averageOrder: [57.8, 57.8, 61.4, 62.5, 63.4, 69.2, 73.8, 76.7, 76.7, 77.2, 81.7, 83.3],
    previousYear: {
      revenue: [15200, 16800, 18500, 19200, 20500, 24200, 27800, 29500, 31200, 33500, 36800, 39500],
      orders: [280, 295, 310, 325, 340, 365, 385, 400, 420, 440, 460, 480],
      averageOrder: [54.3, 56.9, 59.7, 59.1, 60.3, 66.3, 72.2, 73.8, 74.3, 76.1, 80.0, 82.3]
    }
  };
  
  const customerData = {
    newCustomers: [45, 52, 58, 63, 70, 78, 85, 92, 98, 105, 112, 120],
    returningCustomers: [120, 125, 130, 135, 142, 150, 158, 165, 172, 180, 188, 195],
    churnRate: [5.2, 5.0, 4.8, 4.7, 4.5, 4.3, 4.2, 4.0, 3.9, 3.8, 3.7, 3.6],
    customerLifetimeValue: [2800, 2850, 2900, 2950, 3000, 3100, 3200, 3300, 3400, 3500, 3600, 3700]
  };
  
  const inventoryData = {
    turnoverRate: [3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4.0, 4.1, 4.2, 4.3],
    wastage: [3.8, 3.7, 3.6, 3.5, 3.4, 3.3, 3.2, 3.1, 3.0, 2.9, 2.8, 2.7],
    stockLevels: [85, 82, 88, 90, 87, 92, 94, 91, 93, 95, 92, 94]
  };
  
  const topSellingItems = [
    { id: 1, name: 'Chicken Biryani', category: 'Main Course', quantity: 850, revenue: 272000, growth: 15 },
    { id: 2, name: 'Butter Chicken', category: 'Main Course', quantity: 720, revenue: 230400, growth: 12 },
    { id: 3, name: 'Paneer Butter Masala', category: 'Main Course', quantity: 680, revenue: 190400, growth: 8 },
    { id: 4, name: 'Veg Pulao', category: 'Rice', quantity: 620, revenue: 93000, growth: 5 },
    { id: 5, name: 'Gulab Jamun', category: 'Dessert', quantity: 580, revenue: 46400, growth: 10 }
  ];
  
  const customerSegments = [
    { id: 1, segment: 'Loyal Customers', count: 320, revenue: 640000, averageOrder: 2000, frequency: 'Weekly' },
    { id: 2, segment: 'Regular Customers', count: 480, revenue: 720000, averageOrder: 1500, frequency: 'Bi-weekly' },
    { id: 3, segment: 'Occasional Customers', count: 650, revenue: 650000, averageOrder: 1000, frequency: 'Monthly' },
    { id: 4, segment: 'New Customers', count: 420, revenue: 336000, averageOrder: 800, frequency: 'First-time' }
  ];
  
  // Chart options for revenue trend
  const revenueTrendOptions = {
    chart: {
      type: 'area',
      height: 350,
      toolbar: {
        show: true
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    xaxis: {
      categories: [...salesData.dates, 'Jan (Pred)', 'Feb (Pred)']
    },
    yaxis: {
      title: {
        text: 'Revenue (₹)'
      }
    },
    colors: ['#4361ee', '#a5c2f0'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100]
      }
    },
    tooltip: {
      y: {
        formatter: function(val) {
          return '₹' + val.toLocaleString();
        }
      }
    },
    annotations: {
      xaxis: [
        {
          x: 'Nov',
          borderColor: '#775DD0',
          label: {
            borderColor: '#775DD0',
            style: {
              color: '#fff',
              background: '#775DD0'
            },
            text: 'Current Month'
          }
        }
      ]
    }
  };
  
  const revenueTrendSeries = [
    {
      name: 'Revenue',
      data: showPredictions 
        ? [...salesData.revenue, ...salesData.predictions.filter(val => val !== null)]
        : salesData.revenue
    },
    {
      name: 'Previous Year',
      data: salesData.previousYear.revenue
    }
  ];
  
  // Chart options for customer segments
  const customerSegmentOptions = {
    chart: {
      type: 'pie',
      height: 350
    },
    labels: customerSegments.map(segment => segment.segment),
    colors: ['#4361ee', '#25a5e5', '#05d5aa', '#f8c43a'],
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
  
  const customerSegmentSeries = customerSegments.map(segment => segment.revenue / 1000);
  
  // Chart options for sales by category
  const salesByCategoryOptions = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      toolbar: {
        show: true
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
      categories: ['Main Course', 'Rice & Breads', 'Starters', 'Desserts', 'Beverages'],
    },
    yaxis: {
      title: {
        text: 'Revenue (₹ thousands)'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "₹" + val.toLocaleString() + " thousand"
        }
      }
    },
    colors: ['#4361ee', '#25a5e5', '#05d5aa']
  };
  
  const salesByCategorySeries = [
    {
      name: 'Current Year',
      data: [1250, 520, 480, 320, 280]
    },
    {
      name: 'Previous Year',
      data: [1050, 480, 420, 280, 240]
    },
    {
      name: 'Growth',
      data: [200, 40, 60, 40, 40]
    }
  ];
  
  // Get growth indicator
  const getGrowthIndicator = (value) => {
    if (value > 0) {
      return <span className="text-success"><FaArrowUp className="me-1" />{value}%</span>;
    } else if (value < 0) {
      return <span className="text-danger"><FaArrowDown className="me-1" />{Math.abs(value)}%</span>;
    } else {
      return <span className="text-secondary"><FaEquals className="me-1" />0%</span>;
    }
  };
  
  // Calculate current period metrics
  const getCurrentPeriodMetrics = () => {
    const currentRevenue = salesData.revenue[salesData.revenue.length - 1];
    const previousRevenue = comparisonPeriod === 'previousPeriod' 
      ? salesData.revenue[salesData.revenue.length - 2]
      : salesData.previousYear.revenue[salesData.previousYear.revenue.length - 1];
    
    const revenueGrowth = ((currentRevenue - previousRevenue) / previousRevenue * 100).toFixed(1);
    
    const currentOrders = salesData.orders[salesData.orders.length - 1];
    const previousOrders = comparisonPeriod === 'previousPeriod'
      ? salesData.orders[salesData.orders.length - 2]
      : salesData.previousYear.orders[salesData.previousYear.orders.length - 1];
    
    const ordersGrowth = ((currentOrders - previousOrders) / previousOrders * 100).toFixed(1);
    
    const currentAvgOrder = salesData.averageOrder[salesData.averageOrder.length - 1];
    const previousAvgOrder = comparisonPeriod === 'previousPeriod'
      ? salesData.averageOrder[salesData.averageOrder.length - 2]
      : salesData.previousYear.averageOrder[salesData.previousYear.averageOrder.length - 1];
    
    const avgOrderGrowth = ((currentAvgOrder - previousAvgOrder) / previousAvgOrder * 100).toFixed(1);
    
    return {
      revenue: {
        current: currentRevenue,
        previous: previousRevenue,
        growth: revenueGrowth
      },
      orders: {
        current: currentOrders,
        previous: previousOrders,
        growth: ordersGrowth
      },
      averageOrder: {
        current: currentAvgOrder,
        previous: previousAvgOrder,
        growth: avgOrderGrowth
      }
    };
  };
  
  const metrics = getCurrentPeriodMetrics();
  
  return (
    <>
      <Card className="mb-4">
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Advanced Analytics Dashboard</h5>
            <div className="d-flex gap-2">
              <Form.Select 
                className="w-auto"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="last7">Last 7 Days</option>
                <option value="last30">Last 30 Days</option>
                <option value="last90">Last 90 Days</option>
                <option value="lastYear">Last Year</option>
                <option value="custom">Custom Range</option>
              </Form.Select>
              <Form.Select
                className="w-auto"
                value={comparisonPeriod}
                onChange={(e) => setComparisonPeriod(e.target.value)}
              >
                <option value="previousPeriod">vs Previous Period</option>
                <option value="previousYear">vs Previous Year</option>
              </Form.Select>
              <Button variant="outline-primary">
                <FaDownload className="me-1" /> Export
              </Button>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <Row className="mb-4">
            <Col md={4} className="mb-3">
              <Card className={`h-100 ${selectedMetric === 'revenue' ? 'border-primary' : ''}`} onClick={() => setSelectedMetric('revenue')} style={{ cursor: 'pointer' }}>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="text-muted mb-0">Total Revenue</h6>
                    <FaMoneyBill className="text-primary" />
                  </div>
                  <h3 className="mb-0">₹{metrics.revenue.current.toLocaleString()}</h3>
                  <div className="mt-2">
                    {getGrowthIndicator(metrics.revenue.growth)}
                    <span className="text-muted ms-2">vs {comparisonPeriod === 'previousPeriod' ? 'previous period' : 'last year'}</span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className={`h-100 ${selectedMetric === 'orders' ? 'border-primary' : ''}`} onClick={() => setSelectedMetric('orders')} style={{ cursor: 'pointer' }}>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="text-muted mb-0">Total Orders</h6>
                    <FaUtensils className="text-info" />
                  </div>
                  <h3 className="mb-0">{metrics.orders.current}</h3>
                  <div className="mt-2">
                    {getGrowthIndicator(metrics.orders.growth)}
                    <span className="text-muted ms-2">vs {comparisonPeriod === 'previousPeriod' ? 'previous period' : 'last year'}</span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className={`h-100 ${selectedMetric === 'averageOrder' ? 'border-primary' : ''}`} onClick={() => setSelectedMetric('averageOrder')} style={{ cursor: 'pointer' }}>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="text-muted mb-0">Average Order Value</h6>
                    <FaChartLine className="text-success" />
                  </div>
                  <h3 className="mb-0">₹{metrics.averageOrder.current}</h3>
                  <div className="mt-2">
                    {getGrowthIndicator(metrics.averageOrder.growth)}
                    <span className="text-muted ms-2">vs {comparisonPeriod === 'previousPeriod' ? 'previous period' : 'last year'}</span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-4"
          >
            <Tab eventKey="overview" title={<span><FaChartLine className="me-1" /> Overview</span>}>
              <Row>
                <Col lg={8} className="mb-4">
                  <Card className="h-100">
                    <Card.Header className="d-flex justify-content-between align-items-center">
                      <h6 className="mb-0">Revenue Trend</h6>
                      <Form.Check 
                        type="switch"
                        id="prediction-switch"
                        label="Show Predictions"
                        checked={showPredictions}
                        onChange={(e) => setShowPredictions(e.target.checked)}
                      />
                    </Card.Header>
                    <Card.Body>
                      <ReactApexChart 
                        options={revenueTrendOptions} 
                        series={revenueTrendSeries} 
                        type="area" 
                        height={350} 
                      />
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={4} className="mb-4">
                  <Card className="h-100">
                    <Card.Header>
                      <h6 className="mb-0">Customer Segments</h6>
                    </Card.Header>
                    <Card.Body>
                      <ReactApexChart 
                        options={customerSegmentOptions} 
                        series={customerSegmentSeries} 
                        type="pie" 
                        height={350} 
                      />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              
              <Row>
                <Col lg={6} className="mb-4">
                  <Card className="h-100">
                    <Card.Header>
                      <h6 className="mb-0">Top Selling Items</h6>
                    </Card.Header>
                    <Card.Body>
                      <Table hover>
                        <thead>
                          <tr>
                            <th>Item</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th>Revenue</th>
                            <th>Growth</th>
                          </tr>
                        </thead>
                        <tbody>
                          {topSellingItems.map(item => (
                            <tr key={item.id}>
                              <td>{item.name}</td>
                              <td>{item.category}</td>
                              <td>{item.quantity}</td>
                              <td>₹{item.revenue.toLocaleString()}</td>
                              <td>{getGrowthIndicator(item.growth)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={6} className="mb-4">
                  <Card className="h-100">
                    <Card.Header>
                      <h6 className="mb-0">Sales by Category</h6>
                    </Card.Header>
                    <Card.Body>
                      <ReactApexChart 
                        options={salesByCategoryOptions} 
                        series={salesByCategorySeries} 
                        type="bar" 
                        height={350} 
                      />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Tab>
            
            <Tab eventKey="customers" title={<span><FaUsers className="me-1" /> Customer Analytics</span>}>
              <Row>
                <Col md={12} className="mb-4">
                  <Card>
                    <Card.Header>
                      <h6 className="mb-0">Customer Behavior Analysis</h6>
                    </Card.Header>
                    <Card.Body>
                      <Table hover>
                        <thead>
                          <tr>
                            <th>Segment</th>
                            <th>Count</th>
                            <th>Revenue</th>
                            <th>Avg. Order Value</th>
                            <th>Visit Frequency</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {customerSegments.map(segment => (
                            <tr key={segment.id}>
                              <td>{segment.segment}</td>
                              <td>{segment.count}</td>
                              <td>₹{segment.revenue.toLocaleString()}</td>
                              <td>₹{segment.averageOrder.toLocaleString()}</td>
                              <td>{segment.frequency}</td>
                              <td>
                                <Dropdown>
                                  <Dropdown.Toggle variant="outline-primary" size="sm" id={`dropdown-${segment.id}`}>
                                    Actions
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu>
                                    <Dropdown.Item>View Details</Dropdown.Item>
                                    <Dropdown.Item>Create Campaign</Dropdown.Item>
                                    <Dropdown.Item>Export Data</Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Tab>
            
            <Tab eventKey="inventory" title={<span><FaBoxOpen className="me-1" /> Inventory Analytics</span>}>
              <Row>
                <Col md={12} className="mb-4">
                  <Card>
                    <Card.Header>
                      <h6 className="mb-0">Inventory Performance</h6>
                    </Card.Header>
                    <Card.Body>
                      <p>Inventory analytics content will go here</p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Tab>
            
            <Tab eventKey="predictions" title={<span><FaChartArea className="me-1" /> Predictive Analytics</span>}>
              <Row>
                <Col md={12} className="mb-4">
                  <Card className="bg-light">
                    <Card.Body className="d-flex align-items-center">
                      <FaInfoCircle className="text-primary me-3" size={24} />
                      <div>
                        <h6 className="mb-1">Predictive Analytics</h6>
                        <p className="mb-0">Our AI-powered predictive analytics uses historical data to forecast future trends, helping you make data-driven decisions for your business.</p>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col md={12} className="mb-4">
                  <Card>
                    <Card.Header>
                      <h6 className="mb-0">Sales Forecasts</h6>
                    </Card.Header>
                    <Card.Body>
                      <p>Predictive analytics content will go here</p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </>
  );
};

export default AdvancedAnalytics;
