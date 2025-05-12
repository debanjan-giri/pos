import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Tab,
  Nav,
  Table,
  Dropdown,
  InputGroup,
} from "react-bootstrap";
import {
  FaDownload,
  FaEnvelope,
  FaPrint,
  FaCalendarAlt,
  FaChartLine,
  FaChartPie,
  FaChartBar,
  FaFileInvoice,
  FaUsers,
  FaUtensils,
  FaChartArea,
  FaBrain,
  FaBoxOpen,
  FaMoneyBill,
} from "react-icons/fa";
import ReactApexChart from "react-apexcharts";
import AdvancedAnalytics from "../components/reports/AdvancedAnalytics";

const Reports = () => {
  const [dateRange, setDateRange] = useState("today");
  const [activeTab, setActiveTab] = useState("advanced");

  // Sample data for sales report
  const salesData = {
    today: {
      total: 24500,
      orders: 85,
      average: 288,
      byCategory: [
        { category: "Main Course", amount: 12500 },
        { category: "Starters", amount: 5800 },
        { category: "Desserts", amount: 2200 },
        { category: "Beverages", amount: 4000 },
      ],
      byPaymentMethod: [
        { method: "Cash", amount: 8500 },
        { method: "Card", amount: 10000 },
        { method: "UPI", amount: 6000 },
      ],
      byOrderType: [
        { type: "Dine-in", amount: 15000 },
        { type: "Takeaway", amount: 5500 },
        { type: "Delivery", amount: 4000 },
      ],
      hourly: [
        { hour: "9 AM", amount: 1200 },
        { hour: "10 AM", amount: 1500 },
        { hour: "11 AM", amount: 1800 },
        { hour: "12 PM", amount: 2500 },
        { hour: "1 PM", amount: 3000 },
        { hour: "2 PM", amount: 2200 },
        { hour: "3 PM", amount: 1800 },
        { hour: "4 PM", amount: 1500 },
        { hour: "5 PM", amount: 1700 },
        { hour: "6 PM", amount: 2300 },
        { hour: "7 PM", amount: 2800 },
        { hour: "8 PM", amount: 2200 },
      ],
    },
    // Other date ranges would have similar data structure
  };

  // Sample data for item sales
  const itemSalesData = [
    {
      id: 1,
      name: "Butter Chicken",
      category: "Main Course",
      quantity: 42,
      amount: 13440,
      profit: 6720,
    },
    {
      id: 2,
      name: "Paneer Tikka",
      category: "Starters",
      quantity: 38,
      amount: 8360,
      profit: 4180,
    },
    {
      id: 3,
      name: "Veg Biryani",
      category: "Rice",
      quantity: 35,
      amount: 5250,
      profit: 2625,
    },
    {
      id: 4,
      name: "Chocolate Brownie",
      category: "Desserts",
      quantity: 30,
      amount: 3600,
      profit: 1800,
    },
    {
      id: 5,
      name: "Masala Dosa",
      category: "Breakfast",
      quantity: 28,
      amount: 3920,
      profit: 1960,
    },
    {
      id: 6,
      name: "Chicken 65",
      category: "Starters",
      quantity: 25,
      amount: 6250,
      profit: 3125,
    },
    {
      id: 7,
      name: "Butter Naan",
      category: "Breads",
      quantity: 60,
      amount: 2400,
      profit: 1200,
    },
    {
      id: 8,
      name: "Soft Drinks",
      category: "Beverages",
      quantity: 55,
      amount: 3300,
      profit: 1650,
    },
  ];

  // Sample data for staff performance
  const staffPerformanceData = [
    {
      id: 1,
      name: "John Doe",
      role: "Waiter",
      orders: 32,
      amount: 9600,
      tips: 960,
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Waiter",
      orders: 28,
      amount: 8400,
      tips: 840,
    },
    {
      id: 3,
      name: "Robert Johnson",
      role: "Waiter",
      orders: 25,
      amount: 7500,
      tips: 750,
    },
    {
      id: 4,
      name: "Emily Davis",
      role: "Cashier",
      orders: 45,
      amount: 13500,
      tips: 0,
    },
    {
      id: 5,
      name: "Michael Wilson",
      role: "Manager",
      orders: 0,
      amount: 0,
      tips: 0,
    },
  ];

  // Sample data for tax report
  const taxReportData = [
    { id: 1, category: "Food (5%)", sales: 18000, tax: 900 },
    { id: 2, category: "Beverages (18%)", sales: 6500, tax: 1170 },
  ];

  // Chart options for sales by category
  const salesByCategoryOptions = {
    chart: {
      type: "pie",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    labels: salesData.today.byCategory.map((item) => item.category),
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    colors: ["#007bff", "#28a745", "#ffc107", "#17a2b8"],
  };

  const salesByCategorySeries = salesData.today.byCategory.map(
    (item) => item.amount
  );

  // Chart options for hourly sales
  const hourlySalesOptions = {
    chart: {
      type: "area",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      categories: salesData.today.hourly.map((item) => item.hour),
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
    colors: ["#007bff"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100],
      },
    },
  };

  const hourlySalesSeries = [
    {
      name: "Sales",
      data: salesData.today.hourly.map((item) => item.amount),
    },
  ];

  // Chart options for payment methods
  const paymentMethodOptions = {
    chart: {
      type: "donut",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    labels: salesData.today.byPaymentMethod.map((item) => item.method),
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    colors: ["#28a745", "#007bff", "#17a2b8"],
  };

  const paymentMethodSeries = salesData.today.byPaymentMethod.map(
    (item) => item.amount
  );

  // Chart options for order types
  const orderTypeOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: salesData.today.byOrderType.map((item) => item.type),
    },
    yaxis: {
      title: {
        text: "Amount (₹)",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "₹" + val;
        },
      },
    },
    colors: ["#007bff"],
  };

  const orderTypeSeries = [
    {
      name: "Sales",
      data: salesData.today.byOrderType.map((item) => item.amount),
    },
  ];

  const handleDateRangeChange = (range) => {
    setDateRange(range);
  };

  const handleExport = (format) => {
    alert(`Exporting report in ${format} format`);
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Reports & Analytics</h5>
                <div className="d-flex align-items-center">
                  <InputGroup className="me-3" style={{ width: "250px" }}>
                    <InputGroup.Text>
                      <FaCalendarAlt />
                    </InputGroup.Text>
                    <Form.Select
                      value={dateRange}
                      onChange={(e) => handleDateRangeChange(e.target.value)}
                    >
                      <option value="today">Today</option>
                      <option value="yesterday">Yesterday</option>
                      <option value="this_week">This Week</option>
                      <option value="last_week">Last Week</option>
                      <option value="this_month">This Month</option>
                      <option value="last_month">Last Month</option>
                      <option value="custom">Custom Range</option>
                    </Form.Select>
                  </InputGroup>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="outline-primary"
                      id="dropdown-export"
                    >
                      Export
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleExport("pdf")}>
                        <FaDownload className="me-2" /> PDF
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleExport("excel")}>
                        <FaDownload className="me-2" /> Excel
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleExport("print")}>
                        <FaPrint className="me-2" /> Print
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleExport("email")}>
                        <FaEnvelope className="me-2" /> Email
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>

              <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
                <Nav variant="tabs" className="mb-3">
                  <Nav.Item>
                    <Nav.Link eventKey="advanced">
                      <FaBrain className="me-1" /> Advanced Analytics
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="sales">
                      <FaChartLine className="me-1" /> Sales Overview
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="items">
                      <FaUtensils className="me-1" /> Item Sales
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="staff">
                      <FaUsers className="me-1" /> Staff Performance
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="inventory">
                      <FaBoxOpen className="me-1" /> Inventory Analysis
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="tax">
                      <FaFileInvoice className="me-1" /> Tax & Settlement
                    </Nav.Link>
                  </Nav.Item>
                </Nav>

                <Tab.Content>
                  <Tab.Pane eventKey="advanced">
                    <AdvancedAnalytics />
                  </Tab.Pane>

                  <Tab.Pane eventKey="inventory">
                    <Row className="mb-4">
                      <Col md={3} sm={6} className="mb-3">
                        <Card className="h-100">
                          <Card.Body className="d-flex flex-column align-items-center">
                            <h6 className="text-muted mb-2">Inventory Value</h6>
                            <h3 className="mb-0">₹285,450</h3>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={3} sm={6} className="mb-3">
                        <Card className="h-100">
                          <Card.Body className="d-flex flex-column align-items-center">
                            <h6 className="text-muted mb-2">Turnover Rate</h6>
                            <h3 className="mb-0">4.2x</h3>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={3} sm={6} className="mb-3">
                        <Card className="h-100">
                          <Card.Body className="d-flex flex-column align-items-center">
                            <h6 className="text-muted mb-2">Wastage</h6>
                            <h3 className="mb-0">2.8%</h3>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={3} sm={6} className="mb-3">
                        <Card className="h-100">
                          <Card.Body className="d-flex flex-column align-items-center">
                            <h6 className="text-muted mb-2">Low Stock Items</h6>
                            <h3 className="mb-0">5</h3>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={6} className="mb-3">
                        <Card className="h-100">
                          <Card.Header>
                            <h6 className="mb-0">
                              Inventory Turnover by Category
                            </h6>
                          </Card.Header>
                          <Card.Body>
                            <ReactApexChart
                              options={{
                                chart: {
                                  type: "bar",
                                  height: 350,
                                },
                                plotOptions: {
                                  bar: {
                                    horizontal: false,
                                    columnWidth: "55%",
                                    endingShape: "rounded",
                                  },
                                },
                                dataLabels: {
                                  enabled: false,
                                },
                                stroke: {
                                  show: true,
                                  width: 2,
                                  colors: ["transparent"],
                                },
                                xaxis: {
                                  categories: [
                                    "Meat",
                                    "Vegetables",
                                    "Dairy",
                                    "Grains",
                                    "Spices",
                                  ],
                                },
                                yaxis: {
                                  title: {
                                    text: "Turnover Rate",
                                  },
                                },
                                fill: {
                                  opacity: 1,
                                },
                                tooltip: {
                                  y: {
                                    formatter: function (val) {
                                      return val + "x";
                                    },
                                  },
                                },
                                colors: ["#4361ee"],
                              }}
                              series={[
                                {
                                  name: "Turnover Rate",
                                  data: [4.8, 5.2, 6.1, 3.5, 2.8],
                                },
                              ]}
                              type="bar"
                              height={350}
                            />
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col lg={6} className="mb-3">
                        <Card className="h-100">
                          <Card.Header>
                            <h6 className="mb-0">Wastage Analysis</h6>
                          </Card.Header>
                          <Card.Body>
                            <ReactApexChart
                              options={{
                                chart: {
                                  type: "line",
                                  height: 350,
                                },
                                stroke: {
                                  curve: "smooth",
                                  width: 2,
                                },
                                xaxis: {
                                  categories: [
                                    "Jan",
                                    "Feb",
                                    "Mar",
                                    "Apr",
                                    "May",
                                    "Jun",
                                    "Jul",
                                    "Aug",
                                    "Sep",
                                    "Oct",
                                    "Nov",
                                    "Dec",
                                  ],
                                },
                                yaxis: {
                                  title: {
                                    text: "Wastage %",
                                  },
                                },
                                colors: ["#dc3545"],
                              }}
                              series={[
                                {
                                  name: "Wastage %",
                                  data: [
                                    3.8, 3.7, 3.6, 3.5, 3.4, 3.3, 3.2, 3.1, 3.0,
                                    2.9, 2.8, 2.7,
                                  ],
                                },
                              ]}
                              type="line"
                              height={350}
                            />
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Tab.Pane>

                  <Tab.Pane eventKey="sales">
                    <Row className="mb-4">
                      <Col md={3} sm={6} className="mb-3">
                        <Card className="h-100">
                          <Card.Body className="d-flex flex-column align-items-center">
                            <h6 className="text-muted mb-2">Total Sales</h6>
                            <h3 className="mb-0">
                              ₹{salesData.today.total.toLocaleString()}
                            </h3>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={3} sm={6} className="mb-3">
                        <Card className="h-100">
                          <Card.Body className="d-flex flex-column align-items-center">
                            <h6 className="text-muted mb-2">Orders</h6>
                            <h3 className="mb-0">{salesData.today.orders}</h3>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={3} sm={6} className="mb-3">
                        <Card className="h-100">
                          <Card.Body className="d-flex flex-column align-items-center">
                            <h6 className="text-muted mb-2">
                              Average Order Value
                            </h6>
                            <h3 className="mb-0">₹{salesData.today.average}</h3>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={3} sm={6} className="mb-3">
                        <Card className="h-100">
                          <Card.Body className="d-flex flex-column align-items-center">
                            <h6 className="text-muted mb-2">Tax Collected</h6>
                            <h3 className="mb-0">
                              ₹{(salesData.today.total * 0.05).toFixed(0)}
                            </h3>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={8} className="mb-3">
                        <Card className="h-100">
                          <Card.Header>
                            <h6 className="mb-0">Hourly Sales</h6>
                          </Card.Header>
                          <Card.Body>
                            <ReactApexChart
                              options={hourlySalesOptions}
                              series={hourlySalesSeries}
                              type="area"
                              height={350}
                            />
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col lg={4} className="mb-3">
                        <Card className="h-100">
                          <Card.Header>
                            <h6 className="mb-0">Sales by Category</h6>
                          </Card.Header>
                          <Card.Body>
                            <ReactApexChart
                              options={salesByCategoryOptions}
                              series={salesByCategorySeries}
                              type="pie"
                              height={350}
                            />
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={6} className="mb-3">
                        <Card className="h-100">
                          <Card.Header>
                            <h6 className="mb-0">Payment Methods</h6>
                          </Card.Header>
                          <Card.Body>
                            <ReactApexChart
                              options={paymentMethodOptions}
                              series={paymentMethodSeries}
                              type="donut"
                              height={350}
                            />
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col lg={6} className="mb-3">
                        <Card className="h-100">
                          <Card.Header>
                            <h6 className="mb-0">Order Types</h6>
                          </Card.Header>
                          <Card.Body>
                            <ReactApexChart
                              options={orderTypeOptions}
                              series={orderTypeSeries}
                              type="bar"
                              height={350}
                            />
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Tab.Pane>

                  <Tab.Pane eventKey="items">
                    <Card>
                      <Card.Body>
                        <Table hover responsive>
                          <thead>
                            <tr>
                              <th>Item Name</th>
                              <th>Category</th>
                              <th>Quantity Sold</th>
                              <th>Total Sales</th>
                              <th>Profit</th>
                            </tr>
                          </thead>
                          <tbody>
                            {itemSalesData.map((item) => (
                              <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td>{item.quantity}</td>
                                <td>₹{item.amount.toLocaleString()}</td>
                                <td>₹{item.profit.toLocaleString()}</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr className="fw-bold">
                              <td colSpan={2}>Total</td>
                              <td>
                                {itemSalesData.reduce(
                                  (sum, item) => sum + item.quantity,
                                  0
                                )}
                              </td>
                              <td>
                                ₹
                                {itemSalesData
                                  .reduce((sum, item) => sum + item.amount, 0)
                                  .toLocaleString()}
                              </td>
                              <td>
                                ₹
                                {itemSalesData
                                  .reduce((sum, item) => sum + item.profit, 0)
                                  .toLocaleString()}
                              </td>
                            </tr>
                          </tfoot>
                        </Table>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>

                  <Tab.Pane eventKey="staff">
                    <Card>
                      <Card.Body>
                        <Table hover responsive>
                          <thead>
                            <tr>
                              <th>Staff Name</th>
                              <th>Role</th>
                              <th>Orders Handled</th>
                              <th>Sales Amount</th>
                              <th>Tips Collected</th>
                            </tr>
                          </thead>
                          <tbody>
                            {staffPerformanceData.map((staff) => (
                              <tr key={staff.id}>
                                <td>{staff.name}</td>
                                <td>{staff.role}</td>
                                <td>{staff.orders}</td>
                                <td>₹{staff.amount.toLocaleString()}</td>
                                <td>₹{staff.tips.toLocaleString()}</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr className="fw-bold">
                              <td colSpan={2}>Total</td>
                              <td>
                                {staffPerformanceData.reduce(
                                  (sum, staff) => sum + staff.orders,
                                  0
                                )}
                              </td>
                              <td>
                                ₹
                                {staffPerformanceData
                                  .reduce((sum, staff) => sum + staff.amount, 0)
                                  .toLocaleString()}
                              </td>
                              <td>
                                ₹
                                {staffPerformanceData
                                  .reduce((sum, staff) => sum + staff.tips, 0)
                                  .toLocaleString()}
                              </td>
                            </tr>
                          </tfoot>
                        </Table>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>

                  <Tab.Pane eventKey="tax">
                    <Card>
                      <Card.Body>
                        <Table hover responsive>
                          <thead>
                            <tr>
                              <th>Category</th>
                              <th>Sales Amount</th>
                              <th>Tax Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {taxReportData.map((item) => (
                              <tr key={item.id}>
                                <td>{item.category}</td>
                                <td>₹{item.sales.toLocaleString()}</td>
                                <td>₹{item.tax.toLocaleString()}</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr className="fw-bold">
                              <td>Total</td>
                              <td>
                                ₹
                                {taxReportData
                                  .reduce((sum, item) => sum + item.sales, 0)
                                  .toLocaleString()}
                              </td>
                              <td>
                                ₹
                                {taxReportData
                                  .reduce((sum, item) => sum + item.tax, 0)
                                  .toLocaleString()}
                              </td>
                            </tr>
                          </tfoot>
                        </Table>

                        <div className="mt-4">
                          <h6>Settlement Summary</h6>
                          <Table hover responsive>
                            <thead>
                              <tr>
                                <th>Payment Method</th>
                                <th>Amount</th>
                              </tr>
                            </thead>
                            <tbody>
                              {salesData.today.byPaymentMethod.map(
                                (method, idx) => (
                                  <tr key={idx}>
                                    <td>{method.method}</td>
                                    <td>₹{method.amount.toLocaleString()}</td>
                                  </tr>
                                )
                              )}
                            </tbody>
                            <tfoot>
                              <tr className="fw-bold">
                                <td>Total</td>
                                <td>
                                  ₹
                                  {salesData.today.byPaymentMethod
                                    .reduce(
                                      (sum, method) => sum + method.amount,
                                      0
                                    )
                                    .toLocaleString()}
                                </td>
                              </tr>
                            </tfoot>
                          </Table>
                        </div>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Reports;
